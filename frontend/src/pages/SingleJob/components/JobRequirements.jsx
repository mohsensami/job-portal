import { Stack, Typography, Paper, Divider, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const JobRequirements = ({ requirements }) => {
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
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <CheckCircle sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
          الزامات و مهارت‌ها
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        {requirements ? (
          <Typography
            variant="body1"
            sx={{ color: "#666", lineHeight: 2, whiteSpace: "pre-wrap" }}
          >
            {requirements}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ color: "#666", lineHeight: 2 }}>
            برای اطلاع از جزئیات بیشتر در مورد الزامات و مهارت‌های مورد نیاز این
            موقعیت شغلی، لطفاً با کارفرما تماس بگیرید.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default JobRequirements;
