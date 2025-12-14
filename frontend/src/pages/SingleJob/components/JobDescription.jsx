import {
  Stack,
  Typography,
  Paper,
  Divider,
  useTheme,
  Box,
} from "@mui/material";
import { Description } from "@mui/icons-material";

const JobDescription = ({ description }) => {
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
        <Description sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
          شرح موقعیت شغلی
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      {description ? (
        <Box
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{
            color: "#999",
            lineHeight: 2,
            fontSize: "1rem",
            fontStyle: "italic",
            fontFamily: '"IRANSansX", sans-serif',
          }}
        >
          توضیحاتی برای این موقعیت شغلی ثبت نشده است.
        </Typography>
      )}
    </Paper>
  );
};

export default JobDescription;
