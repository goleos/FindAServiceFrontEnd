import {observer} from "mobx-react";
import { useStore } from "../../../../stores/RootStore";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import {ErrorMessage} from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import {ButtonContainer, FormContainer} from "../../../../utils/styles/formStyles";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {providerInfoSchema} from "../../../../utils/helpers/formValidationSchemas";
import {PROFILE_IMAGE, ROUTES} from "../../../../utils/helpers/constants";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import {ProfileImage} from "../../../../utils/components/ProfileImage";


const EditForm = () => {
    const { userStore, providerProfileEditStore, adminStore } = useStore();

    // Get current user
    let provider = userStore.getCurrentUser();

    const navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: yupResolver(providerInfoSchema),
        defaultValues: {
            firstName: providerProfileEditStore.getFirstName(),
            lastName: providerProfileEditStore.getLastName(),
            email: providerProfileEditStore.getEmail(),
            address: providerProfileEditStore.getAddress(),
            description: providerProfileEditStore.getDescription(),
            //TODO: Upload profile image
            profileImage: PROFILE_IMAGE
        }
    });

    // Show/Hide Passwords
    const [showPassword1, togglePassword1] = useState(false);
    const [showPassword2, togglePassword2] = useState(false);

    const handleClickShowPassword1 = () => {
        togglePassword1(!showPassword1);
    };

    const handleClickShowPassword2 = () => {
        togglePassword2(!showPassword2);
    };

    const onSubmit = async (data) => {
        if (!!errors) {
            try {
                const res = await axiosConfig().put( "/provider/editProfile", data);
                if (res.data.status) {
                    userStore.requestCurrentUser();
                    adminStore.requestUnapprovedProviders();
                    navigate(ROUTES.provider.home);
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


    // Loading
    if (provider === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <Container>
            <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
                <Alert severity="error">{message}</Alert>
            } />
            <ImageContainer>
                <ProfileImage size="large" image={provider.profileImage}/>
            </ImageContainer>
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
                <ButtonContainer>
                    <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                </ButtonContainer>
            </FormContainer>
        </Container>
    )
}

export default observer(EditForm);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 20px 100px;
`

const ImageContainer = styled.div`
  align-self: center;
`