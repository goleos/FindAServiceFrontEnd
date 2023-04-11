import React, { useState } from "react";
import {NavLink } from "react-router-dom";
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
import LoadingButton from "@mui/lab/LoadingButton";

// Form validation schema
const registerSchema = yup.object({
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
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const CustomerRegisterPage = () => {

    // For rerouting to Login Page
    //let navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const [registrationStatus, setRegistrationStatus] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
                const res = await axiosConfig().post( "/customer/register", data);
                if (res.data.status) {
                    setRegistrationStatus(true)
                    setIsSubmitting(false)
                    // navigate('/customer/login?fromRegister');
                } else {
                    setIsSubmitting(false);
                    setError('errorMessage', {
                        type: 'manual',
                        message: res.data.message
                    })
                }
            } catch (err) {
                setIsSubmitting(false);
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
                        <Title>Register</Title>
                        <Subtitle>Create a new account</Subtitle>
                    </TitleContainer>
                    {registrationStatus && <Alert severity="success">An email was sent to your account please verify</Alert> }
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
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <LinkContainer>
                            Already have an account?
                            <NavLink to={"/customer/login"}>
                                <LinkSpan> Log in </LinkSpan>
                            </NavLink>
                        </LinkContainer>
                        <LinkContainer>
                            Are you a service provider?
                            <NavLink to={"/provider/register"}>
                                <LinkSpan> Make a provider account </LinkSpan>
                            </NavLink>
                        </LinkContainer>
                        <ButtonContainer>
                            {isSubmitting
                                ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                                : <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                            }
                        </ButtonContainer>
                    </FormContainer>
                </StyledBox>
            </StyledContainer>
        </FormPage>
    )
}

export default CustomerRegisterPage;