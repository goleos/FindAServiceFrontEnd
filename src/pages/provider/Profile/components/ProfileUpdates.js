import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem, TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {faCheckCircle, faHourglass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import formatDate from "../../../../utils/helpers/formatDate";
import Button from "@mui/material/Button";
import {ButtonContainer, StyledTextField} from "../../../../utils/styles/formStyles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../utils/helpers/constants";
import LoadingButton from "@mui/lab/LoadingButton";

// Form validation schema
const schema = yup.object({
    reason: yup.string()
        .required('Reason is required')
        .trim()
});

const ProfileUpdates = (props) => {

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
            await axiosConfig().post( `/profile_update/${provider.id}`, data);
            navigate(ROUTES.admin.home)
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

    let updateNodes = []

    profileUpdates.forEach((elem, index, array) => {
        const color = elem.status === 'completed' ? 'success' : 'info'

        updateNodes.push(
            <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ py: '12px', px: 2 }} color="textSecondary">
                    {formatDate(elem.createdAt)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color={color}>
                        {elem.status === 'completed' ?
                            <FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/> :
                            <FontAwesomeIcon className="fa-fw" icon={faHourglass}/>
                        }
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    {elem.reason}
                </TimelineContent>
            </TimelineItem>
        )
    })

    return (
        <Container>
            <UpdateHistoryContainer>
                <SectionTitle>Update History</SectionTitle>
                {updateNodes.length >= 1 ?
                    <Timeline>
                        {updateNodes}
                    </Timeline>
                    :
                    <p>No updates were requested</p>
                }
            </UpdateHistoryContainer>
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
                            rows={7}
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

const UpdateHistoryContainer = styled.div`
`

