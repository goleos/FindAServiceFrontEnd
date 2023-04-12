import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {ButtonContainer, StyledTextField} from "../../../../utils/styles/formStyles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../utils/helpers/constants";
import LoadingButton from "@mui/lab/LoadingButton";
import {useStore} from "../../../../stores/RootStore";
import UpdateHistory from "../../UpdateHistory";

// Form validation schema
const schema = yup.object({
    reason: yup.string()
        .required('Reason is required')
        .trim()
});

const ProfileUpdates = (props) => {

    const { adminStore } = useStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Handling form submission
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: yupResolver(schema),
    });

    const profileUpdates = props.store.getProfileUpdates();
    const provider = props.store.getProvider();

    // Sent update request
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axiosConfig().post( `/profile-update/${provider.id}`, data);
            adminStore.requestUnapprovedProviders();
            navigate(ROUTES.admin.newProviders)
        } catch (err) {
            setIsSubmitting(false);
            setError('errorMessage', {
                type: 'manual',
                message: err.response.data.message
            });
        }
    }


    // Loading
    if (profileUpdates === undefined) {
        return (
            <CircularLoading />
        )
    }

    // If provider was deleted
    if (provider === null) {
        return (
            <></>
        )
    }

    return (
        <Container>
            {!provider.isApproved &&
                <>
                    <SectionTitle>Request Update</SectionTitle>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
                        <StyledTextField
                            {...register('reason')}
                            id="description"
                            label="Reason"
                            variant="outlined"
                            multiline
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                        {isSubmitting ?
                            <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                            :
                            <ButtonContainer>
                                <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
                            </ButtonContainer>
                        }

                    </FormContainer>
                </>
            }
            <UpdateHistory updates={profileUpdates}/>
        </Container>
    )
}

export default observer(ProfileUpdates);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px 5px 20px;
`

const SectionTitle = styled.h3`
`
const FormContainer = styled.form`
    padding-bottom: 20px;
`


