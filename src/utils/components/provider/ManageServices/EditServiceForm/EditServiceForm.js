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
import ServiceAvailabilitySelect from "../../../service/serviceAvailabilitySelect";
import ServiceAreasSelect from "../../../service/ServiceAreasSelect";

const EditServiceForm = () => {
  const areas = ["Southampton", "London", "Portsmouth", "Winchester"];

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
              id="serviceTitle"
              label="Title"
              type="text"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ServiceCategorySelect />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="serviceDescription"
              label="Description"
              type="text"
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
            <ServiceAvailabilitySelect />
          </Grid>
          <Grid item xs={12}>
            <ServiceAreasSelect />
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
