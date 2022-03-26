import React from "react";
import Transaction from "../model/Transaction";
import { visuallyHidden } from '@mui/utils';
import {
    Paper,
    TableContainer,
    TableHead,
    Table,
    TableCell,
    TableBody,
    TableRow,
    Box,
    Checkbox,
    TableSortLabel, Toolbar, alpha, Typography, Tooltip, IconButton, TablePagination
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

class TransactionsTable extends React.Component<any> {

    state = {
        order: 'asc' as Order,
        orderBy: 'date' as keyof Transaction,
        selected: [] as string[],
        page: 0,
        rowsPerPage: 5
    };

    getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    handleClick(event: React.MouseEvent<unknown>, name: string, selected: string[]) {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    isSelected(name: string, selected: string[]): boolean {
        return selected.indexOf(name) !== -1;
    };

    getId(transaction: Transaction): string {
        return transaction.date.format() + ',' + transaction.description + ',' + transaction.amount;
    }

    handleChangeRowsPerPage(event: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    }

    handleChangePage(newPage: number) {
        this.setState({page: newPage});
    }

    render() {
        const transactions = this.props.transactions;
        const selected = this.state.selected;
        const order = this.state.order;
        const orderBy = this.state.orderBy;
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = transactions.map((n: Transaction) => this.getId(n));
                this.setState({selected: newSelecteds});
                return;
            }
            this.setState({selected: []});
        };

        const handleRequestSort = (
            event: React.MouseEvent<unknown>,
            property: keyof Transaction,
        ) => {
            const isAsc = orderBy === property && order === 'asc';
            this.setState({order: isAsc ? 'desc' : 'asc'});
            this.setState({orderBy: property});
        };

        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

        return (
            <Box sx={{p: 2}}>
                <Paper sx={{width: '100%'}}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750}}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={transactions.length}
                            />
                            <TableBody>
                                {transactions.slice().sort(this.getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row:Transaction, index: number) => {
                                        const isItemSelected = this.isSelected(this.getId(row), selected);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, this.getId(row), selected)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={this.getId(row)}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.date.format('MM/DD/YYYY')}
                                                </TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="left">{row.amount}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, page) => this.handleChangePage(page)}
                        onRowsPerPageChange={(event) => this.handleChangeRowsPerPage(event)}
                    />
                </Paper>
            </Box>
        );
    }
}

class EnhancedTableHead extends React.Component<EnhancedTableProps, any>{

    headCells: readonly HeadCell[] = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Transaction Date'
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'description'
        },
        {
            id: 'amount',
            numeric: true,
            disablePadding: false,
            label: 'amount ($)'
        },
    ];

    render() {
        {
            const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
                this.props;



            const createSortHandler =
                (property: keyof Transaction) => (event: React.MouseEvent<unknown>) => {
                    onRequestSort(event, property);
                };

            return (
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all transactions',
                                }}
                            />
                        </TableCell>
                        {this.headCells.map((headCell: HeadCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'left' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            );
        }
    }
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Transaction) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Transaction;
    label: string;
    numeric: boolean;
}

class EnhancedTableToolbar extends React.Component<EnhancedTableToolbarProps, any> {
    render() {
        const numSelected: number = this.props.numSelected;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Transactions
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );

    }
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

type Order = 'asc' | 'desc';

export default TransactionsTable