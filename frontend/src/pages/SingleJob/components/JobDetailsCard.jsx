import { Stack, Typography, Paper, Divider, useTheme } from "@mui/material";
import { LocationOn, AttachMoney, Work, AccessTime } from "@mui/icons-material";
import { formatDate } from "../utils";

const JobDetailsCard = ({ job }) => {
  const theme = useTheme();

  const details = [
    {
      icon: <Work sx={{ color: theme.palette.primary.main, fontSize: 20 }} />,
      label: "دسته‌بندی",
      value: job?.jobType?.jobTypeName || "بدون دسته‌بندی",
    },
    {
      icon: (
        <LocationOn sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
      ),
      label: "موقعیت",
      value: job?.location || "نامشخص",
    },
    {
      icon: (
        <AttachMoney sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
      ),
      label: "حقوق",
      value: job?.salary ? `$${job.salary}` : "توافقی",
    },
    {
      icon: (
        <AccessTime sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
      ),
      label: "تاریخ انتشار",
      value: job?.createdAt ? formatDate(job.createdAt) : "نامشخص",
    },
  ];

  return (
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
        {details.map((detail, index) => (
          <div key={index}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                {detail.icon}
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {detail.label}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {detail.value}
              </Typography>
            </Stack>
            {index < details.length - 1 && <Divider />}
          </div>
        ))}
      </Stack>
    </Paper>
  );
};

export default JobDetailsCard;
