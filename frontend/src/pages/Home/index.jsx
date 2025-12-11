import {
  Box,
  Container,
  Grid,
  Stack,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import LoadingBox from "../../component/LoadingBox";
import { jobLoadAction } from "../../../redux/actions/jobAction";
import { jobTypeLoadAction } from "../../../redux/actions/jobTypeAction";
import EnhancedHeader from "./components/EnhancedHeader";
import FilterSidebar from "./components/FilterSidebar";
import JobCard from "./components/JobCard";
import StatsSection from "./components/StatsSection";
import CategorySection from "./components/CategorySection";
import EmptyState from "./components/EmptyState";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );

  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState(searchParams.get("cat") || "");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location, dispatch]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <EnhancedHeader />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <FilterSidebar
                setUniqueLocation={setUniqueLocation}
                handleChangeCategory={handleChangeCategory}
                cat={cat}
              />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
                >
                  موقعیت‌های شغلی
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {jobs?.length || 0} موقعیت شغلی یافت شد
                </Typography>
              </Box>

              {loading ? (
                <LoadingBox />
              ) : jobs && jobs.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <Stack spacing={2}>
                    {jobs &&
                      jobs.map((job) => <JobCard key={job._id} job={job} />)}
                  </Stack>

                  {pages > 1 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                    >
                      <Pagination
                        count={pages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                        size="large"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Container>

        <StatsSection jobs={jobs} setUniqueLocation={setUniqueLocation} />
        <CategorySection />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
