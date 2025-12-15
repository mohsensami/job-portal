import React from "react";

import { useForm, Controller } from "react-hook-form";

import { useQuery, useMutation } from "@tanstack/react-query";

import { useAppQueryClient } from "../../../lib/react-query";

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

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import axiosInstance from "../../../../service/api";

const Create = () => {
  const navigate = useNavigate();

  const queryClient = useAppQueryClient();

  const {
    control,

    handleSubmit,

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

  // Create job mutation

  const createJobMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/api/job/create", formData);

      return data;
    },

    onSuccess: () => {
      toast.success("شغل با موفقیت ایجاد شد!");

      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      navigate("/admin/jobs");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "خطایی در ایجاد شغل رخ داد";

      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    createJobMutation.mutate(data);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, textAlign: "center" }}
        >
          ایجاد شغل جدید
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

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500 }}
                color={errors.description ? "error" : "text.primary"}
              >
                توضیحات شغل <span style={{ color: "red" }}>*</span>
              </Typography>

              <Controller
                name="description"
                control={control}
                rules={{
                  required: "توضیحات شغل الزامی است",
                }}
                render={({ field }) => (
                  <Box
                    sx={{
                      "& .quill": {
                        direction: "rtl",

                        fontFamily: '"IRANSansX", sans-serif',

                        "& .ql-container": {
                          minHeight: "200px",

                          direction: "rtl",

                          fontFamily: '"IRANSansX", sans-serif',

                          borderBottomLeftRadius: "4px",

                          borderBottomRightRadius: "4px",
                        },

                        "& .ql-editor": {
                          minHeight: "200px",

                          direction: "rtl",

                          textAlign: "right",

                          fontFamily: '"IRANSansX", sans-serif',

                          fontSize: "14px",

                          lineHeight: "1.8",

                          "&.ql-blank::before": {
                            left: "auto",

                            right: "15px",

                            textAlign: "right",

                            fontStyle: "normal",

                            color: "rgba(0, 0, 0, 0.6)",

                            fontFamily: '"IRANSansX", sans-serif',
                          },

                          "& p, & h1, & h2, & h3, & h4, & h5, & h6": {
                            textAlign: "right",

                            direction: "rtl",

                            fontFamily: '"IRANSansX", sans-serif',

                            margin: "0 0 8px 0",
                          },

                          "& ul, & ol": {
                            paddingRight: "1.5em",

                            paddingLeft: "0",

                            textAlign: "right",

                            direction: "rtl",

                            "& li": {
                              textAlign: "right",

                              direction: "rtl",

                              fontFamily: '"IRANSansX", sans-serif',
                            },
                          },

                          "& blockquote": {
                            borderRight: "4px solid #ccc",

                            borderLeft: "none",

                            paddingRight: "16px",

                            paddingLeft: "0",

                            marginRight: "0",

                            marginLeft: "0",

                            textAlign: "right",

                            direction: "rtl",

                            fontFamily: '"IRANSansX", sans-serif',
                          },

                          "& a": {
                            direction: "rtl",

                            textAlign: "right",

                            fontFamily: '"IRANSansX", sans-serif',
                          },
                        },

                        "& .ql-toolbar": {
                          direction: "rtl",

                          textAlign: "right",

                          fontFamily: '"IRANSansX", sans-serif',

                          borderTopLeftRadius: "4px",

                          borderTopRightRadius: "4px",

                          display: "flex",

                          flexDirection: "row-reverse",

                          "& .ql-formats": {
                            marginLeft: "8px",

                            marginRight: "0",

                            display: "flex",

                            flexDirection: "row-reverse",

                            "&:first-of-type": {
                              marginLeft: "0",
                            },

                            "&:last-of-type": {
                              marginRight: "8px",
                            },
                          },

                          "& button": {
                            direction: "ltr",

                            "&.ql-active": {
                              "& svg": {
                                transform: "scale(1.1)",
                              },
                            },
                          },

                          "& .ql-picker": {
                            direction: "ltr",

                            "& .ql-picker-label": {
                              direction: "ltr",
                            },

                            "& .ql-picker-options": {
                              direction: "ltr",

                              textAlign: "left",
                            },
                          },
                        },

                        "& .ql-snow .ql-stroke": {
                          stroke: "currentColor",
                        },

                        "& .ql-snow .ql-fill": {
                          fill: "currentColor",
                        },
                      },
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="توضیحات شغل را وارد کنید..."
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],

                          ["bold", "italic", "underline", "strike"],

                          [{ list: "ordered" }, { list: "bullet" }],

                          [{ align: [] }],

                          ["link"],

                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",

                        "bold",

                        "italic",

                        "underline",

                        "strike",

                        "list",

                        "bullet",

                        "align",

                        "link",
                      ]}
                    />
                  </Box>
                )}
              />

              {errors.description && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.75 }}
                >
                  {errors.description.message}
                </Typography>
              )}
            </Box>

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
                disabled={createJobMutation.isPending}
              >
                انصراف
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={createJobMutation.isPending || isLoadingJobTypes}
                sx={{ minWidth: 120 }}
              >
                {createJobMutation.isPending ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    در حال ایجاد...
                  </>
                ) : (
                  "ایجاد شغل"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Create;
