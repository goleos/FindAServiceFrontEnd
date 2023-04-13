/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SERVICE_CATEGORIES } from "../../helpers/constants";

const ServiceCategorySelect = (props) => {
  return (
    <FormControl fullWidth>
      <InputLabel required>Category</InputLabel>
      <Select {...props} name="category" label="category">
        {SERVICE_CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceCategorySelect;
