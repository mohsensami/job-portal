import { Avatar, Box } from '@mui/material';
import { useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup.string('ایمیل خود را وارد کنید').email('یک ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
    password: yup
        .string('رمز عبور خود را وارد کنید')
        .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
        .required('رمز عبور الزامی است'),
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }

        // if (isAuthenticated) {
        //     navigate('/user/dashboard');
        // }
    }, [isAuthenticated]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //  alert(JSON.stringify(values, null, 2));
            dispatch(userSignInAction(values));
            actions.resetForm();
        },
    });

    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box onSubmit={formik.handleSubmit} component="form" className="form_style border-style">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="ایمیل"
                            name="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="ایمیل"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="رمز عبور"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="رمز عبور"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button fullWidth variant="contained" type="submit">
                            ورود
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default LogIn;
