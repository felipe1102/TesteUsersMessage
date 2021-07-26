import React from "react";
import { useTable, useSortBy } from 'react-table';
import classes from "./Table.css";

const Table = ({columns, data}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
            columns,
            data,
        },
        useSortBy
    );

    return(
            <div className={'table-responsible'}>
                <table className={'customers'} {...getTableProps()}>

                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span className={classes.SortIndication}>
                                    {column.isSorted ?
                                        column.isSortedDesc ?
                                            String.fromCharCode(8593) : //Arrow up
                                            String.fromCharCode(8595) // Arrow down
                                        : ''}
                                </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                { cell.render('Cell') }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>

    );
};

export default Table;
