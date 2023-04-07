import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthService } from '../../utility/api';

function ForgetPassword() {

  const navigate = useNavigate();
  const [err,setError] = useState('');

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required")
  })


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      AuthService.forgetPassword({email:values.email})
      .then((response)=>{
        navigate('/otpverify', { state:{email:values.email}});
      }).catch((res)=>{
        setError(res.response.data.message);
        return
      })
    }
  })
  return (
    <>
    <Container sx={{minHeight:'100%', display:'grid', placeItems:'center'}}>
      <Paper sx={{ maxWidth:'500px', maxHeight:'min-content', p:'2rem'}}>
        <Stack alignItems={'center'}>
          <Typography
          padding={'3rem 0rem'}
          variant='h3'   
          > Forget Password</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{mb:'1rem'}}
            />
            <Typography variant='subtitle1' color='red'>{err}</Typography>
            <div>
              <Link to='/login'>
                <Typography variant='subtitle1'>Login</Typography>
              </Link>
            </div>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Stack>
      </Paper>
      </Container>
    </>
  )
}

export default ForgetPassword