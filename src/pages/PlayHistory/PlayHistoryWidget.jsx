import {
  getApplicationsOfSelfUserThunk,
  getSelfUserApplicationsSelector,
} from "@redux/contestApplications";
import { useLoadingRedux } from "@utils/hooks";
import React from "react";
import { useSelector } from "react-redux";
import {
  DataGrid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { addSign } from "@utils/format";
import { visuallyHidden } from "@mui/utils";
import { alpha, Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import BigProcess from "@components/BigProcess";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const columns = [
  {
    id: "contest_id",
    numeric: true,
    label: "№ конкурса",
    disablePadding: true,
  },
  {
    id: "final_position",
    numeric: true,
    label: "Позиция",
  },
  {
    id: "coins_delta",
    numeric: true,
    label: "ΔC",
  },
  {
    id: "fantasy_points_delta",
    numeric: true,
    label: "ΔFC",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h5"
        id="tableTitle"
        component="div"
      >
        История игр
      </Typography>
    </Toolbar>
  );
};

function EnhancedTable({ rows }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("contest_id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, contestId) => {
    navigate(`/contest/${contestId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <EnhancedTableToolbar />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows
              .slice()
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.contest_id)}
                  tabIndex={-1}
                  key={row.contest_id}
                >
                  <TableCell>{row.contest_id}</TableCell>
                  <TableCell align="right">{row.final_position}</TableCell>
                  <TableCell align="right">{row.coins_delta}</TableCell>
                  <TableCell align="right">
                    {row.fantasy_points_delta}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Строк на страницу"
        rowsPerPageOptions={[5, 15, 150]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

const PlayHistoryWidget = () => {
  const { loading } = useLoadingRedux(getApplicationsOfSelfUserThunk, {
    enqueue: true,
  });

  const applications = useSelector(getSelfUserApplicationsSelector);

  return loading ? <BigProcess /> : <EnhancedTable rows={applications} />;
};

export default PlayHistoryWidget;
