import { Box, Container, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../component/Footer";
import LoadingBox from "../../component/LoadingBox";
import Navbar from "../../component/Navbar";
import { jobLoadSingleAction } from "../../../redux/actions/jobAction";
import { userApplyJobAction } from "../../../redux/actions/userAction";
import JobHeader from "./components/JobHeader";
import JobDescription from "./components/JobDescription";
import JobRequirements from "./components/JobRequirements";
import EmployerInfo from "./components/EmployerInfo";
import ApplyButtonCard from "./components/ApplyButtonCard";
import JobDetailsCard from "./components/JobDetailsCard";
import ShareCard from "./components/ShareCard";

const SingleJob = () => {
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { userInfo } = useSelector((state) => state.signIn);
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id, dispatch]);

  const handleApply = () => {
    if (!userInfo) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }
    dispatch(
      userApplyJobAction({
        title: singleJob?.title,
        description: singleJob?.description,
        salary: singleJob?.salary,
        location: singleJob?.location,
      })
    );
    setApplied(true);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality with backend
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: singleJob?.title,
        text: singleJob?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("لینک کپی شد!");
    }
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Container sx={{ pt: 4, pb: 4 }}>
          <LoadingBox />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <JobHeader
          job={singleJob}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
          onShare={handleShare}
        />

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <JobDescription description={singleJob?.description} />
            <JobRequirements requirements={singleJob?.requirements} />
            <EmployerInfo employer={singleJob?.user} />
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <ApplyButtonCard
                onApply={handleApply}
                applied={applied}
                isAvailable={singleJob?.available}
                userInfo={userInfo}
              />
              <JobDetailsCard job={singleJob} />
              <ShareCard />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default SingleJob;
