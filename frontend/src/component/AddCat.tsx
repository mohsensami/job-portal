import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../../service/api";

interface AddCatProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddCat: React.FC<AddCatProps> = ({ onSuccess, onCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      jobTypeName: "",
    },
  });

  // Create job type mutation
  const createJobTypeMutation = useMutation({
    mutationFn: async (formData: { jobTypeName: string }) => {
      const { data } = await axiosInstance.post("/api/type/create", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("دسته‌بندی شغل با موفقیت ایجاد شد!");
      reset();
      onSuccess?.();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "خطایی در ایجاد دسته‌بندی رخ داد";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: { jobTypeName: string }) => {
    createJobTypeMutation.mutate(data);
  };

  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          dir="rtl"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Controller
            name="jobTypeName"
            control={control}
            rules={{
              required: "نام دسته‌بندی الزامی است",
              maxLength: {
                value: 50,
                message: "نام دسته‌بندی نباید بیشتر از 50 کاراکتر باشد",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="نام دسته‌بندی"
                fullWidth
                dir="rtl"
                error={!!errors.jobTypeName}
                helperText={errors.jobTypeName?.message}
                required
                autoFocus
              />
            )}
          />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            {onCancel && (
              <Button
                onClick={onCancel}
                variant="outlined"
                color="secondary"
                disabled={createJobTypeMutation.isPending}
              >
                انصراف
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createJobTypeMutation.isPending}
              startIcon={
                createJobTypeMutation.isPending ? (
                  <CircularProgress size={16} />
                ) : null
              }
            >
              {createJobTypeMutation.isPending ? "در حال ایجاد..." : "ایجاد"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddCat;
