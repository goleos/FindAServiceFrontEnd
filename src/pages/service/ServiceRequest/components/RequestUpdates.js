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
import UpdateHistory from "../../../../utils/components/UpdateHistory";

// Form validation schema
const schema = yup.object({
  reason: yup.string()
    .required('Reason is required')
    .trim()
});

/**
 * Form for requesting an update to the service request
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RequestUpdates = (props) => {

  const {serviceRequestsStore} = useStore()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handling form submission
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const requestUpdates = props.store.getRequestUpdates();
  const serviceRequest = props.store.getServiceRequest();

  // Sent update request
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosConfig().post( `/serviceRequest/update/${serviceRequest.id}`, data);
      await axiosConfig().put( `/serviceRequest/${serviceRequest.id}/status`, {status: "request_further_details"});
      props.store.requestRequestUpdates();
      serviceRequestsStore.requestServiceRequests();
      navigate(ROUTES.service.myRequests)
    } catch (err) {
      setIsSubmitting(false);
      setError('errorMessage', {
        type: 'manual',
        message: err.response.data.message
      });
    }
  }

  // Loading
  if (requestUpdates === undefined) {
    return (
      <CircularLoading />
    )
  }

  return (
    <Container>
      {serviceRequest.status === 'pending' &&
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
      <UpdateHistory updates={requestUpdates}/>
    </Container>
  )
}

export default observer(RequestUpdates);

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


