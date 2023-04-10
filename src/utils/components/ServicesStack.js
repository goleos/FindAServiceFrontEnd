/* Based on MUI documentation sections:
https://mui.com/system/react-grid/
*/

import { Grid } from "@mui/material";
import Box from "@mui/system/Box";
import ServiceCard from "./ServiceCard";

const ServicesStack = () => {
  return (
    <Box
      sx={{
        // flexGrow: 1,
        flex: 1,
        flexDirection: "column",
        padding: 1,
        overflow: "scroll",
        scrollbarWidth: "none",
        maxHeight: "80vh",
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>{" "}
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>{" "}
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>{" "}
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>{" "}
        <Grid
          xs={6}
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ServiceCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesStack;
