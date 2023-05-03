import {
  Badge,
  Code,
  Col,
  Group,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import React from 'react';
import { Asterisk, Eye, EyeOff } from 'tabler-icons-react';
import { CellValue } from '../helpers';

const dataTypes = [
  'string',
  'integer',
  'float',
  'json',
  'timestamp',
  'id',
  'boolean',
  'date',
  'date time',
  'percent',
  'enum',
  'static',
];

export const Cell = ({
  label,
  value,
  onClick,
  mode,
}: {
  label?: CellValue;
  value?: string | number;
  onClick?: () => void;
  mode?: 'view' | 'edit';
}) => {
  if (!label) return null;
  const isDataPath = label === 'Data Path';
  const isDataType = label === 'Data Type';
  const isTrue = value === 'true' || value === 'Y' || value === 'Yes';
  const isFalse = value === 'false' || value === 'N' || value === 'No';
  const isNumber = !Number.isNaN(Number(value));
  const isRequired = isTrue && label === 'Required (Y/N)';
  const isNotRequired = isFalse && label === 'Required (Y/N)';
  const shouldAutoIgnore = isTrue && label === 'Should Automation Ignore?';
  const shouldNotAutoIgnore = isFalse && label === 'Should Automation Ignore?';
  const computedValue = (val?: string | number) => {
    if (!val) return null;
    if (isTrue) return <Badge color="green">Yes</Badge>;
    if (isFalse) return <Badge color="red">No</Badge>;
    if (isDataPath) return <Code>{val}</Code>;
    if (isNumber) return <Text ff="monospace">{val}</Text>;
    return val;
  };

  const isEditMode = React.useMemo(() => mode === 'edit', [mode]);

  if (isDataType && isEditMode) {
    return (
      <Col span={4}>
        <Select
          defaultValue={value ? (value as string) : undefined}
          label={label}
          data={dataTypes.map((t) => ({ value: t, label: t.toUpperCase() }))}
        />
      </Col>
    );
  }

  if (isRequired || isNotRequired) {
    return isEditMode ? (
      <Col span={4}>
        <Switch label={label} />
      </Col>
    ) : (
      <Col span={4}>
        <Badge color="gray" variant="outline" onClick={onClick}>
          <Group position="center" spacing={4}>
            {isRequired && <Asterisk size={10} strokeWidth={2} color="red" />}
            {isRequired ? 'Required' : 'Optional'}
          </Group>
        </Badge>
      </Col>
    );
  }

  if (shouldAutoIgnore || shouldNotAutoIgnore) {
    return isEditMode ? (
      <Col span={4}>
        <Switch label={label} />
      </Col>
    ) : (
      <Col span={4}>
        <Text size="xs" color="dimmed">
          Automation
        </Text>
        <Badge color={shouldAutoIgnore ? 'red' : 'blue'} variant="light" onClick={onClick}>
          <Group position="center" spacing={4}>
            {shouldAutoIgnore ? (
              <EyeOff size={14} strokeWidth={2} />
            ) : (
              <Eye size={14} strokeWidth={2} />
            )}
            {shouldAutoIgnore ? 'Ignore' : 'Should Not Ignore'}
          </Group>
        </Badge>
      </Col>
    );
  }

  return isEditMode ? (
    <Col span={4}>
      {isNumber ? (
        <NumberInput label={label} defaultValue={Number(value)} />
      ) : (
        <TextInput label={label} defaultValue={value} />
      )}
    </Col>
  ) : (
    <Col span={4}>
      <Text size="xs" color="dimmed">
        {label}
      </Text>
      {onClick ? (
        <UnstyledButton
          onClick={onClick}
          sx={(theme) => ({
            cursor: 'pointer',
            fontWeight: 800,
            color: theme.colorScheme === 'dark' ? theme.colors.cyan[6] : theme.colors.cyan[7],
          })}
        >
          {computedValue(value)}
        </UnstyledButton>
      ) : (
        <Text size="sm" weight={500}>
          {computedValue(value)}
        </Text>
      )}
    </Col>
  );
};
