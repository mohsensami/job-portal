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
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../../service/api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";

// لیست استان‌های ایران
const IRAN_PROVINCES = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

const UserInfoDashboard = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aboutMe: "",
    skills: [],
    maritalStatus: "",
    birthYear: "",
    gender: "",
    militaryServiceStatus: "",
    province: "",
    address: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch user profile using react-query
  const {
    data: userProfileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/me");
      return data;
    },
    enabled: !!userInfo, // Only fetch if user is logged in
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  const user = userProfileData?.user;

  // Initialize form data when user data is loaded or changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        aboutMe: user.aboutMe || "",
        skills: user.skills || [],
        maritalStatus: user.maritalStatus || "",
        birthYear: user.birthYear || "",
        gender: user.gender || "",
        militaryServiceStatus: user.militaryServiceStatus || "",
        province: user.province || "",
        address: user.address || "",
      });
      setSkillInput("");
    }
  }, [user]);

  // Check if user is a job seeker (role === 0)
  const isJobSeeker = userInfo?.role === 0;

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const userId = userInfo?.info?._id || userInfo?._id;
      const { data: response } = await axiosInstance.put(
        `/api/user/edit/${userId}`,
        data
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message || "اطلاعات با موفقیت به‌روزرسانی شد");
      setIsEditing(false);
      setErrors({});
      // Invalidate and refetch user profile
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
    // Ensure form data is synced with current user data before editing
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        aboutMe: user.aboutMe || "",
        skills: user.skills || [],
        maritalStatus: user.maritalStatus || "",
        birthYear: user.birthYear || "",
        gender: user.gender || "",
        militaryServiceStatus: user.militaryServiceStatus || "",
        province: user.province || "",
        address: user.address || "",
      });
    }
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
        aboutMe: user.aboutMe || "",
        skills: user.skills || [],
        maritalStatus: user.maritalStatus || "",
        birthYear: user.birthYear || "",
        gender: user.gender || "",
        militaryServiceStatus: user.militaryServiceStatus || "",
        province: user.province || "",
        address: user.address || "",
      });
      setSkillInput("");
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

  // Skills handlers
  const handleAddSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    const exists = formData.skills.some(
      (s) => s.toLowerCase() === value.toLowerCase()
    );
    if (exists) {
      toast.info("این مهارت تکراری است");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));
    setSkillInput("");
  };

  const handleDeleteSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // If user is not a job seeker, show message
  if (!isJobSeeker) {
    return (
      <Box sx={{ maxWidth: "800px", margin: "auto", pt: 4 }}>
        <Alert severity="info">این صفحه فقط برای کارجویان در دسترس است.</Alert>
      </Box>
    );
  }

  if (isLoading) {
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

  if (isError) {
    return (
      <Box sx={{ maxWidth: "800px", margin: "auto", pt: 4 }}>
        <Alert severity="error">
          {error?.response?.data?.error ||
            error.message ||
            "خطا در بارگذاری اطلاعات"}
        </Alert>
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

              {/* About Me */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    درباره من
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleInputChange}
                    error={!!errors.aboutMe}
                    helperText={
                      errors.aboutMe ||
                      `${formData.aboutMe.length}/2000 کاراکتر`
                    }
                    variant="outlined"
                    multiline
                    rows={6}
                    placeholder="در مورد خودتان، مهارت‌ها، تجربیات و اهداف شغلی خود بنویسید..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                    inputProps={{
                      maxLength: 2000,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      mt: 1,
                      p: 2,
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 1,
                      minHeight: "100px",
                    }}
                  >
                    {user?.aboutMe ? (
                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {user.aboutMe}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        هنوز متنی وارد نشده است. روی دکمه ویرایش کلیک کنید تا
                        اطلاعات خود را تکمیل کنید.
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>

              {/* Skills */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AddIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    مهارت‌های حرفه‌ای
                  </Typography>
                </Box>
                {isEditing ? (
                  <>
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}
                    >
                      {formData.skills.length > 0 ? (
                        formData.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            onDelete={() => handleDeleteSkill(skill)}
                            color="primary"
                            variant="outlined"
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          هنوز مهارتی اضافه نکرده‌اید.
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <TextField
                        fullWidth
                        name="skillInput"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKeyDown}
                        placeholder="مثلاً: JavaScript, PHP, WordPress"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "white",
                          },
                        }}
                        inputProps={{ maxLength: 50 }}
                      />
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddSkill}
                        disabled={updateProfileMutation.isPending}
                      >
                        افزودن
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      minHeight: "40px",
                    }}
                  >
                    {user?.skills && user.skills.length > 0 ? (
                      user.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        مهارتی ثبت نشده است.
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>

              {/* Marital Status */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FavoriteIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    وضعیت تاهل
                  </Typography>
                </Box>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      sx={{
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value="">انتخاب کنید</MenuItem>
                      <MenuItem value="single">مجرد</MenuItem>
                      <MenuItem value="married">متاهل</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.maritalStatus === "single"
                      ? "مجرد"
                      : user?.maritalStatus === "married"
                      ? "متاهل"
                      : "ثبت نشده"}
                  </Typography>
                )}
              </Grid>

              {/* Birth Year */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CakeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    سال تولد
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="birthYear"
                    type="number"
                    value={formData.birthYear}
                    onChange={handleInputChange}
                    error={!!errors.birthYear}
                    helperText={errors.birthYear}
                    variant="outlined"
                    placeholder="مثلاً: 1375"
                    inputProps={{
                      min: 1950,
                      max: new Date().getFullYear(),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.birthYear || "ثبت نشده"}
                  </Typography>
                )}
              </Grid>

              {/* Gender */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <WcIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    جنسیت
                  </Typography>
                </Box>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      sx={{
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value="">انتخاب کنید</MenuItem>
                      <MenuItem value="male">مرد</MenuItem>
                      <MenuItem value="female">زن</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.gender === "male"
                      ? "مرد"
                      : user?.gender === "female"
                      ? "زن"
                      : "ثبت نشده"}
                  </Typography>
                )}
              </Grid>

              {/* Military Service Status */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <MilitaryTechIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    وضعیت خدمت سربازی
                  </Typography>
                </Box>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      name="militaryServiceStatus"
                      value={formData.militaryServiceStatus}
                      onChange={handleInputChange}
                      sx={{
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value="">انتخاب کنید</MenuItem>
                      <MenuItem value="liable">مشمول</MenuItem>
                      <MenuItem value="ongoing">در حال انجام</MenuItem>
                      <MenuItem value="completed">انجام شده</MenuItem>
                      <MenuItem value="exempt">معافیت دائم</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.militaryServiceStatus === "liable"
                      ? "مشمول"
                      : user?.militaryServiceStatus === "ongoing"
                      ? "در حال انجام"
                      : user?.militaryServiceStatus === "completed"
                      ? "انجام شده"
                      : user?.militaryServiceStatus === "exempt"
                      ? "معافیت دائم"
                      : "ثبت نشده"}
                  </Typography>
                )}
              </Grid>

              {/* Province */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    استان محل سکونت
                  </Typography>
                </Box>
                {isEditing ? (
                  <FormControl fullWidth>
                    <Select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      sx={{
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value="">انتخاب کنید</MenuItem>
                      {IRAN_PROVINCES.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {user?.province || "ثبت نشده"}
                  </Typography>
                )}
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <HomeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    آدرس محل سکونت
                  </Typography>
                </Box>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={
                      errors.address ||
                      `${formData.address.length}/500 کاراکتر (اختیاری)`
                    }
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="آدرس کامل محل سکونت خود را وارد کنید..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                    inputProps={{
                      maxLength: 500,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      mt: 1,
                      p: 2,
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 1,
                      minHeight: "60px",
                    }}
                  >
                    {user?.address ? (
                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {user.address}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        آدرسی ثبت نشده است.
                      </Typography>
                    )}
                  </Box>
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
