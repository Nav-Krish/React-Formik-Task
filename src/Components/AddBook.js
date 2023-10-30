import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is set to validate the input

const formValidationSchema = yup.object({
  title: yup
    .string()
    .min(4, "Atleast need 4 characters for the Book's title")
    .trim()
    .strict(true)
    .required("Book's title is required"),
  author: yup
    .string()
    .min(4, "Atleast need 4 characters for the Author's name")
    .trim()
    .strict(true)
    .required("Author's name is required"),
  isbn: yup
    .string()
    .min(13, "Atleast need 13 numbers for ISBN")
    .max(15, "ISBN should be within or equal to 15")
    .required("ISBN is required")
    .matches(/^[0-9._%+-]{13,15}$/, "Enter Valid ISBN (only numbers)"),
  publish: yup
    .string()
    .min(10, "Valid Published Date need 10 characters (01-01-0001)")
    .max(12, "Published Date should be within or equal to 15")
    .required("Published Date is required")
    .matches(
      /^[0-9._%+-]{10,12}$/,
      "Enter Valid Published Date (dd-mm-yyyy - 01-01-0001)"
    ),
});

// This is Add Book Component
function AddBook() {
  const navigate = useNavigate();

  // formik is used to set the initial values and corresponding crud operations while submitting
  // also navigates to books list component after the submit button is clicked
  const formik = useFormik({
    initialValues: { title: "", author: "", isbn: "", publish: "" },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/books`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => navigate("/"));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mt-5 d-flex flex-column"
    >
      <h1 className="text-center">ADD NEW BOOK DATA</h1>
      <TextField
        type="text"
        id="outlined-basic title"
        name="title"
        label="Enter Book Title"
        variant="outlined"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.title && formik.errors.title ? formik.errors.title : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic author"
        name="author"
        label="Enter Book Author"
        variant="outlined"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.author && formik.errors.author
          ? formik.errors.author
          : ""}
      </div>
      <TextField
        type="number"
        id="outlined-basic isbn"
        name="isbn"
        label="Enter Book ISBN"
        variant="outlined"
        value={formik.values.isbn}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.isbn && formik.errors.isbn ? formik.errors.isbn : ""}
      </div>
      <TextField
        type="text"
        id="outlined-basic publish"
        name="publish"
        label="Enter Book Publish Date"
        variant="outlined"
        value={formik.values.publish}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-3">
        {formik.touched.publish && formik.errors.publish
          ? formik.errors.publish
          : ""}
      </div>
      <Button color="success" variant="contained" type="submit" className="mx-auto w-30">
        Add New Book Data
      </Button>
    </form>
  );
}

export default AddBook;