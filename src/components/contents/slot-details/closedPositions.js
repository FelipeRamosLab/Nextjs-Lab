import { useContext, useEffect, useState } from 'react';
import ActivityDataContext from '../../../context/activityData';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CircularProgress } from '@mui/material';

const columns = [
    { id: 'cod', label: 'COD', minWidth: 50 },
    { id: 'positionType', label: 'Operação', minWidth: 50, format: (value) => value === 'long' ? 'Compra' : 'Venda' },
    { id: 'closeTime', label: 'Fechada em', minWidth: 100, format: (value) => new Date(value).toLocaleString() },
    {
      id: 'openTime',
      label: 'Aberta em',
      minWidth: 100,
      format: (value) => new Date(value).toLocaleString()
    },
    {
      id: 'pnl',
      label: 'PNL',
      align: 'center',
      format: (value) => toMoney(value)
    },
    {
      id: 'roe',
      label: 'ROE',
      align: 'center',
      format: (value) => toPercent(value)
    },
    {
      id: 'openPrice',
      label: 'Abertura',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'closePrice',
      label: 'Fechamento',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'stopPrice',
      label: 'Stoploss',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'gainPrice',
      label: 'Takeprofit',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'quantity',
      label: 'Quantidade',
      align: 'right'
    },
    {
      id: 'usedLeverege',
      label: 'Alavancagem',
      align: 'right',
      format: (value) => value.toFixed(0)
    },
    {
      id: 'initialGrossBalance',
      label: 'Bruto inicial',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'tradeFee',
      label: 'Corrretagem',
      align: 'right',
      format: (value) => toMoney(value)
    }
];

export default function SlotClosedPositions() {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [positions, setPositions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const rows = positions;

    useEffect(() => {
        loadPositions(0);
    }, []);

    const handleChangePage = async (event, newPage) => {
        setIsLoading(true);


        if (newPage > page && (rowsPerPage * (newPage + 1) > positions.length)) {
            await loadPositions(newPage);
        }

        setPage(newPage);
        setIsLoading(false);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function loadPositions(page) {
        try {
            const response = await ajax('/api/bot-account/get-trades', {
                slotUID: activityData?.slot?._id,
                status: 'closed',
                page: page + 1
            }).post();

            return setPositions(response.trades);
        } catch(err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            {isLoading && <div className="spinner-wrap">
                <CircularProgress />
            </div>}
            {!isLoading && <TableContainer sx={{ maxWidth: '100%' }}>
                
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.cod + index}>
                                {columns.map((column, i) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id + i} align={column.align}>
                                            {column.format ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>}
            <TablePagination
                nextIconButtonProps={{
                    disabled: (page+1) * rowsPerPage > positions.length ? true : false
                }}
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
