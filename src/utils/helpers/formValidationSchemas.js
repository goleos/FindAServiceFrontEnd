// Form validation schema
import * as yup from "yup";

export const providerInfoSchema = yup.object({
    firstName: yup.string()
        .required('First Name is required')
        .trim(),
    lastName: yup.string()
        .required('Last Name is required')
        .trim(),
    email: yup.string()
        .required('Email is required')
        .email('Incorrect email format')
        .trim(),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    address: yup.string()
        .required('Address is required')
        .trim(),
    description: yup.string()
        .required('Description is required')
        .trim(),
});