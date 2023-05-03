import React from 'react';
import { Accordion, Col, Grid, Text, UnstyledButton } from '@mantine/core';
import { SheetRow } from '../helpers/sheetParser';
import { useStore } from '../store';

export const CategoriesAccordion = ({ data }: { data: SheetRow[] }) => {
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

  const [openCat, setOpenCat] = useStore((state) => [state.openCat, state.setOpenCat]);
  const [openRow, setOpenRow] = useStore((state) => [state.openRow, state.setOpenRow]);

  if (!categories.length) return null;

  return (
    <Accordion variant="separated" my="xl" radius="md" value={openCat} onChange={setOpenCat}>
      {categories.map((category) => (
        <Accordion.Item value={category} key={category}>
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
                        <UnstyledButton
                          onClick={() => (setOpenRow ? setOpenRow(fieldName) : undefined)}
                        >
                          <Text
                            size="sm"
                            weight={openRow === fieldName ? 800 : 400}
                            sx={(t) => ({
                              color: t.colorScheme === 'dark' ? t.colors.cyan[6] : t.colors.cyan[7],
                            })}
                          >
                            {fieldName}
                          </Text>
                        </UnstyledButton>
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
