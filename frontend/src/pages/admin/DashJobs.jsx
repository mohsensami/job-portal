import { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../../../redux/actions/jobAction";
import { formatPrice } from "../../utils";

const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, []);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  //delete job by Id
  const deleteJobById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "شناسه شغل",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "نام شغل",
      width: 150,
    },
    {
      field: "jobType",
      headerName: "دسته‌بندی",
      width: 150,
      valueGetter: (data) => data?.row?.jobType.jobTypeName,
    },
    {
      field: "user",
      headerName: "کاربر",
      width: 150,
      valueGetter: (data) => data?.row?.user.firstName,
    },
    {
      field: "available",
      headerName: "در دسترس",
      width: 150,
      renderCell: (values) => (values.row.available ? "بله" : "خیر"),
    },

    {
      field: "salary",
      headerName: "حقوق",
      type: Number,
      width: 150,
      renderCell: (values) => formatPrice(values.row.salary),
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/job/${values.row._id}`}
            >
              ویرایش
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
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
    <Box>
      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        فهرست شغل‌ها
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          {" "}
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/job/create"
          >
            ایجاد شغل
          </Link>
        </Button>
      </Box>
      <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              color: "white",
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  // theme.palette.mode === 'light' ? grey[200] : grey[900],
                  theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={data}
            loading={loading}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashJobs;
