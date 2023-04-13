import { Accordion, Code, Flex, Grid, MantineTheme, Title } from '@mantine/core';
import React from 'react';
import { Cell } from './Cell';
import { sheetColumnsMap, SheetRow } from './sheetParser';
import { Copiable } from '../components/Copiable';
import { IndexNumber } from './IndexNumber';

export const Rows = ({
  rows,
  className,
  openRow,
  setOpenRow,
  setOpenCat,
  keyword,
  onOpenRow,
}: {
  rows: SheetRow[];
  className?: string;
  openRow?: string;
  setOpenRow?: (value: string) => void;
  setOpenCat?: (value: string) => void;
  keyword?: string;
  onOpenRow: (rowRef: React.RefObject<HTMLDivElement>) => void;
}) => {
  const handleCellClick = (key: string, cat: string | number) =>
    key === 'Category for Record View' && setOpenCat ? setOpenCat(String(cat)) : undefined;
  const titleColor = ({ colorScheme, colors }: MantineTheme) =>
    colorScheme === 'dark' ? colors.cyan[6] : colors.cyan[7];

  const refs = rows.map(() => React.useRef<HTMLDivElement>(null));

  React.useEffect(() => {
    if (!openRow) return;
    const index = rows.findIndex((row) => row.DisplayName === openRow);
    if (index !== -1) onOpenRow(refs[index]);
  }, [openRow, rows, onOpenRow]);
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
          <Accordion.Item key={uid} value={uid} ref={refs[i]}>
            <Accordion.Control>
              <Flex gap="lg" align="center">
                <IndexNumber>{recordViewOrder}</IndexNumber>
                <Title miw={200} size="h4" sx={(t) => ({ color: titleColor(t) })}>
                  {displayName}
                </Title>
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
