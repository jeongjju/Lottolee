import React from 'react'
import styled from 'styled-components'
import {useTable} from 'react-table'
import namor from 'namor';

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
};

const newPerson = () => {
    const statusChance = Math.random();
    const jIncome = Math.floor(Math.random() * 30);
    const bIncome = Math.floor(Math.random() * 100);

    return {
        firstName: namor.generate({words: 1, numbers: 0}),
        lastName: namor.generate({words: 1, numbers: 0}),
        jIncome: jIncome,
        bIncome: bIncome,
        tIncome: jIncome + bIncome,
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? 'relationship'
                : statusChance > 0.33
                ? 'complicated'
                : 'single',
    }
};

function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth];
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    };

    return makeDataLevel()
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps(
                        {
                            style: {backgroundColor: row.values.tIncome > 50? 'skyblue': 'lightgray'}
                        }
                    )}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

function ReactTableRowColor() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Job Income',
                        accessor: 'jIncome',
                    },
                    {
                        Header: 'Business Income',
                        accessor: 'bIncome',
                    },
                    {
                        Header: 'Total Income',
                        accessor: 'tIncome',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    );

    const data = React.useMemo(() => makeData(20), []);

    return (
        <Styles>
            <Table columns={columns} data={data}/>
        </Styles>
    )
}

export default ReactTableRowColor