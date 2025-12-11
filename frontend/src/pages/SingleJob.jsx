import {
  Stack,
  Typography,
  Button,
  Chip,
  Divider,
  Box,
  Container,
  Paper,
  Avatar,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  AttachMoney,
  Work,
  AccessTime,
  Business,
  Description,
  CheckCircle,
  Share,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import { jobLoadSingleAction } from "../../redux/actions/jobAction";
import { userApplyJobAction } from "../../redux/actions/userAction";

const SingleJob = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { userInfo } = useSelector((state) => state.signIn);
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id, dispatch]);

  const applyForAJob = () => {
    if (!userInfo) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }
    dispatch(
      userApplyJobAction({
        title: singleJob && singleJob.title,
        description: singleJob && singleJob.description,
        salary: singleJob && singleJob.salary,
        location: singleJob && singleJob.location,
      })
    );
    setApplied(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "امروز";
      if (diffDays === 1) return "دیروز";
      if (diffDays < 7) return `${diffDays} روز پیش`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
      return `${Math.floor(diffDays / 365)} سال پیش`;
    } catch (error) {
      return "";
    }
  };

  if (loading) {
    return (
      <>
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
          <Navbar />
          <Container sx={{ pt: 4, pb: 4 }}>
            <LoadingBox />
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: 4,
              mb: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Chip
                    label={singleJob?.jobType?.jobTypeName || "بدون دسته‌بندی"}
                    color="primary"
                    size="small"
                    icon={<Work />}
                  />
                  {singleJob?.available ? (
                    <Chip label="در حال استخدام" color="success" size="small" />
                  ) : (
                    <Chip label="بسته شده" color="default" size="small" />
                  )}
                </Stack>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  {singleJob?.title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={3}
                  flexWrap="wrap"
                  sx={{ gap: 2 }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn
                      sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontWeight: 500 }}
                    >
                      {singleJob?.location || "نامشخص"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AttachMoney
                      sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontWeight: 500 }}
                    >
                      {singleJob?.salary ? `$${singleJob.salary}` : "توافقی"}
                    </Typography>
                  </Stack>
                  {singleJob?.createdAt && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime
                        sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ color: "#666", fontWeight: 500 }}
                      >
                        {formatDate(singleJob.createdAt)}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => setIsBookmarked(!isBookmarked)}>
                  {isBookmarked ? (
                    <Bookmark sx={{ color: theme.palette.primary.main }} />
                  ) : (
                    <BookmarkBorder />
                  )}
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>

          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              {/* Job Description */}
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  p: 4,
                  mb: 3,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Description sx={{ color: theme.palette.primary.main }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#1a1a1a" }}
                  >
                    شرح موقعیت شغلی
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    lineHeight: 2,
                    whiteSpace: "pre-wrap",
                    fontSize: "1rem",
                  }}
                >
                  {singleJob?.description ||
                    "توضیحاتی برای این موقعیت شغلی ثبت نشده است."}
                </Typography>
              </Paper>

              {/* Requirements Section */}
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  p: 4,
                  mb: 3,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <CheckCircle sx={{ color: theme.palette.primary.main }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#1a1a1a" }}
                  >
                    الزامات و مهارت‌ها
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", lineHeight: 2 }}
                  >
                    برای اطلاع از جزئیات بیشتر در مورد الزامات و مهارت‌های مورد
                    نیاز این موقعیت شغلی، لطفاً با کارفرما تماس بگیرید.
                  </Typography>
                </Stack>
              </Paper>

              {/* Company/Employer Info */}
              {singleJob?.user && (
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 4,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Business sx={{ color: theme.palette.primary.main }} />
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#1a1a1a" }}
                    >
                      اطلاعات کارفرما
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 3 }} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 64,
                        height: 64,
                        fontSize: "1.5rem",
                      }}
                    >
                      {singleJob.user.firstName?.[0] || "ک"}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {singleJob.user.firstName} {singleJob.user.lastName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        کارفرما
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Apply Button Card */}
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid #e0e0e0",
                    position: "sticky",
                    top: 20,
                  }}
                >
                  <Button
                    onClick={applyForAJob}
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={applied || !singleJob?.available}
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      mb: 2,
                      bgcolor: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {applied ? "درخواست شما ارسال شد" : "ارسال رزومه"}
                  </Button>
                  {!userInfo && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      برای ارسال رزومه باید وارد حساب کاربری شوید
                    </Typography>
                  )}
                </Paper>

                {/* Job Details Card */}
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, color: "#1a1a1a" }}
                  >
                    جزئیات موقعیت شغلی
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Work
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          دسته‌بندی
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {singleJob?.jobType?.jobTypeName || "بدون دسته‌بندی"}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationOn
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          موقعیت
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {singleJob?.location || "نامشخص"}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AttachMoney
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          حقوق
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {singleJob?.salary ? `$${singleJob.salary}` : "توافقی"}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTime
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          تاریخ انتشار
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {singleJob?.createdAt
                          ? formatDate(singleJob.createdAt)
                          : "نامشخص"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                {/* Share Card */}
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, color: "#1a1a1a" }}
                  >
                    اشتراک‌گذاری
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton
                      sx={{
                        bgcolor: "#1877f2",
                        color: "white",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        f
                      </Typography>
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: "#1da1f2",
                        color: "white",
                        "&:hover": { bgcolor: "#0d8bd9" },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        t
                      </Typography>
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: "#0077b5",
                        color: "white",
                        "&:hover": { bgcolor: "#005885" },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        in
                      </Typography>
                    </IconButton>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
