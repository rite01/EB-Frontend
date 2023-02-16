import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Please enter valid Email').required('*Required'),
  password: Yup.string()
    .min(8, 'Must be atleat 8 characters.')
    .required('*Required'),
});
