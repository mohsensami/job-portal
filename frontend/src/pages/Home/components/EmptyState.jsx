import { Box, Alert, AlertTitle, Typography, Button } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
      }}
    >
      <SearchOff sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#666" }}>
        نتیجه‌ای یافت نشد
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#999", mb: 3, textAlign: "center" }}
      >
        متأسفانه هیچ موقعیت شغلی با فیلترهای انتخابی شما یافت نشد.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ borderRadius: 2 }}
      >
        مشاهده همه موقعیت‌ها
      </Button>
    </Box>
  );
};

export default EmptyState;
