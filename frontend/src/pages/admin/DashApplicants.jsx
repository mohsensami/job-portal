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
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import { IconButton, Tooltip } from "@mui/material";

const DashApplicants = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const queryClient = useQueryClient();

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

  // Mutation for updating application status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ applicationId, status }) => {
      const { data } = await axiosInstance.put(
        `/api/application/${applicationId}/status`,
        { status }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "وضعیت با موفقیت تغییر یافت");
      // Refetch applicants list
      queryClient.invalidateQueries({ queryKey: ["allApplicants"] });
      // Update selected applicant if dialog is open
      if (selectedApplicant && detailDialogOpen) {
        const updatedApplicant = data.application;
        setSelectedApplicant(updatedApplicant);
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || error.message || "خطا در تغییر وضعیت";
      toast.error(errorMessage);
    },
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

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedApplicant(null);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    updateStatusMutation.mutate({ applicationId, status: newStatus });
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

  // Get total applications count from jobsHistory
  const getTotalApplications = (applicant) => {
    return applicant?.jobsHistory?.length || 0;
  };

  // Get accepted applications count
  const getAcceptedCount = (applicant) => {
    if (!applicant?.jobsHistory) return 0;
    return applicant.jobsHistory.filter(
      (job) => job.applicationStatus === "accepted"
    ).length;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        لیست متقاضیان ({applicants.length} نفر)
      </Typography>

      {applicants.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            هیچ متقاضی‌ای یافت نشد
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {applicants.map((application) => {
            const applicant = application.applicant;
            const job = application.job;
            const totalApplications = getTotalApplications(applicant);
            const acceptedCount = getAcceptedCount(applicant);

            return (
              <Grid item xs={12} sm={6} md={4} key={application._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Header with Avatar and Status */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 56,
                          height: 56,
                          fontSize: "1.5rem",
                        }}
                      >
                        {applicant?.firstName?.[0] || "?"}
                        {applicant?.lastName?.[0] || ""}
                      </Avatar>
                      <Chip
                        label={getStatusLabel(application.status)}
                        color={getStatusColor(application.status)}
                        size="small"
                      />
                    </Box>

                    {/* Applicant Name */}
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {applicant?.firstName} {applicant?.lastName}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Applicant Email */}
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <EmailIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {applicant?.email}
                      </Typography>
                    </Box>

                    {/* Job Title (minimal info) */}
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <BusinessIcon
                        fontSize="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        برای: {job?.title || "نامشخص"}
                      </Typography>
                    </Box>

                    {/* Member Since */}
                    {applicant?.createdAt && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <CalendarTodayIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          عضو از:{" "}
                          {moment(applicant.createdAt).format("YYYY/MM/DD")}
                        </Typography>
                      </Box>
                    )}

                    {/* Application Stats */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          کل درخواست‌ها
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {totalApplications}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          پذیرفته شده
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {acceptedCount}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Application Date */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        تاریخ درخواست:{" "}
                        {moment(application.createdAt).format(
                          "YYYY/MM/DD - HH:mm"
                        )}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                      py: 1.5,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => handleViewDetails(application)}
                    >
                      جزئیات بیشتر
                    </Button>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="تایید">
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() =>
                            handleStatusChange(application._id, "accepted")
                          }
                          disabled={
                            updateStatusMutation.isPending ||
                            application.status === "accepted"
                          }
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="رد">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleStatusChange(application._id, "rejected")
                          }
                          disabled={
                            updateStatusMutation.isPending ||
                            application.status === "rejected"
                          }
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="در انتظار">
                        <IconButton
                          color="warning"
                          size="small"
                          onClick={() =>
                            handleStatusChange(application._id, "pending")
                          }
                          disabled={
                            updateStatusMutation.isPending ||
                            application.status === "pending"
                          }
                        >
                          <PendingIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

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
              {/* Applicant Info */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 64,
                    height: 64,
                    fontSize: "1.8rem",
                  }}
                >
                  {selectedApplicant.applicant?.firstName?.[0] || "?"}
                  {selectedApplicant.applicant?.lastName?.[0] || ""}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedApplicant.applicant?.firstName}{" "}
                    {selectedApplicant.applicant?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedApplicant.applicant?.email}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(selectedApplicant.status)}
                  color={getStatusColor(selectedApplicant.status)}
                  sx={{ mr: "auto" }}
                />
              </Box>

              <Grid container spacing={3}>
                {/* Applicant Statistics */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "primary.main" }}
                  >
                    آمار متقاضی
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        تاریخ عضویت
                      </Typography>
                      <Typography variant="body1">
                        {selectedApplicant.applicant?.createdAt
                          ? moment(
                              selectedApplicant.applicant.createdAt
                            ).format("YYYY/MM/DD")
                          : "نامشخص"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        تعداد کل درخواست‌ها
                      </Typography>
                      <Typography variant="body1">
                        {getTotalApplications(selectedApplicant.applicant)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        تعداد درخواست‌های پذیرفته شده
                      </Typography>
                      <Typography variant="body1" color="success.main">
                        {getAcceptedCount(selectedApplicant.applicant)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Application Info */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "primary.main" }}
                  >
                    اطلاعات درخواست
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        عنوان شغل
                      </Typography>
                      <Typography variant="body1">
                        {selectedApplicant.job?.title || "نامشخص"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        تاریخ درخواست
                      </Typography>
                      <Typography variant="body1">
                        {moment(selectedApplicant.createdAt).format(
                          "YYYY/MM/DD - HH:mm"
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Jobs History */}
                {selectedApplicant.applicant?.jobsHistory &&
                  selectedApplicant.applicant.jobsHistory.length > 0 && (
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, color: "primary.main" }}
                      >
                        سابقه درخواست‌ها
                      </Typography>
                      <Box
                        sx={{
                          maxHeight: 200,
                          overflowY: "auto",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          p: 2,
                        }}
                      >
                        <Stack spacing={1}>
                          {selectedApplicant.applicant.jobsHistory
                            .slice(0, 5)
                            .map((job, index) => (
                              <Box
                                key={index}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  p: 1,
                                  bgcolor: "background.default",
                                  borderRadius: 1,
                                }}
                              >
                                <Box>
                                  <Typography variant="body2" fontWeight={500}>
                                    {job.title || "بدون عنوان"}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {job.location || "نامشخص"}
                                  </Typography>
                                </Box>
                                <Chip
                                  label={
                                    job.applicationStatus === "accepted"
                                      ? "پذیرفته شده"
                                      : job.applicationStatus === "rejected"
                                      ? "رد شده"
                                      : "در انتظار"
                                  }
                                  color={
                                    job.applicationStatus === "accepted"
                                      ? "success"
                                      : job.applicationStatus === "rejected"
                                      ? "error"
                                      : "warning"
                                  }
                                  size="small"
                                />
                              </Box>
                            ))}
                        </Stack>
                      </Box>
                    </Grid>
                  )}
              </Grid>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() =>
                    handleStatusChange(selectedApplicant._id, "accepted")
                  }
                  disabled={
                    updateStatusMutation.isPending ||
                    selectedApplicant.status === "accepted"
                  }
                >
                  تایید
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() =>
                    handleStatusChange(selectedApplicant._id, "rejected")
                  }
                  disabled={
                    updateStatusMutation.isPending ||
                    selectedApplicant.status === "rejected"
                  }
                >
                  رد
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<PendingIcon />}
                  onClick={() =>
                    handleStatusChange(selectedApplicant._id, "pending")
                  }
                  disabled={
                    updateStatusMutation.isPending ||
                    selectedApplicant.status === "pending"
                  }
                >
                  در انتظار
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashApplicants;
