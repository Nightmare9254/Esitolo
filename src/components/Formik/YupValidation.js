import * as yup from 'yup';
import { string } from 'yup/lib/locale';

export const formSchemaSignUp = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
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
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 character long')
    .matches(/\d/, 'Password needs at least one number')
    .required('Password is required'),
});

export const shippingAddress = yup.object({
  name: yup
    .string()
    .min(2, 'Name must contains at least 2 letters ')
    .required('Name is required'),
  state: yup
    .string()
    .min(2, 'Name must contains at least 2 letters')
    .required(),
  city: yup.string().min(2).required('City is required'),
  street: yup.string().required('Street is required'),
  apartment: yup.number().min(1).required('Apartment number is required'),
  zipCode: yup
    .string()
    .matches(/^\d{2}(?:[-\s]\d{3})?$/, 'Invalid zip code')
    .required('Postal code is required'),
  phone: yup
    .string()
    .max(9, 'Phone number max 9')
    .required('Phone number is required'),
});
