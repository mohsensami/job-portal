import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DashApplicants = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Load all applicants
  const {
    data: applicantsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allApplicants"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/applicants/all");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "خطا در بارگذاری متقاضیان";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  const applicants = applicantsData?.applicants || [];
  const data = applicants.map((app, index) => ({
    id: app._id || index,
    _id: app._id,
    applicantName: app.applicant
      ? `${app.applicant.firstName} ${app.applicant.lastName}`
      : "نامشخص",
    applicantEmail: app.applicant?.email || "نامشخص",
    applicantId: app.applicant?._id,
    jobTitle: app.job?.title || "نامشخص",
    jobLocation: app.job?.location || "نامشخص",
    jobSalary: app.job?.salary || "نامشخص",
    jobId: app.job?._id,
    employerName: app.job?.user
      ? `${app.job.user.firstName} ${app.job.user.lastName}`
      : "نامشخص",
    employerEmail: app.job?.user?.email || "نامشخص",
    status: app.status || "pending",
    createdAt: app.createdAt,
    fullData: app,
  }));

  const handleViewDetails = (row) => {
    setSelectedApplicant(row.fullData);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedApplicant(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "پذیرفته شده";
      case "rejected":
        return "رد شده";
      default:
        return "در انتظار";
    }
  };

  const columns = [
    {
      field: "applicantName",
      headerName: "نام متقاضی",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon fontSize="small" color="primary" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "applicantEmail",
      headerName: "ایمیل متقاضی",
      width: 220,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "jobTitle",
      headerName: "عنوان شغل",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WorkIcon fontSize="small" color="primary" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "jobLocation",
      headerName: "موقعیت",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "jobSalary",
      headerName: "حقوق",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AttachMoneyIcon fontSize="small" color="success" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "employerName",
      headerName: "کارفرما",
      width: 180,
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "تاریخ درخواست",
      width: 180,
      renderCell: (params) => moment(params.value).format("YYYY/MM/DD - HH:mm"),
    },
    {
      field: "عملیات",
      headerName: "عملیات",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleViewDetails(params.row)}
        >
          مشاهده جزئیات
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        لیست متقاضیان
      </Typography>
      <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
        <Box sx={{ height: 600, width: "100%" }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              getRowId={(row) => row.id}
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid rgba(224, 224, 224, 0.1)",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          )}
        </Box>
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>جزئیات متقاضی</DialogTitle>
        <DialogContent>
          {selectedApplicant && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                اطلاعات متقاضی
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  نام و نام خانوادگی:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.applicant?.firstName}{" "}
                  {selectedApplicant.applicant?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ایمیل:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.applicant?.email}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ mb: 2, mt: 3, color: "primary.main" }}
              >
                اطلاعات شغل
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  عنوان شغل:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.job?.title || "نامشخص"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  موقعیت:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.job?.location || "نامشخص"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  حقوق:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.job?.salary || "نامشخص"}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ mb: 2, mt: 3, color: "primary.main" }}
              >
                اطلاعات کارفرما
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  نام و نام خانوادگی:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.job?.user?.firstName}{" "}
                  {selectedApplicant.job?.user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ایمیل:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {selectedApplicant.job?.user?.email}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ mb: 2, mt: 3, color: "primary.main" }}
              >
                وضعیت درخواست
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={getStatusLabel(selectedApplicant.status)}
                  color={getStatusColor(selectedApplicant.status)}
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  تاریخ درخواست:{" "}
                  {moment(selectedApplicant.createdAt).format(
                    "YYYY/MM/DD - HH:mm"
                  )}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashApplicants;
