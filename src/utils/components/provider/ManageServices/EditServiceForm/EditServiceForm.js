import { Grid, Stack, Typography } from "@mui/material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import {
  FormContainer,
  Title,
  TitleContainer,
} from "../../../../styles/formStyles";
import UploadPhotosGrid from "../../../UploadPhotosGrid";
import ServiceCategorySelect from "../../../service/ServiceCategorySelect";
import ServiceAvailabilitySelect from "../../../service/ServiceAvailabilitySelect";
import ServiceAreasSelect from "../../../service/ServiceAreasSelect";
import { useFormik } from "formik";

const EditServiceForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: "etet",
      category: "Cleaning",
      description: "s",
      price: "120",
      availability: ["Monday"],
      areasCovered: ["Southampton"],
    },
  });

  return (
    <>
      <Stack>
        <TitleContainer>
          <Title>Add a new service</Title>
        </TitleContainer>
        <Typography variant="subtitle" color={"text.secondary"}>
          All new services have to be approved by admin before they become
          visible to customers
        </Typography>
      </Stack>
      <FormContainer>
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
              id="servicePrice"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ServiceAvailabilitySelect
              id="availability"
              value={formik.values.availability}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ServiceAreasSelect
              id="areasCovered"
              value={formik.values.areasCovered}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadPhotosGrid />
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

export default EditServiceForm;
