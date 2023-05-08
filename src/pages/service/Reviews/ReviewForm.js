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
import {useNavigate, useParams} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useStore} from "../../../stores/RootStore";
import Alert from "@mui/material/Alert";
import {ErrorMessage} from "@hookform/error-message";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

// Form validation schema
const schema = yup.object({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().required('Description is required'),
});

const ServiceRequestForm = (props) => {

    const {serviceRequestsStore} = useStore()

    const params = useParams();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Handling form submission
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm({
        resolver: yupResolver(schema),
    });

    const marks = [{
        value: 1, label: '1',
    }, {
        value: 2, label: '2',
    }, {
        value: 3, label: '3',
    }, {
        value: 4, label: '4',
    }, {
        value: 5, label: '5',
    },];

    // Sent update request
    const onSubmit = async (data) => {
        data.service_id=params.serviceId
        setIsSubmitting(true);
        try {
            await axiosConfig().post(`/review/create?service_id=${params.serviceId}`, data);
            serviceRequestsStore.requestServiceRequests(params.serviceId)
            props.submit()
            navigate(`/service/${params.serviceId}`)
        } catch (err) {
            setIsSubmitting(false);
            setError('errorMessage', {
                type: 'manual', message: err.response.data.message
            });
        }
    }

    return (<Container>
                <SectionTitle>Review</SectionTitle>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <FieldContainer>
                        <ColumnContainer>
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

                        </ColumnContainer>
                        <ColumnContainer>
                            <Typography id="input-slider" gutterBottom>
                                Rating
                            </Typography>
                            <Slider
                                    {...register('rating')}
                                    id="rating"
                                    aria-label="rating"
                                    defaultValue={5}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks={marks}
                                    min={1}
                                    max={5}
                            />
                        </ColumnContainer>
                    </FieldContainer>
                    <ErrorMessage errors={errors} name="errorMessage"
                                  render={({message}) => <Alert severity="error">{message}</Alert>}/>
                    {isSubmitting ? <LoadingButton loading variant="outlined" size="large">Submit</LoadingButton> :
                            <ButtonContainer>
                                <Button type="submit" variant="contained" size="large"
                                        onClick={() => clearErrors()}>Submit</Button>
                            </ButtonContainer>}

                </FormContainer>
            </Container>)
}

export default observer(ServiceRequestForm);

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
    padding-right: 20px;
    display: flex;
    gap: 10px;
    width: 100%;
    flex-direction: column;
`



