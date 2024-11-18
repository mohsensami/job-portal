import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { theme } from './theme';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/LogIn';
import UserDashboard from './pages/user/UserDashboard';
import UserRoute from './component/UserRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminRoute from './component/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);

function App() {
    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
