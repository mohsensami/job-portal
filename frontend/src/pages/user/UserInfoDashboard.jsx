import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const UserInfoDashboard = () => {
    const { user } = useSelector((state) => state.userProfile);
    const { palette } = useTheme();
    return (
        <>
            <Box sx={{ maxWidth: '50%', margin: 'auto', pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                            اطلاعات شخصی
                        </Typography>
                        <hr style={{ marginBottom: '30px' }} />
                        <Typography variant="h6" component="div" sx={{ color: '#fafafa' }}>
                            نام: {user && user.firstName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: '#fafafa' }}>
                            نام خانوادگی: {user && user.lastName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: '#fafafa' }}>
                            ایمیل: {user && user.email}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: 'grey', pt: 2 }} color="text.secondary">
                            وضعیت: {user && user.role === 0 ? 'کاربر عادی' : 'مدیر'}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default UserInfoDashboard;
