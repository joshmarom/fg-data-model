import { Badge, Code, Col, Text } from '@mantine/core';
import React from 'react';

export const Cell = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  const isDataPath = label === 'Data Path';
  const isTrue = value === 'true' || value === 'Y' || value === 'Yes';
  const isFalse = value === 'false' || value === 'N' || value === 'No';
  const isNumber = !Number.isNaN(Number(value));
  const computedValue = (val: string) => {
    if (isTrue) return <Badge color="green">Yes</Badge>;
    if (isFalse) return <Badge color="red">No</Badge>;
    if (isDataPath || isNumber) return <Code>{val}</Code>;
    return val;
  };

  return (
    <Col span={6} md={4} lg={3}>
      <Text size="xs" color="dimmed">
        {label}
      </Text>
      <Text weight={500}>{computedValue(value)}</Text>
    </Col>
  );
};
