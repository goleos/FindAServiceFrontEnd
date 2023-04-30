import { Grid, Stack, Typography } from "@mui/material";
import { InputAdornment, TextField } from "@mui/material";
import { Title, TitleContainer } from "../../../../styles/formStyles";
import UploadPhotosGrid from "../../../UploadPhotosGrid";
import ServiceCategorySelect from "../../../service/ServiceCategorySelect";
import ServiceAvailabilitySelect from "../../../service/ServiceAvailabilitySelect";
import ServiceAreasSelect from "../../../service/ServiceAreasSelect";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useStore } from "../../../../../stores/RootStore";
import axiosConfig from "../../../../helpers/axiosConfig";

const EditServiceForm = (props) => {
    const { serviceStore, uploadImagesStore } = useStore();

    let initialValues = {
        title: "",
        category: "",
        description: "",
        price: "",
        availability: [],
        areas_covered: [],
    };

    // if we're editing a service, populate the form with relevant fields
    if (props.editingExistingService) {
        console.log(props.editService);
        initialValues = {
            title: props.editService.title,
            category: props.editService.category,
            description: props.editService.description,
            price: props.editService.price,
            availability: props.editService.availability,
            areas_covered: props.editService.areasCovered,
        };
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            console.log(values);
            // update service if we're editing or create a new one
            if (props.editingExistingService) {
              serviceStore.updateService({ ...values, serviceID: props.editService.id })
              await uploadImagesStore.uploadImages(props.editService.id)
            } else {
              const res = await axiosConfig().post("/service/create", values)
              await uploadImagesStore.uploadImages(Number(res.data))
            }
            props.onFinish();
            props.onSuccess();
        },
    });

    const handleDeleteService = async () => {
        await serviceStore.deleteService(props.editService.id);
        props.onFinish();
        // update page to show the new changes
        window.location.reload(false);
    };

    const formTitleString = props.editingExistingService ? "Manage a service" : "Add a new service";
    const submitButtonString = props.editingExistingService ? "Update" : "Create";

    return (
        <Stack spacing={2}>
            <Stack>
                <TitleContainer>
                    <Title>{formTitleString}</Title>
                </TitleContainer>
                <Typography variant="subtitle" color={"text.secondary"}>
                    Any services you add or modify must not break the website's terms of service.
                </Typography>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction={"row"} spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ServiceCategorySelect
                            id="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            type="text"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            fullWidth
                            required
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="price"
                            label="Price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">£</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ServiceAvailabilitySelect
                            id="availability"
                            value={formik.values.availability}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ServiceAreasSelect
                            id="areas_covered"
                            value={formik.values.areas_covered}
                            onChange={formik.handleChange}
                            multiple
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UploadPhotosGrid editingExistingService />
                    </Grid>
                </Grid>
                <Stack alignItems={"flex-start"} justifyContent={"space-between"} direction={"row-reverse"}>
                    <Stack alignItems={"flex-end"} direction={"row-reverse"} spacing={1}>
                        <Button variant="contained" type="submit">
                            {submitButtonString}
                        </Button>
                        <Button onClick={props.onFinish}>Cancel</Button>
                    </Stack>

                    {props.editingExistingService && (
                        <Button color="error" variant="contained" onClick={handleDeleteService}>
                            Delete Service
                        </Button>
                    )}
                </Stack>
            </form>
        </Stack>
    );
};

export default EditServiceForm;
