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
import {useParams} from "react-router-dom";
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
    .required('Booking Time is required'),
  customerAddress: yup.string()
    .trim()
});

const UpdateRequestForm = (props) => {

  const {serviceRequestEditStore } = useStore()

  const params = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handling form submission
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: serviceRequestEditStore.getDescription(),
      bookingTime: serviceRequestEditStore.getBookingTime(),
      customerAddress: serviceRequestEditStore.getCustomerAddress(),
    }
  });

  // Sent update request
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosConfig().put( `/serviceRequest/${params.requestId}`, data);
      props.submit()
      props.store.requestServiceRequest()
    } catch (err) {
      console.log(err)
      setIsSubmitting(false);
      setError('errorMessage', {
        type: 'manual',
        message: err.response.data.message
      });
    }
  }

  return (
    <Container>
      <SectionTitle>Update Request</SectionTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <ColumnContainer>
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
          </ColumnContainer>
          <ColumnContainer>
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
          </ColumnContainer>
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

export default observer(UpdateRequestForm);

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
  display: flex;
  gap: 10px;
  flex-direction: column;
`

const FieldContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`

const ColumnContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: column;
`


