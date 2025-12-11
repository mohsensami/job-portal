import {
  Stack,
  Typography,
  Chip,
  Box,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  AttachMoney,
  Work,
  AccessTime,
  BookmarkBorder,
  Bookmark,
  Share,
} from "@mui/icons-material";
import { formatDate } from "../utils";

const JobHeader = ({ job, isBookmarked, onBookmarkToggle, onShare }) => {
  const theme = useTheme();

  return (
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
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip
              label={job?.jobType?.jobTypeName || "بدون دسته‌بندی"}
              color="primary"
              size="small"
              icon={<Work />}
            />
            {job?.available ? (
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
            {job?.title}
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ gap: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#666", fontWeight: 500 }}
              >
                {job?.location || "نامشخص"}
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
                {job?.salary ? `$${job.salary}` : "توافقی"}
              </Typography>
            </Stack>
            {job?.createdAt && (
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "#666", fontWeight: 500 }}
                >
                  {formatDate(job.createdAt)}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={onBookmarkToggle}>
            {isBookmarked ? (
              <Bookmark sx={{ color: theme.palette.primary.main }} />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>
          <IconButton onClick={onShare}>
            <Share />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default JobHeader;
