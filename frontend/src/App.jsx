import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { theme } from "./theme";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/UserRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import AdminRoute from "./component/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import Create from "./pages/admin/job/Create";
import Edit from "./pages/admin/job/Edit";
import DashCat from "./pages/admin/DashCat";

// تنظیم کش Emotion برای RTL در MUI
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin, prefixer],
});

// HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const CreateHOC = Layout(Create);
const EditHOC = Layout(Edit);
const DashCatHOC = Layout(DashCat);

function App() {
  return (
    <>
      <ToastContainer />
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* جهت کلی RTL برای محتوای اپ */}
          <div dir="rtl">
            <ProSidebarProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/location/:location" element={<Home />} />
                  <Route path="/search/:keyword" element={<Home />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/job/:id" element={<SingleJob />} />
                  <Route
                    path="/user/dashboard"
                    element={
                      <UserRoute>
                        <UserDashboardHOC />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/user/jobs"
                    element={
                      <UserRoute>
                        <UserJobsHistoryHOC />
                      </UserRoute>
                    }
                  />
                  <Route
                    path="/user/info"
                    element={
                      <UserRoute>
                        <UserInfoDashboardHOC />
                      </UserRoute>
                    }
                  />

                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <AdminDashboardHOC />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <DashUsersHOC />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/jobs"
                    element={
                      <AdminRoute>
                        <DashJobsHOC />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/job/create"
                    element={
                      <AdminRoute>
                        <CreateHOC />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/edit/job/:job_id"
                    element={
                      <AdminRoute>
                        <EditHOC />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/category"
                    element={
                      <AdminRoute>
                        <DashCatHOC />
                      </AdminRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ProSidebarProvider>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
