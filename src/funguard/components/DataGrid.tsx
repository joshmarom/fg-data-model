import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import tasks from '../data/tasks.json';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const DataGrid = () => {
    const [columnDefs] = React.useState([
        { field: 'severity', sortable: true, filter: true },
        { field: 'type' },
        { field: 'status', sortable: true, filter: 'agSetColumnFilter' },
        { field: 'Function' },
        { field: 'reason' },
        { field: 'fundID' },
        { field: 'fundName' },
        { field: 'fundView' },
        { field: 'accountingDate' },
        { field: 'eventType' },
        { field: 'assignedTo' },
        { field: 'assignedBy' },
        { field: 'secID' },
        { field: 'secName' },
        { field: 'restated', type: 'boolean' },
        { field: 'createdAt' },
    ]);

    const isFirstColumn = (
        params: {
            columnApi: { getAllDisplayedColumns: () => any },
            column: any
        }) => {
        const displayedColumns = params.columnApi.getAllDisplayedColumns();
        return displayedColumns[0] === params.column;
    };

    const defaultColDef = React.useMemo(() => ({
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn,
    }), []);

    const [rowData] = React.useState(tasks);

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: 500 }}>
                <AgGridReact
                  rowData={rowData} // Row Data for Rows
                  columnDefs={columnDefs} // Column Defs for Columns
                  defaultColDef={defaultColDef} // Optional - Set default props for columns
                  getRowId={({ data }) => data.id} // Optional - allows for custom ID for rows
                  animateRows // Optional - set to 'true' to have rows animate when sorted
                  rowSelection="multiple" // Options - allows click selection of rows
                />
            </div>
        </div>
    );
};
