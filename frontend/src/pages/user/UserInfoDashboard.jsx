import { useState, useEffect } from "react";
import {
  useTheme,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";
import { userProfileAction } from "../../../redux/actions/userAction";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const UserInfoDashboard = () => {
  const { user, loading } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.signIn);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Check if user is a job seeker (role === 0)
  const isJobSeeker = userInfo?.role === 0;

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const { data: response } = await axiosInstance.put(
        `/api/user/edit/${userInfo?.info?._id || userInfo?._id}`,
        data
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message || "اطلاعات با موفقیت به‌روزرسانی شد");
      setIsEditing(false);
      setErrors({});
      // Refresh user profile
      dispatch(userProfileAction());
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "خطا در به‌روزرسانی اطلاعات";
      toast.error(errorMessage);

      // Set field errors if available
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  // If user is not a job seeker, show message
  if (!isJobSeeker) {
    return (
      <Box sx={{ maxWidth: "800px", margin: "auto", pt: 4 }}>
        <Alert severity="info">این صفحه فقط برای کارجویان در دسترس است.</Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", pt: 4, pb: 4 }}>
      <Card
        sx={{
          bgcolor: palette.secondary.midNightBlue,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
              اطلاعات شخصی
            </Typography>
            {!isEditing && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ bgcolor: "primary.main" }}
              >
                ویرایش
              </Button>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* First Name */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    نام
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.firstName || "نامشخص"}
                  </Typography>
                )}
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    نام خانوادگی
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.lastName || "نامشخص"}
                  </Typography>
                )}
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ایمیل
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.email || "نامشخص"}
                  </Typography>
                )}
              </Grid>

              {/* Phone */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    تلفن همراه
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    variant="outlined"
                    placeholder="09123456789"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.phone || "ثبت نشده"}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Action Buttons */}
            {isEditing && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={updateProfileMutation.isPending}
                  sx={{
                    borderColor: "#fafafa",
                    "&:hover": {
                      borderColor: "#fafafa",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={updateProfileMutation.isPending}
                  sx={{ bgcolor: "primary.main" }}
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      در حال ذخیره...
                    </>
                  ) : (
                    "ذخیره تغییرات"
                  )}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfoDashboard;
