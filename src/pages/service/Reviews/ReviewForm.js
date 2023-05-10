import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../../utils/styles/themeConfig";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {ButtonContainer, StyledTextField} from "../../../utils/styles/formStyles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import {useParams} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useStore} from "../../../stores/RootStore";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Rating} from "@mui/material";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";


// Form validation schema
const schema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
});

/**
 * Form for adding a new review
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ReviewForm = (props) => {
  const {reviewStore} = useStore()

  const params = useParams();

  const [rating, setRating] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handling form submission
  const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm({
    resolver: yupResolver(schema),
  });

  // Sent update request
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const newReview = {
      title: data.title,
      rating: rating,
      description: data.description
    }

    try {
      await axiosConfig().post(`/review/create?service_id=${params.serviceId}`, newReview);
      reviewStore.requestReviews(params.serviceId)
      props.submit()
    } catch (err) {
      setIsSubmitting(false);
      setError('errorMessage', {
        type: 'manual', message: err.response.data.message
      });
    }
  }

  return (
    <Container>
      <SectionTitle>Review</SectionTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <Rating
            name="rating"
            precision={1}
            onChange={(event, newRating) => {
              setRating(newRating !== null ? newRating : 0);
            }}
            emptyIcon={<FontAwesomeIcon icon={faEmptyStar} />}
            defaultValue={0}
            icon={<FontAwesomeIcon icon={faStar}/>}
            size="large"
          />
          <StyledTextField
            {...register('title')}
            id="title"
            label="Title"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
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
        </FieldContainer>
        <ErrorMessage errors={errors} name="errorMessage"
                      render={({message}) => <Alert severity="error">{message}</Alert>}/>
        {isSubmitting ? <LoadingButton loading variant="outlined" size="large">Submit</LoadingButton> :
            <ButtonContainer>
              <Button type="submit" variant="contained" size="large"
                      onClick={() => clearErrors()}>Submit</Button>
            </ButtonContainer>}

      </FormContainer>
    </Container>
  )
}

export default observer(ReviewForm);

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
  width: 100%;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`



