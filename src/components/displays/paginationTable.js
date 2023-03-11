import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePaginationElt from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CircularProgress } from '@mui/material';

export default function PaginationTable({
    columns,
    defaultData,
    loadData,
    rowsPerPageOptions,
    rowsPerPage,
    changePageAction,
    changeRowsPerPageAction,
    errorCallback
}) {
    const [data, setData] = useState(defaultData || []);
    const [page, setPage] = useState(0);
    const [rowsPerPageConfig, setRowsPerPageConfig] = useState(rowsPerPage || 10);
    const [isLoading, setIsLoading] = useState(true);

    if (!columns) columns = [];

    useEffect(() => {
        if (loadData) {
            loadData(
                page,
                setIsLoading
            ).then(response => {
                setData(response);
            }).catch(err => {
                if (errorCallback) errorCallback(err);
                else throw err;
            }).finally(_ => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [page, loadData, errorCallback]);

    const handleChangePage = async (event, newPage) => {
        setIsLoading(true);

        if (newPage > page && (rowsPerPageConfig * (newPage + 1) > data.length)) {
            try {
                const loaded = loadData && await loadData(newPage, setIsLoading);
                Array.isArray(loaded) && setData(loaded)
            } catch(err) {
                if (errorCallback) errorCallback(err);
                else throw err;
            }
        }

        setPage(newPage);
        setIsLoading(false);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPageConfig(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            {isLoading && <div className="spinner-wrap">
                <CircularProgress />
            </div>}
            {!isLoading && <TableContainer sx={{ maxWidth: '100%' }}>
                
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {Array.isArray(columns) && columns.map((column) => (
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
                        {Array.isArray(data) && data.slice(page * rowsPerPageConfig, page * rowsPerPageConfig + rowsPerPageConfig).map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.cod + index}>
                                    {Array.isArray(columns) && columns.map((column, i) => {
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
            <TablePaginationElt
                nextIconButtonProps={{
                    disabled: (page+1) * rowsPerPageConfig > data.length ? true : false
                }}
                rowsPerPageOptions={rowsPerPageOptions || [10, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPageConfig}
                page={page}
                onPageChange={changePageAction || handleChangePage}
                onRowsPerPageChange={changeRowsPerPageAction || handleChangeRowsPerPage}
            />
        </Paper>
    );
}
