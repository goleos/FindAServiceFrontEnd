import React, { useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import Alert from "@mui/material/Alert";
import {
    ButtonContainer, FormContainer,
    LinkContainer, LinkSpan,
    FormPage,
    StyledBox,
    StyledContainer,
    Subtitle,
    Title,
    TitleContainer
} from "../../../utils/styles/formStyles";

// Form validation schema
const schema = yup.object({
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

const ProviderRegisterPage = () => {

    // For rerouting to Login Page
    let navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (!!errors) {
            try {
                const res = await axiosConfig().post( "/provider/register", data);
                if (res.data.status) {
                    navigate('/provider/login?fromRegister');
                } else {
                    setError('errorMessage', {
                        type: 'manual',
                        message: res.data.message
                    })
                }
            } catch (err) {
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    // Show/Hide Passwords
    const [showPassword1, togglePassword1] = useState(false);
    const [showPassword2, togglePassword2] = useState(false);

    const handleClickShowPassword1 = () => {
        togglePassword1(!showPassword1);
    };

    const handleClickShowPassword2 = () => {
        togglePassword2(!showPassword2);
    };

    return (
        <FormPage>
            <StyledContainer maxWidth="sm">
                <StyledBox>
                    <TitleContainer>
                        <Title>Provider Register</Title>
                        <Subtitle>Create a new provider account</Subtitle>
                    </TitleContainer>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('firstName')}
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            error={!!errors.firstName}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                        />
                        <TextField
                            {...register('lastName')}
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            error={!!errors.lastName}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                        />
                        <TextField
                            {...register('email')}
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                {...register('password')}
                                id="password"
                                type={showPassword1 ? 'text' : 'password'}
                                error={!!errors.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            edge="end"
                                        >
                                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {!!errors.password && (
                                <FormHelperText error id="password-error">
                                    {errors.password.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                {...register('confirmPassword')}
                                id="confirmPassword"
                                type={showPassword2 ? 'text' : 'password'}
                                error={!!errors.confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            edge="end"
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                            {!!errors.confirmPassword && (
                                <FormHelperText error id="confirmPassword-error">
                                    {errors.confirmPassword.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <TextField
                            {...register('address')}
                            id="address"
                            label="Address"
                            variant="outlined"
                            error={!!errors.address}
                            helperText={errors.address ? errors.address.message : ''}
                        />
                        <TextField
                            {...register('description')}
                            id="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={7}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <LinkContainer>
                            Already have an account?
                            <NavLink to={"/provider/login"}>
                                <LinkSpan> Log in </LinkSpan>
                            </NavLink>
                        </LinkContainer>
                        <LinkContainer>
                            Are you looking for a service?
                            <NavLink to={"/customer/register"}>
                                <LinkSpan> Make a customer account</LinkSpan>
                            </NavLink>
                        </LinkContainer>
                        <ButtonContainer>
                            <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                        </ButtonContainer>
                    </FormContainer>
                </StyledBox>
            </StyledContainer>
        </FormPage>
    )
}

export default ProviderRegisterPage;