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
import {ROUTES} from "../../../../utils/helpers/constants";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingButton from "@mui/lab/LoadingButton";


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
            description: providerProfileEditStore.getDescription()
        }
    });


    const [isSubmitting, setIsSubmitting] = useState(false);

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
                // Edit Profile Information
                const res = await axiosConfig().put( "/provider/editProfile", data);

                if (!res.data.status) {
                  setIsSubmitting(false);
                  setError('errorMessage', {
                    type: 'manual',
                    message: res.data.message
                  })
                  return
                }

                // Edit Profile Image
                const uploadProfileRes = await providerProfileEditStore.uploadProfileImage();

                if (!uploadProfileRes.data.status) {
                  setIsSubmitting(false);
                  setError('errorMessage', {
                    type: 'manual',
                    message: uploadProfileRes.data.message
                  })
                }

                userStore.requestCurrentUser();
                adminStore.requestUnapprovedProviders();
                navigate(ROUTES.provider.home);
            } catch (err) {
                setError('errorMessage', {
                    type: 'manual',
                    message: err.response.data.message
                });
            }
        }
    }

    // Change profile image
    const uploadImage = (files) => {
      if (files !== null) {
        let url = URL.createObjectURL(files[0]);
        providerProfileEditStore.setProfileImageUrl(url);
        providerProfileEditStore.setProfileImage(files[0]);
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
              <Image image={providerProfileEditStore.getProfileImageUrl()}/>
              <ChangeImage>
                <ButtonContainer>
                  <EditIcon>
                    <label htmlFor="file">
                      <FontAwesomeIcon icon={faPen} />
                    </label>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      {...register('profileImage', {
                        onChange: (Event) => {uploadImage(Event.target.files)}
                      })}
                      hidden
                    />
                  </EditIcon>
                </ButtonContainer>
              </ChangeImage>
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
                  {isSubmitting
                    ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                    : <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                  }
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
  min-width: 100px;
  min-height: 100px;
  position: relative;
  border-radius: 100%;
  align-self: center;
  
  :hover div:nth-of-type(2) {
    background-color: rgba(255,255,255,0.5);
  }
`


const EditIcon = styled.div`
    background-color: ${props => props.theme.palette.primary.light};
    border: 2px solid ${props => props.theme.palette.info.light};
    width: 25px;
    height: 25px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    cursor: pointer;

    :hover {
        svg {
            color: ${props => props.theme.palette.secondary.main};
        }
    }

    svg {
      cursor: pointer;
      color: ${props => props.theme.palette.primary.main}
    }
  
    input[type="file"] {
        display: none;
    }
`

const ChangeImage = styled.div`
  background-color: rgba(255,255,255,0);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: end;
  justify-content: end;
  transition: background-color 0.5s;
  cursor: pointer;
  
  :hover div {
    opacity: 1;
  }
`

const Image = styled.div`
  min-width: 100px;
  min-height: 100px;
  position: relative;
  background-image: url(${props => props.image});
  background-size: cover;
  border-radius: 100%;
`