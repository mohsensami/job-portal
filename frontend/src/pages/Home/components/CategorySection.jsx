import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Work,
  Code,
  Business,
  School,
  Engineering,
  MedicalServices,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const CategorySection = () => {
  const theme = useTheme();
  const { jobType } = useSelector((state) => state.jobTypeAll);

  const handleCategoryClick = (categoryId) => {
    window.location.href = `/?cat=${categoryId}`;
  };

  const categoryIcons = {
    برنامه‌نویسی: <Code />,
    بازاریابی: <Business />,
    آموزش: <School />,
    مهندسی: <Engineering />,
    پزشکی: <MedicalServices />,
    default: <Work />,
  };

  const getCategoryIcon = (categoryName) => {
    for (const key in categoryIcons) {
      if (categoryName?.includes(key)) {
        return categoryIcons[key];
      }
    }
    return categoryIcons.default;
  };

  if (!jobType || jobType.length === 0) return null;

  return (
    <Box sx={{ py: 6, bgcolor: "#fafafa" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: "center",
            color: "#1a1a1a",
          }}
        >
          دسته‌بندی‌های محبوب
        </Typography>
        <Grid container spacing={3}>
          {jobType.slice(0, 6).map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category._id}>
              <Paper
                onClick={() => handleCategoryClick(category._id)}
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {getCategoryIcon(category.jobTypeName)}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#1a1a1a",
                    fontWeight: 600,
                  }}
                >
                  {category.jobTypeName}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategorySection;
