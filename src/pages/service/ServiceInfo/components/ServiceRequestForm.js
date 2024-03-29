import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {ButtonContainer, StyledTextField} from "../../../../utils/styles/formStyles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useNavigate, useParams} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useStore} from "../../../../stores/RootStore";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";

// Form validation schema
const schema = yup.object({
  description: yup.string()
    .required('Description is required')
    .trim(),
  bookingTime: yup.string()
    .required('Booking Time is required')
    .trim(),
  customerAddress: yup.string()
    .trim()
});

/**
 * Form for making a service request
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServiceRequestForm = (props) => {

  const { serviceRequestsStore } = useStore()

  const params = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handling form submission
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  // Sent update request
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosConfig().post( `/serviceRequest/${params.serviceId}`, data);
      serviceRequestsStore.requestServiceRequests(params.serviceId)
      props.submit()
      navigate(`/service/${params.serviceId}`)
    } catch (err) {
      setIsSubmitting(false);
      setError('errorMessage', {
        type: 'manual',
        message: err.response.data.message
      });
    }
  }

  return (
    <Container>
      <SectionTitle>Request Service</SectionTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <StyledTextField
            {...register('bookingTime')}
            id="bookingTime"
            variant="outlined"
            label="Booking Time"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
          <StyledTextField
            {...register('description')}
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
          <StyledTextField
            {...register('customerAddress')}
            id="customerAddress"
            label="Address"
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        </FieldContainer>
        <ErrorMessage errors={errors} name="errorMessage" render={({ message }) =>
          <Alert severity="error">{message}</Alert>
        } />
        {isSubmitting ?
          <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
          :
          <ButtonContainer>
            <Button type="submit" variant="contained" size="large" onClick={() => clearErrors()}>Submit</Button>
          </ButtonContainer>
        }

      </FormContainer>
    </Container>
  )
}

export default observer(ServiceRequestForm);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px 5px 20px;
  align-items: center;
  width: 600px;
`

const SectionTitle = styled.h3`
`
const FormContainer = styled.form`
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FieldContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-direction: column;
  width: 100%;
`



