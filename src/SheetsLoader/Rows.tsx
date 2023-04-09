import { Accordion, Code, Flex, Grid, MantineTheme, Stack, Title } from '@mantine/core';
import React from 'react';
import { Cell } from './Cell';
import { sheetColumnsMap, SheetRow } from './sheetParser';
import { Copiable } from '../components/Copiable';

export const Rows = ({
  rows,
  className,
  openRow,
  setOpenRow,
  setOpenCat,
  keyword,
}: {
  rows: SheetRow[];
  className?: string;
  openRow?: string;
  setOpenRow?: (value: string) => void;
  setOpenCat?: (value: string) => void;
  keyword?: string;
}) => {
  const handleCellClick = (key: string, cat: string | number) =>
    key === 'Category for Record View' && setOpenCat ? setOpenCat(String(cat)) : undefined;
  const titleColor = ({ colorScheme, colors }: MantineTheme) =>
    colorScheme === 'dark' ? colors.cyan[6] : colors.cyan[7];
  //console.log(data);
  //console.log(headers.filter((h) => !sheetColumns.includes(clearString(h))).map(clearString));
  return (
    <Accordion variant="filled" m="xl" className={className} value={openRow} onChange={setOpenRow}>
      {rows.map((row, i) => {
        const {
          DataPath,
          Datapath,
          Description,
          DisplayName,
          FullDisplayName,
          RecordViewOrder,
          CategoryforRecordView,
          ...columns
        } = row;
        const displayName = DisplayName || FullDisplayName;
        const recordViewOrder = RecordViewOrder || i;
        const dataPath = DataPath || Datapath;
        const uid = `${displayName}`;

        if (keyword && !String(displayName)?.toLowerCase().includes(keyword.toLowerCase())) {
          return null;
        }

        return (
          <Accordion.Item key={uid} value={uid}>
            <Accordion.Control>
              <Flex gap="lg" align="center">
                <Flex
                  align="center"
                  justify="center"
                  ta="center"
                  sx={(t) => ({
                    color: t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[6],
                    borderRadius: t.radius.xl,
                    flexGrow: 0,
                    flexShrink: 0,
                    aspectRatio: '1/1',
                    width: t.spacing.xl,
                    fontSize: t.fontSizes.xs,
                    fontWeight: 500,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: `0.25px solid ${
                      t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[4]
                    }`,
                  })}
                >
                  {recordViewOrder}
                </Flex>
                <Stack>
                  <Title miw={200} size="h4" sx={(t) => ({ color: titleColor(t) })}>
                    {displayName}
                  </Title>
                </Stack>
                {dataPath ? (
                  <Copiable>
                    <Code>{dataPath}</Code>
                  </Copiable>
                ) : null}
              </Flex>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid gutter="md" p="lg">
                {Description ? <Cell label="Description" value={Description} /> : null}
                {CategoryforRecordView ? (
                  <Cell
                    label={sheetColumnsMap.CategoryforRecordView}
                    value={CategoryforRecordView}
                    onClick={() =>
                      handleCellClick(sheetColumnsMap.CategoryforRecordView, CategoryforRecordView)
                    }
                  />
                ) : null}
                {Object.entries(row).map(([key, value]) => {
                  if (!value || !columns[key]) return null;
                  return <Cell key={key} label={sheetColumnsMap[key]} value={value} />;
                })}
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
