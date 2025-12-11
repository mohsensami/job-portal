import { Button, Paper, Typography, useTheme } from "@mui/material";

const ApplyButtonCard = ({ onApply, applied, isAvailable, userInfo }) => {
  const theme = useTheme();

  return (
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
        onClick={onApply}
        variant="contained"
        fullWidth
        size="large"
        disabled={applied || !isAvailable}
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
  );
};

export default ApplyButtonCard;
