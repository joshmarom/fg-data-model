import React from 'react';
import { Accordion, Col, Grid, Text } from '@mantine/core';
import { SheetRow } from './sheetParser';

export const CategoriesAccordion = ({
  data,
  openRow,
  setOpenRow,
  openCat,
  setOpenCat,
}: {
  data: SheetRow[];
  openRow?: string;
  setOpenRow?: (row: string) => void;
  openCat: string | undefined;
  setOpenCat: (cat: string) => void;
}) => {
  const categories = React.useMemo(
    () => [
      ...new Set(
        data
          .map((row) => row.CategoryforRecordView)
          .filter(Boolean)
          .map(String)
      ),
    ],
    [data]
  );

  const refs = categories.map(() => React.useRef<HTMLDivElement>(null));

  if (!categories.length) return null;

  return (
    <Accordion variant="separated" radius="md" value={openCat} onChange={setOpenCat}>
      {categories.map((category, i) => (
        <Accordion.Item value={category} key={category} ref={refs[i]}>
          <Accordion.Control>
            <Text fw={600} lineClamp={1}>
              {category}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Grid p="sm">
              {data
                .filter((row) => row.CategoryforRecordView === category)
                .map(({ DisplayName, FullDisplayName }) => {
                  const fieldName = (DisplayName || FullDisplayName) as string;
                  return (
                    fieldName && (
                      <Col span={6} key={fieldName}>
                        <Text
                          size="sm"
                          sx={(t) => ({
                            cursor: 'pointer',
                            fontWeight: openRow === fieldName ? 800 : 400,
                            color: t.colorScheme === 'dark' ? t.colors.cyan[6] : t.colors.cyan[7],
                          })}
                          onClick={() => (setOpenRow ? setOpenRow(fieldName) : undefined)}
                        >
                          {fieldName}
                        </Text>
                      </Col>
                    )
                  );
                })}
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
