import { Badge, Code, Col, Group, Text } from '@mantine/core';
import React from 'react';
import { Asterisk, Eye, EyeOff } from 'tabler-icons-react';
import { CellValue } from './helpers';

export const Cell = ({
  label,
  value,
  onClick,
}: {
  label?: CellValue;
  value: string | number;
  onClick?: () => void;
}) => {
  if (!value || !label) return null;
  const isDataPath = label === 'Data Path';
  const isTrue = value === 'true' || value === 'Y' || value === 'Yes';
  const isFalse = value === 'false' || value === 'N' || value === 'No';
  const isNumber = !Number.isNaN(Number(value));
  const isRequired = isTrue && label === 'Required (Y/N)';
  const isNotRequired = isFalse && label === 'Required (Y/N)';
  const shouldAutoIgnore = isTrue && label === 'Should Automation Ignore?';
  const shouldNotAutoIgnore = isFalse && label === 'Should Automation Ignore?';
  const computedValue = (val: string | number) => {
    if (isTrue) return <Badge color="green">Yes</Badge>;
    if (isFalse) return <Badge color="red">No</Badge>;
    if (isDataPath) return <Code>{val}</Code>;
    if (isNumber) return <Text ff="">{val}</Text>;
    return val;
  };

  if (isRequired || isNotRequired) {
    return (
      <Col span={6} md={4} lg={3}>
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
    return (
      <Col span={6} md={4} lg={3}>
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

  return (
    <Col span={6} md={4} lg={3}>
      <Text size="xs" color="dimmed">
        {label}
      </Text>
      <Text
        size="sm"
        weight={500}
        onClick={onClick}
        sx={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {computedValue(value)}
      </Text>
    </Col>
  );
};
