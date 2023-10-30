import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// yup is used here to validate the input as a certain format

const formValidationSchema = yup.object({
    name: yup
        .string()
        .min(4, "Atleast need 4 characters for the Author's name")
        .trim()
        .strict(true)
        .required("Author's name is required"),
    birth: yup
        .string()
        .min(10, "Valid DOB needs 10 characters (01-01-0001)")
        .max(12, "DOB should be within or equal to 15")
        .required("DOB is required")
        .matches(
            /^[0-9._%+-]{10,12}$/,
            "Enter Valid DOB (dd-mm-yyyy - 01-01-0001)"
        ),
    bio: yup
        .string()
        .min(30, "Atleast need 30 characters for Author's bio")
        .trim()
        .strict(true)
        .required("Author's bio is required"),
});

// This is Edit Author Component

export default function EditAuthor() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);

    // getting the data from the api to edit
    useEffect(() => {
        fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/authors/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setAuthor(data));
    }, []);

    // if the author variable contains some data the EditAuthorData function is called with sending the author is prop

    return author ? <EditAuthorData author={author} /> : "Loading...";
}

function EditAuthorData({ author }) {
    const navigate = useNavigate();


    // formik is used to set initital values, to validate and add the new author data to the api as crud operations
    // also navigating to authors list component
    const formik = useFormik({
        initialValues: {
            name: author.name,
            birth: author.birth,
            bio: author.bio,
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            fetch(`https://653f8baa9e8bd3be29e0c6d0.mockapi.io/authors/${author.id}`, {
                method: "PUT",
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
            <h1 className="text-center">EDIT AUTHOR DATA</h1>
            <TextField
                type="text"
                id="outlined-basic name"
                name="name"
                label="Enter Author's name"
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
                label="Enter Author's Date of Birth"
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
                label="Enter Author's short bio"
                variant="outlined"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <div className="mb-3">
                {formik.touched.bio && formik.errors.bio ? formik.errors.bio : ""}
            </div>
            <Button color="success" variant="contained" type="submit" className="w-30 mx-auto mt-1">
                EDIT AUTHOR DATA
            </Button>
        </form>
    );
}