/* eslint-disable unused-imports/no-unused-vars */

import { LoadingButton } from '@mui/lab';
import { Box, Container, CssBaseline, styled } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/redux/Store/store';

import { handleData } from '../../redux/Reducer';
import { getBranchData, getDepartmentData } from '../../services';
import { registerSchema } from '../../validations';
import { BasicDatePicker } from '../DatePicker';
import { CustomInput } from '../Input';
import { CustomSelect } from '../Select';

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

export const Registration = () => {
  const { editData, showProgressBar } = useSelector(
    (state: RootState) => state.counter,
  );
  const dispatch = useDispatch();
  const [department, setDepartment] = React.useState([]);
  const [branch, setBranch] = React.useState([]);
  const initialValues = {
    name: editData?.name || '',
    email: editData?.email || '',
    dob: '',
    department: '',
    doj: '',
    branch: '',
  };
  const getDropDownData = async () => {
    const departmentResult = await getDepartmentData();
    setDepartment(departmentResult?.data);
    const branchResult = await getBranchData();
    setBranch(branchResult?.data);
  };
  useEffect(() => {
    getDropDownData();
    return () => {
      dispatch(handleData(''));
    };
  }, []);
  const onSubmit = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: any,
    submitProps: { setSubmitting: (arg0: boolean) => void },
  ) => {
    console.log({ values });
    submitProps.setSubmitting(false);
  };
  return (
    <Box>
      <div className="d-flex align-items-center jystify-content-center flex-column cardDesign">
        <h2>Update Details</h2>
        <Box>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="formBody" autoComplete="off">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        <Field
                          component={CustomInput}
                          error={errors.name && touched.name}
                          label="Name"
                          name="name"
                        />
                        <ErrorMessage name="name">
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
                          component={CustomSelect}
                          error={errors.department && touched.department}
                          placeholder={'Select Department'}
                          menu={department}
                          name="department"
                        />
                        <ErrorMessage name="department">
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
                          component={BasicDatePicker}
                          type="date"
                          error={errors.dob && touched.dob}
                          label="Date Of Birth"
                          name="dob"
                        />
                        <ErrorMessage name="dob">
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
                      </div>
                      <div className="col">
                        <Field
                          component={CustomInput}
                          error={errors.email && touched.email}
                          label="Email"
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
                          error={errors.branch && touched.branch}
                          component={CustomSelect}
                          placeholder={'Select Branch'}
                          menu={branch}
                          name="branch"
                        />
                        <ErrorMessage name="branch">
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
                          component={BasicDatePicker}
                          error={errors.doj && touched.doj}
                          type="date"
                          label="Date Of Joining"
                          name="doj"
                        />
                        <ErrorMessage name="doj">
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
                      </div>
                    </div>

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
                        Submit
                      </StyledButton>
                    </div>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      </div>
    </Box>
  );
};
