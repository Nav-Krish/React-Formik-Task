import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is used here to validate the input as a certain format

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
    .required("SBN is required")
    .matches(/^[0-9._%+-]{13,15}$/, "Enter Valid ISBN (only numbers)"),
  publish: yup
    .string()
    .min(10, "Valid Published Date need 10 characters (01-01-0001)")
    .max(12, "Published Date should be within or equal to 15")
    .required("Published Date s required")
    .matches(
      /^[0-9._%+-]{10,12}$/,
      "Enter Valid Published Date (dd-mm-yyyy - 01-01-0001)"
    ),
});

// This is Edit Book Component

export default function EnterBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // getting the data from the api to edit
  useEffect(() => {
    fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/books/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, []);

  // if the book variable contains some data the EditBookData function is called with sending the book is prop

  return book ? <EditBookData book={book} /> : "Loading...";
}

function EditBookData({ book }) {
  const navigate = useNavigate();

  // formik is used to set initital values, to validate and add the new author data to the api as crud operations
  // also navigating to books list component
  const formik = useFormik({
    initialValues: {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publish: book.publish,
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/books/${book.id}`, {
        method: "PUT",
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
      <h1 className="text-center">Edit Book Data</h1>
      <TextField
        type="text"
        id="outlined-basic title"
        name="title"
        label="Enter Book's Title"
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
        label="Enter Book's Author"
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
        label="Enter Book's ISBN"
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
        label="Enter Book's Published Date"
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
      <Button color="success" variant="contained" type="submit" className="w-30 m-auto">
        EDIT BOOK DATA
      </Button>
    </form>
  );
}