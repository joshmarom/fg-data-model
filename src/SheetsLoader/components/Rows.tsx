import {
  Accordion,
  Button,
  Code,
  Flex,
  Grid,
  Group,
  MantineTheme,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { Edit } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Cell } from './Cell';
import { sheetColumnsMap, SheetRow } from '../helpers/sheetParser';
import { Copiable } from '../../components/Copiable';
import { IndexNumber } from './IndexNumber';
import { useStore } from '../store';
import { useStyles } from '../SheetLoaderStyle';

export const Rows = ({
  rows,
  keyword = '',
  onOpenRow,
}: {
  rows: SheetRow[];
  keyword?: string;
  onOpenRow: (rowRef: React.RefObject<HTMLDivElement>) => void;
}) => {
  const [openRow, setOpenRow] = useStore((state) => [state.openRow, state.setOpenRow]);
  const setOpenCat = useStore((state) => state.setOpenCat);
  const openRowRef = React.useRef<HTMLDivElement>(null);
  const { classes } = useStyles();
  const titleColor = ({ colorScheme, colors }: MantineTheme) =>
    colorScheme === 'dark' ? colors.cyan[6] : colors.cyan[7];

  React.useEffect(() => {
    if (!openRow) return;
    const index = rows.findIndex((row) => row.DisplayName === openRow);
    if (index !== -1) onOpenRow(openRowRef);
  }, [openRow, rows, onOpenRow]);

  const fields = React.useMemo(
    () =>
      rows.reduce((acc, row) => {
        Object.keys(row).forEach((key) => {
          if (!acc.includes(key)) acc.push(key);
        });
        return acc;
      }, [] as string[]),
    [rows]
  );

  const shouldRenderRow = React.useCallback(
    (row: SheetRow) =>
      !keyword ||
      (row.DisplayName &&
        typeof row.DisplayName === 'string' &&
        row.DisplayName.toLowerCase().includes(keyword.toLowerCase())),
    [keyword]
  );

  return (
    <Accordion variant="filled" className={classes.rows} value={openRow} onChange={setOpenRow}>
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
        const uid = `${displayName}`;
        const recordViewOrder = RecordViewOrder || i;
        const dataPath = DataPath || Datapath;
        const [editing, { open: openEdit, close: closeEdit }] = useDisclosure(false);

        return shouldRenderRow(row) ? (
          <Accordion.Item key={uid} value={uid} ref={openRow === uid ? openRowRef : undefined}>
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
                    onClick={() => setOpenCat(String(CategoryforRecordView))}
                  />
                ) : null}
                {Object.entries(row).map(([key, value]) => {
                  if (!value || !columns[key]) return null;
                  return <Cell key={key} label={sheetColumnsMap[key]} value={value} />;
                })}
              </Grid>
              <Group>
                <Button
                  size="xs"
                  ml="auto"
                  variant="subtle"
                  leftIcon={<Edit size={18} />}
                  onClick={openEdit}
                >
                  Edit
                </Button>
                <Modal
                  opened={editing}
                  size="xl"
                  onClose={closeEdit}
                  title={
                    <Text size="lg" weight={600}>
                      {displayName}
                    </Text>
                  }
                  centered
                >
                  <Stack spacing="xl">
                    <Grid gutter="lg" align="center" m="sm">
                      {fields.map((key) => (
                        <Cell
                          value={row[key] ?? undefined}
                          label={sheetColumnsMap[key]}
                          mode="edit"
                        />
                      ))}
                    </Grid>
                    <Flex w="100%" justify="end" gap="md">
                      <Button variant="light" color="gray" onClick={closeEdit}>
                        Cancel
                      </Button>
                      <Button variant="light" color="blue">
                        Save
                      </Button>
                    </Flex>
                  </Stack>
                </Modal>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        ) : null;
      })}
    </Accordion>
  );
};
