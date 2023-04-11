/* Documentation used:
https://mui.com/material-ui/react-select/ */

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SERVICE_CATEGORIES } from "../../helpers/constants";
import { useState } from "react";

const ServiceCategorySelect = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel required>Category</InputLabel>
      <Select label="Category" value={category} onChange={handleCategoryChange}>
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
