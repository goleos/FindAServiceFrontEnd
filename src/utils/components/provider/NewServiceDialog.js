import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  ToggleButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { FormContainer } from "../../../utils/styles/formStyles";
import { PhotoCamera } from "@mui/icons-material";

/* Documentation pages used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/
const NewServiceDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const areas = ["Southampton", "London", "Portsmouth", "Winchester"];

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        startIcon={<AddIcon />}
      >
        Add New Service
      </Button>
      <Dialog open={dialogOpen}>
        <DialogTitle>Add a new service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All new services have to be approved by admin first before they
            become visible to customers.
          </DialogContentText>
          <FormContainer>
            <TextField
              id="serviceTitle"
              label="Title"
              type="text"
              fullWidth
              required
            />
            <TextField
              id="serviceDescription"
              label="Description"
              type="text"
              fullWidth
              required
              multiline
            />
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
            <FormControl>
              {/* <FormLabel>Availability</FormLabel> */}
              <TextField
                id="serviceAvailability"
                label="Availability"
                type="text"
                value="Monday, Tuesday"
                fullWidth
                required
                multiline
              />
            </FormControl>
            <FormControl>
              <FormLabel>Upload Photos</FormLabel>
              {/* <IconButton>
                <input accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton> */}
              <Button
                variant="contained"
                // TODO: Explain why component prop is used
                component="label"
                startIcon={<PhotoCamera />}
              >
                Choose Photos
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </FormControl>
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
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained">Submit for approval</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewServiceDialog;
