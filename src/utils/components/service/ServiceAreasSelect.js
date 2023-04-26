/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const ServiceAreasSelect = (props) => {
  const areaOptions = ["Southampton", "London", "Portsmouth", "Winchester"];

  return (
    <FormControl fullWidth>
      <InputLabel required>Areas Covered</InputLabel>
      <Select {...props} label="Areas Covered" name="areas_covered" multiple>
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
