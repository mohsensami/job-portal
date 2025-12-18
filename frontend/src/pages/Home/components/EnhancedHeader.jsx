import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchInputEl from "../../../component/SearchInputEl";
import headerImage from "../../../images/hero.jpg";

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 0",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${headerImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative",
  color: "white",
}));

const EnhancedHeader = () => {
  const theme = useTheme();

  return (
    <StyledHeader>
      <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 1 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          پیدا کردن شغل رویایی شما
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          هزاران موقعیت شغلی در انتظار شماست
        </Typography>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <SearchInputEl />
        </Box>
        {/* <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          sx={{ mt: 4, flexWrap: "wrap", gap: 2 }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              1000+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              موقعیت شغلی
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              50+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              شهر
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              100+
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              کارفرما
            </Typography>
          </Box>
        </Stack> */}
      </Container>
    </StyledHeader>
  );
};

export default EnhancedHeader;
