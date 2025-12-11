import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  search: yup
    .string("عبارت جستجو را وارد کنید")
    .required("این فیلد نمی‌تواند خالی باشد"),
});

const SearchInputEl = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    //alert(values.search);
    const { search } = values;
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      search: "",
    },

    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <Search> */}

        <InputBase
          sx={{ bgcolor: "white", padding: "10px" }}
          fullWidth={true}
          id="search"
          name="search"
          label="جستجو"
          placeholder="مثال: توسعه‌دهنده، فرانت‌اند"
          value={values.search}
          onChange={handleChange}
          error={touched.search && Boolean(errors.search)}
          // helperText={touched.search && errors.search}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          جستجو
        </Button>
      </Box>
      <Box component="span" sx={{ color: "orange" }}>
        {touched.search && errors.search}
      </Box>
    </form>
  );
};

export default SearchInputEl;
