import { Add, PersonAdd, UploadFile } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useState } from "react";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import Header from "./Header";
import { useRef } from "react";
import { HttpService } from "../utility/api";

function AddGuest({id}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURl] = useState(null);
  const [error, setError] = useState(null);
  const fileInput = useRef();
  const validation = yup.object({
    name: yup.string().required("Name is required"),
    position: yup.string().required('Postion is required')
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
    },
    validationSchema:validation,
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);
      if (file == null) {
        setError("File is required");
        return;
      }

      formData.append("name", values.name);
      formData.append("img", file);
      formData.append("event_id", id);
      formData.append("position",values.position)
      HttpService.addGuest(formData)
        .then((res) => {
          setOpen(false);
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    },

  });
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        component="span"
        onClick={() => setOpen(true)}
        sx={{ width: "10rem", height: "2rem" }}
      >
        <Add />
        Add Guest
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          <Box
            sx={{
              p: "1rem 2rem",
              bgcolor: colors.primary[400],
              display: "flex",
              flexDirection: "column",
            }}
          >
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "2rem" }}>
            
            <Header
              subtitle={
                "Add any guest but giving its name detail and 1 profile image"
              }
              title={"Add Guest"}
            />
            <Box display='flex' flexDirection={'column'} alignItems={'center'}>
              {fileURL && (
                <img
                  src={fileURL}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Button
                variant="outlined"
                color="secondary"
                LinkComponent="label"
                type='button'
                htmlFor="main_img"
                startIcon={<UploadFile />}
                sx={{ marginTop: "1rem", marginBottom:'1rem'}}
                onClick={() => fileInput.current.click()}
              >
                Choose Profile Pic
              </Button>
              <input
                ref={fileInput}
                type="file"
                multiple
                name="main_img"
                id="main_img"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileURl(URL.createObjectURL(e.target.files[0]));
                }}
                style={{ display: "none" }}
              />
            </Box>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="User Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
              color="secondary"
            />
            <Box height={"10px"}></Box>
            <TextField
              id="position"
              name="position"
              fullWidth
              label="Work Status"
              type="text"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
              required
              color="secondary"
            />
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Box display={'flex'} justifyContent={'center'} marginTop={'10px'}>
            <Button type='submit' variant="contained" color='secondary'>
              <PersonAdd/>
              Add Guest
            </Button>
            </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddGuest;
