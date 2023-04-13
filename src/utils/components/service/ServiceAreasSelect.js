/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ServiceAreasSelect = () => {
  const [areas, setAreas] = useState([]);

  const handleAreasChange = (event) => {
    setAreas(event.target.value);
  };

  const areaOptions = ["Southampton", "London", "Portsmouth", "Winchester"];

  return (
    <FormControl fullWidth>
      <InputLabel required>Areas Covered</InputLabel>
      <Select
        label="Areas Covered"
        multiple
        value={areas}
        onChange={handleAreasChange}
      >
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
