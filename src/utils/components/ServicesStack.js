import { Grid } from "@mui/material";
import Box from "@mui/system/Box";
import ServiceCard from "./ServiceCard";

const ServicesStack = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Grid>
    </Box>
  );
};

export default ServicesStack;
