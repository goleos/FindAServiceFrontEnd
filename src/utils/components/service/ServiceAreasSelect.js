/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ServiceAreasSelect = (props) => {
  const [areas, setAreas] = useState([]);

  const handleAreasChange = (event) => {
    setAreas(event.target.value);
  };

  const areaOptions = ["Southampton", "London", "Portsmouth", "Winchester"];

  return (
    <FormControl fullWidth>
      <InputLabel required>Areas Covered</InputLabel>
      <Select {...props} label="Areas Covered" multiple>
        {areaOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceAreasSelect;
