import { useEffect } from "react";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction } from "../../../redux/actions/userAction";

const DashUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = [];
  data = users !== undefined && users.length > 0 ? users : [];

  const deleteUserById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "email",
      headerName: "ایمیل",
      width: 250,
    },

    {
      field: "role",
      headerName: "وضعیت کاربر",
      width: 150,
      renderCell: (params) => (params.row.role === 1 ? "مدیر" : "کاربر عادی"),
    },

    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 250,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY/MM/DD "),
    },

    {
      field: "عملیات",
      width: 180,
      renderCell: (values) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/user/${values.row._id}`}
            >
              ویرایش
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteUserById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            حذف
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h6">تمام کاربران</Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            {" "}
            ایجاد کاربر
          </Button>
        </Box>
        <Paper>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashUsers;
