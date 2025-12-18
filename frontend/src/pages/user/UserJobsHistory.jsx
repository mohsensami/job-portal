import { Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardElement from "../../component/CardElement";
import { userProfileAction } from "../../../redux/actions/userAction";

const UserJobsHistory = () => {
  const { user, loading } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const jobsHistory = user?.jobsHistory || [];

  return (
    <>
      <Box>
        <Typography variant="h6">تاریخچه شغل‌ها</Typography>
        <Box sx={{ mt: 3 }}>
          {loading && <Typography>در حال بارگذاری...</Typography>}

          {!loading && jobsHistory.length === 0 && (
            <Typography>هنوز برای هیچ شغلی رزومه ارسال نکرده‌اید.</Typography>
          )}

          {!loading &&
            jobsHistory.length > 0 &&
            jobsHistory.map((history) => (
              <CardElement
                key={history._id}
                id={history.job || history._id}
                jobTitle={history.title}
                description={history.description || ""}
                category=""
                location={history.location}
                applicationStatus={history.applicationStatus}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default UserJobsHistory;
