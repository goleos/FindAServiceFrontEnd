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
import LoginStore from "../../../stores/LoginStore";
import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {
    ButtonContainer, FormContainer,
    LinkContainer, LinkSpan,
    Page,
    StyledBox,
    StyledContainer,
    Subtitle,
    Title,
    TitleContainer
} from "../../../utils/styles/formStyles";

// Form validation schema
const registerSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Incorrect email format')
        .trim(),
    password: yup.string()
        .required('Password is required')
});

const ProviderRegisterPage = () => {

    const { providerStore } = useStore();

    // For rerouting to Login Page
    let navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        if (!!errors) {
            setIsSubmitting(true);
            try {
                const res = await axiosConfig().post("/provider/login", data);
                if (res.data.status) {
                    LoginStore.login(res.data.token);
                    providerStore.requestCurrentProvider();
                    navigate('/home?fromLogin');
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
                    message: "Error"
                });
            }
        }
    }

    // Show/Hide Passwords
    const [showPassword1, togglePassword1] = useState(false);

    const handleClickShowPassword1 = () => {
        togglePassword1(!showPassword1);
    };

    // Is the user coming after registration?
    let url = new URL(window.location.href);
    let fromRegister = url.searchParams.get('fromRegister');
    console.log(fromRegister);

    return (
        <Page>
            <StyledContainer maxWidth="sm">
                <StyledBox>
                    <TitleContainer>
                        <Title>Provider Login</Title>
                        <Subtitle>Enter your credentials below</Subtitle>
                    </TitleContainer>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
                        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                            <Alert severity="error">{message}</Alert>
                        } />
                        <LinkContainer>Don't have an account? <NavLink to={"/provider/register"}><LinkSpan>Register for free </LinkSpan></NavLink></LinkContainer>
                        <ButtonContainer>
                            <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                        </ButtonContainer>
                    </FormContainer>
                </StyledBox>
            </StyledContainer>
        </Page>
    )
}

export default observer(ProviderRegisterPage);


