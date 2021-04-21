import * as yup from 'yup';

export const formSchemaSignUp = yup.object({
  email: yup
    .string()
    .email('Invalid emial address')
    .required('Email is required'),
  userName: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 character long')
    .matches(/\d/, 'Password needs at least one number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password is required'),
});

export const formSchemaSignIn = yup.object({
  email: yup
    .string()
    .email('Invalid emial address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 character long')
    .matches(/\d/, 'Password needs at least one number')
    .required('Password is required'),
});
