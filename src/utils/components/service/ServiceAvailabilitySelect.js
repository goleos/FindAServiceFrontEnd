/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ServiceAvailabilitySelect = () => {
  const [availability, setavailability] = useState([]);

  const handleAvailabilityChange = (event) => {
    setavailability(event.target.value);
  };

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
      <Select
        label="Availability"
        multiple
        value={availability}
        onChange={handleAvailabilityChange}
      >
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
