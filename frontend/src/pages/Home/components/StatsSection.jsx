import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Work, LocationOn, TrendingUp, People } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../service/api";

const StatsSection = ({ jobs, setUniqueLocation }) => {
  const theme = useTheme();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/stats");
      return data;
    },
    staleTime: Infinity,
  });

  const statsData = data?.stats || {};

  const stats = [
    {
      icon: <Work sx={{ fontSize: 40 }} />,
      title: "موقعیت‌های شغلی",
      value: jobs?.length || 0,
      color: theme.palette.primary.main,
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: "شهرها",
      value: setUniqueLocation?.length || 0,
      color: "#4caf50",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "کارجویان",
      value: isLoading ? "..." : statsData.jobseekers || 0,
      color: "#ff9800",
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: "کارفرمایان",
      value: isLoading ? "..." : statsData.employers || 0,
      color: "#9c27b0",
    },
  ];

  if (isError) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        py: 6,
        mt: 4,
        borderRadius: 2,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ color: "white", mb: 1 }}>{stat.icon}</Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
