import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthService } from '../../utility/api';

function Login() {

  const navigate = useNavigate();
  const [err,setError] = useState('');

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required"),
    password: yup
      .string("Enter you password")
      .min(8, 'Password must me 8 character')
      .required('Password is required')
  })


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      AuthService.login({email:values.email, password:values.password})
      .then((response)=>{
        const data = response.data;
        localStorage.setItem('token',data.accessToken);
        navigate('/');
      }).catch((res)=>{
        setError(res.response.data.message)
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
          >Event Admin Page</Typography>
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
            <TextField
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{mb:'2rem'}}
            />
            <Typography variant='subtitle1' color='red'>{err}</Typography>
            <div>
              <Link to='/forget'>
                <Typography variant='subtitle1'>Forget Password?</Typography>
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

export default Login