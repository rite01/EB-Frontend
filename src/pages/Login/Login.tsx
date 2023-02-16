/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import type { RootState } from '@/redux/Store/store';

import Logo from '../../assets/images/Logo.svg';
import BgVideo from '../../assets/videos/banner.mp4';
import { CustomInput } from '../../components/Input/Input';
import { URL } from '../../constants';
import { loginUser } from '../../services';
import { loginSchema } from '../../validations';

const StyledButton = styled(LoadingButton)`
  background-color: red;
  border: 1px red solid;
  color: #fff;
  &:hover {
    background-color: #ffff;
    color: red;
    border: 1px red solid;
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const { showProgressBar } = useSelector((state: RootState) => state.counter);
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (
    values: { email: string; password: string },
    submitProps: { setSubmitting: (arg0: boolean) => void },
  ) => {
    const response: any = await loginUser(values);
    if (response?.status === 200) {
      toast.success('Login Successfull');
      Cookies.set('token', response?.token);
      Cookies.set('role', response?.data?.role?.name);
      navigate(URL.Dashboard);
      submitProps.setSubmitting(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="mainDiv">
        <video className="videoTag" autoPlay loop muted>
          <source src={BgVideo} type="video/mp4" />
        </video>
        <CssBaseline />
        <div className="d-flex align-items-center flex-column loginCard">
          <img src={Logo} alt="Logo" />
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="formBody" autoComplete="off">
                <Box sx={{ mt: 1, width: 500 }}>
                  <Field
                    error={errors.email && touched.email}
                    component={CustomInput}
                    label="Email Address"
                    type={'text'}
                    value={values.email}
                    name="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    error={errors.password && touched.password}
                    component={CustomInput}
                    label="Password"
                    type={'password'}
                    name="password"
                    value={values.password}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Grid container>
                    <Grid item xs>
                      <div className="d-flex justify-content-end mt-2">
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="w-100 d-flex justify-content-center">
                    <StyledButton
                      type="submit"
                      loading={showProgressBar}
                      className="mt-3"
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '100px',
                        padding: '10px 22px',
                        width: '22rem',
                      }}
                    >
                      Sign In
                    </StyledButton>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
