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
import ServiceCategorySelect from "../../../services/ServiceCategorySelect";

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
            <TextField
              id="serviceAvailability"
              label="Availability"
              type="text"
              value="Monday, Tuesday"
              fullWidth
              required
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel id="areas-covered">Areas covered</InputLabel>
              {/* Adapted from:  https://github.com/mui/material-ui/blob/v5.11.16/docs/data/material/components/selects/MultipleSelectChip.js*/}
              <Select
                labelId="areas-covered"
                multiple
                value={areas}
                // onChange={handleChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {/* {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
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
