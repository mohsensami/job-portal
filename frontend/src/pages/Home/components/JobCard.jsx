import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  Work,
  AttachMoney,
  AccessTime,
  ArrowForward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils";

const JobCard = ({ job }) => {
  const theme = useTheme();

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
      return `${Math.floor(diffDays / 30)} ماه پیش`;
    } catch (error) {
      return "";
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
              fontSize: "1.5rem",
            }}
          >
            {job?.user?.firstName?.[0]?.toUpperCase() || "ک"}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Chip
                label={job.jobType?.jobTypeName || "بدون دسته‌بندی"}
                size="small"
                color="primary"
                sx={{ fontSize: "0.75rem", height: 24 }}
              />
              {job.available && (
                <Chip
                  label="فعال"
                  size="small"
                  color="success"
                  sx={{ fontSize: "0.75rem", height: 24 }}
                />
              )}
            </Stack>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "#1a1a1a",
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <Link
                to={`/job/${job._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {job.title}
              </Link>
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
              {job.location && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <LocationOn sx={{ color: "#666", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {job.location}
                  </Typography>
                </Stack>
              )}
              {job.salary && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AttachMoney sx={{ color: "#666", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {formatPrice(job.salary)}
                  </Typography>
                </Stack>
              )}
              {job.createdAt && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTime sx={{ color: "#666", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {formatDate(job.createdAt)}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mt: 1.5,
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {job.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 2 }}>
        <Button
          component={Link}
          to={`/job/${job._id}`}
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          مشاهده جزئیات
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
