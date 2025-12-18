import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";
import { jobLoadAction } from "../../../redux/actions/jobAction";
import { formatPrice } from "../../utils";

const DashJobs = () => {
  const dispatch = useDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (jobId) => {
      const { data } = await axiosInstance.delete(`/api/job/delete/${jobId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("شغل با موفقیت حذف شد!");
      dispatch(jobLoadAction());
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "خطایی در حذف شغل رخ داد";
      toast.error(errorMessage);
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    },
  });

  //delete job by Id
  const deleteJobById = (e, id) => {
    e.preventDefault();
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      deleteJobMutation.mutate(jobToDelete);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  const columns = [
    {
      field: "title",
      headerName: "نام شغل",
      width: 350,
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
      field: "عملیات",
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
            disabled={deleteJobMutation.isPending}
          >
            {deleteJobMutation.isPending ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "حذف"
            )}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6">فهرست شغل‌ها</Typography>
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
            rows={data}
            loading={loading}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">تأیید حذف شغل</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            آیا از حذف این شغل اطمینان دارید؟ این عمل غیرقابل بازگشت است.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            disabled={deleteJobMutation.isPending}
          >
            انصراف
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteJobMutation.isPending}
            startIcon={
              deleteJobMutation.isPending ? (
                <CircularProgress size={16} />
              ) : null
            }
          >
            {deleteJobMutation.isPending ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashJobs;
