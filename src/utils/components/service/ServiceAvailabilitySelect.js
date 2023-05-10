/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

/**
 * Drop-down for selecting service availability
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServiceAvailabilitySelect = (props) => {
  const availabilityOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <FormControl fullWidth>
      <InputLabel required>Availability</InputLabel>
      <Select {...props} label="Availability" name="availability" multiple>
        {availabilityOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceAvailabilitySelect;
