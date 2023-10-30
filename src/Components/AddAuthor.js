import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is set to validate the input
const formValidationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Atleast need 4 characters for Author's name")
    .trim()
    .strict(true)
    .required("Author's name is required"),
  birth: yup
    .string()
    .min(10, "Valid DOB needs 10 characters eg: (01-01-0001)")
    .max(12, "DOB should be within or equal to 12")
    .required("DOB is required")
    .matches(
      /^[0-9._%+-]{10,12}$/,
      "Enter Valid DOB (dd-mm-yyyy - 01-01-0001)"
    ),
  bio: yup
    .string()
    .min(30, "Atleast need 30 characters for the Author's bio")
    .strict(true)
    .required("Author's bio s required"),
});

// This is Add Author Component

function AddAuthor() {
  const navigate = useNavigate();

  // formik is used to set the initial values and corresponding crud operations while submitting
  // also navigates to authors list component after the submit button is clicked

  const formik = useFormik({
    initialValues: { name: "", birth: "", bio: "" },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/authors/`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => navigate("/authors-list"));
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mt-5 d-flex flex-column"
    >
      <h1  className="text-center">Add New Author Data</h1>
      <TextField
        type="text"
        id="outlined-basic name"
        name="name"
        label="Enter Author's Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic birth"
        name="birth"
        label="Enter Author's Date Of Birth (DOB)"
        variant="outlined"
        value={formik.values.birth}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.birth && formik.errors.birth ? formik.errors.birth : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic bio"
        name="bio"
        label="Enter Author's Short Bio"
        variant="outlined"
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.bio && formik.errors.bio ? formik.errors.bio : ""}
      </div>
      <Button color="success" variant="contained" type="submit" className="w-30 mx-auto">
        Add Author Data
      </Button>
    </form>
  );
}

export default AddAuthor;