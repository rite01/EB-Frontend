import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Must be atleat 3 characters.')
    .required('*Required'),
  email: Yup.string().required('*Required').email('Please enter valid Email'),
  department: Yup.string().required('*Required'),
  branch: Yup.string().required('*Required'),
  dob: Yup.string().required('*Required'),
  doj: Yup.string().required('*Required'),
});
