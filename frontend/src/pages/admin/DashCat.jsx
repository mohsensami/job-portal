import { useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";

const DashCat = () => {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // Load job types list
  const {
    data: jobTypes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/type/jobs");
      return data.jobT;
    },
  });

  if (isError) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "خطا در بارگذاری دسته‌بندی‌ها"
    );
  }

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (jobId) => {
      const { data } = await axiosInstance.delete(`/api/type/delete/${jobId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("دسته‌بندی شغل با موفقیت حذف شد!");
      queryClient.invalidateQueries({ queryKey: ["jobTypes"] });
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
      field: "_id",
      headerName: "شناسه دسته‌بندی",
      width: 150,
      editable: true,
    },
    {
      field: "jobTypeName",
      headerName: "نام دسته‌بندی",
      width: 150,
    },
    {
      field: "user",
      headerName: "کاربر ایجادکننده",
      width: 150,
      valueGetter: (data) => data?.row?.user?.firstName || "نامشخص",
    },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 150,
      valueGetter: (data) =>
        data?.row?.createdAt
          ? new Date(data.row.createdAt).toLocaleDateString("fa-IR")
          : "-",
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
      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        فهرست دسته‌بندی شغل‌ها
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
            rows={jobTypes}
            loading={isLoading}
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

export default DashCat;
