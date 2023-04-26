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

const EditServiceForm = (props) => {
    const { serviceStore } = useStore();

    var initialValues = {
        title: "",
        category: "",
        description: "",
        price: "",
        availability: [],
        areas_covered: [],
    };

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
        onSubmit: (values) => {
            console.log(values);
            serviceStore.createService(values);
            props.onFinish();
            props.onSuccess();
        },
    });

    const formTitleString = props.editingExistingService ? "Manage a service" : "Add a new service";

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
                        <UploadPhotosGrid />
                    </Grid>
                </Grid>
                <Stack alignItems={"flex-end"} direction={"row-reverse"} spacing={1}>
                    <Button variant="contained" type="submit">
                        Create
                    </Button>
                    <Button onClick={props.onFinish}>Cancel</Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default EditServiceForm;
