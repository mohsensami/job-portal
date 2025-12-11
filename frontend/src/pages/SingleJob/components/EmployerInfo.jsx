import {
  Stack,
  Typography,
  Paper,
  Divider,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";
import { Business } from "@mui/icons-material";

const EmployerInfo = ({ employer }) => {
  const theme = useTheme();

  if (!employer) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 4,
        border: "1px solid #e0e0e0",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Business sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
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
          {employer.firstName?.[0] || "ک"}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {employer.firstName} {employer.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            کارفرما
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default EmployerInfo;
