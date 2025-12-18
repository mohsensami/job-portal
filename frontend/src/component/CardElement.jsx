import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  applicationStatus,
}) => {
  const { palette } = useTheme();

  const getStatusInfo = (status) => {
    switch (status) {
      case "accepted":
        return {
          label: "تایید شده",
          color: "success",
          icon: <CheckCircleIcon fontSize="small" />,
        };
      case "rejected":
        return {
          label: "رد شده",
          color: "error",
          icon: <CancelIcon fontSize="small" />,
        };
      default:
        return {
          label: "در انتظار بررسی",
          color: "warning",
          icon: <PendingIcon fontSize="small" />,
        };
    }
  };

  const statusInfo = getStatusInfo(applicationStatus || "pending");

  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              color: palette.secondary.main,
              fontWeight: 500,
            }}
            gutterBottom
          >
            <IconButton>
              <LocationOnIcon
                sx={{ color: palette.secondary.main, fontSize: 18 }}
              />
            </IconButton>{" "}
            {location}
          </Typography>
          <Chip
            icon={statusInfo.icon}
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
        <Typography variant="h5" component="div">
          {jobTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2">
          توضیحات: {description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disableElevation
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            to={`/job/${id}`}
          >
            جزئیات بیشتر
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardElement;
