/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SERVICE_CATEGORIES } from "../../helpers/constants";
import { useState } from "react";

const ServiceCategorySelect = (props) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

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
