import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../../../../service/api";

const Edit = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      salary: "",
      location: "",
      jobType: "",
    },
  });

  // Fetch job data
  const {
    data: jobData,
    isLoading: isLoadingJob,
    error: jobError,
  } = useQuery({
    queryKey: ["job", job_id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/job/${job_id}`);
      return data;
    },
    enabled: !!job_id,
  });

  // Fetch job types
  const {
    data: jobTypesData,
    isLoading: isLoadingJobTypes,
    error: jobTypesError,
  } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/type/jobs");
      return data;
    },
  });

  // Update form when job data is loaded
  useEffect(() => {
    if (jobData?.job) {
      reset({
        title: jobData.job.title || "",
        description: jobData.job.description || "",
        salary: jobData.job.salary || "",
        location: jobData.job.location || "",
        jobType: jobData.job.jobType?._id || jobData.job.jobType || "",
      });
    }
  }, [jobData, reset]);

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.put(
        `/api/job/update/${job_id}`,
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("شغل با موفقیت به‌روزرسانی شد!");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", job_id] });
      navigate("/admin/jobs");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "خطایی در به‌روزرسانی شغل رخ داد";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    updateJobMutation.mutate(data);
  };

  if (isLoadingJob) {
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

  if (jobError) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="error">
          خطا در بارگذاری شغل:{" "}
          {jobError.response?.data?.error || jobError.message}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/jobs")}
          sx={{ mt: 2 }}
        >
          بازگشت به لیست شغل‌ها
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, textAlign: "center" }}
        >
          ویرایش شغل
        </Typography>

        {jobTypesError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            خطا در بارگذاری انواع شغل: {jobTypesError.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Title Field */}
            <Controller
              name="title"
              control={control}
              rules={{
                required: "عنوان شغل الزامی است",
                maxLength: {
                  value: 70,
                  message: "عنوان نباید بیشتر از 70 کاراکتر باشد",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="عنوان شغل"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  required
                />
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              rules={{
                required: "توضیحات شغل الزامی است",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="توضیحات شغل"
                  fullWidth
                  multiline
                  rows={6}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  required
                />
              )}
            />

            {/* Salary Field */}
            <Controller
              name="salary"
              control={control}
              rules={{
                required: "حقوق الزامی است",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="حقوق"
                  fullWidth
                  type="text"
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                  required
                />
              )}
            />

            {/* Location Field */}
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="موقعیت مکانی"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />

            {/* Job Type Field */}
            <FormControl fullWidth error={!!errors.jobType} required>
              <InputLabel>نوع شغل</InputLabel>
              <Controller
                name="jobType"
                control={control}
                rules={{
                  required: "نوع شغل الزامی است",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="نوع شغل"
                    disabled={isLoadingJobTypes}
                  >
                    {isLoadingJobTypes ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        در حال بارگذاری...
                      </MenuItem>
                    ) : jobTypesData?.jobT?.length > 0 ? (
                      jobTypesData.jobT.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                          {type.jobTypeName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>نوع شغلی یافت نشد</MenuItem>
                    )}
                  </Select>
                )}
              />
              {errors.jobType && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.75 }}
                >
                  {errors.jobType.message}
                </Typography>
              )}
            </FormControl>

            {/* Submit Button */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("/admin/jobs")}
                disabled={updateJobMutation.isPending}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  updateJobMutation.isPending ||
                  isLoadingJobTypes ||
                  isLoadingJob
                }
                sx={{ minWidth: 120 }}
              >
                {updateJobMutation.isPending ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    در حال به‌روزرسانی...
                  </>
                ) : (
                  "ذخیره تغییرات"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Edit;
