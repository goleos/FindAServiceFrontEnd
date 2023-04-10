/* Based on MUI documentation sections:
https://mui.com/system/react-grid/
*/

import { Grid } from "@mui/material";
import Box from "@mui/system/Box";
import ServiceCard from "./ServiceCard";

const ServicesStack = () => {
  const sampleData = [
    {
      id: 1,
      image:
        "https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg",
      title: "Cleaning of your entire apartment",
      price: "120.99",
      description: "A deep clean of all rooms in your apartment",
      perspective: "provider",
    },
    {
      id: 2,
      image:
        "https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg",
      title: "Cleaning of your entire apartment",
      price: "120.99",
      description: "A deep clean of all rooms in your apartment",
      perspective: "provider",
    },
    {
      id: 3,
      image:
        "https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg",
      title: "Cleaning of your entire apartment",
      price: "120.99",
      description: "A deep clean of all rooms in your apartment",
      perspective: "provider",
    },
  ];

  const sampleServiceCards = sampleData.map((serviceCard) => (
    <Grid
      xs={12}
      sm={12}
      md={6}
      sx={{
        paddingLeft: 2,
        paddingRight: 1,
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      <ServiceCard
        key={serviceCard.id}
        image={serviceCard.image}
        title={serviceCard.title}
        price={serviceCard.price}
        description={serviceCard.description}
        perspective={serviceCard.perspective}
      />
    </Grid>
  ));

  return (
    <Box
      sx={{
        // flexGrow: 1,
        flex: 1,
        flexDirection: "column",
        padding: 1,
        overflow: "scroll",
        scrollbarWidth: "none",
        maxHeight: "90vh",
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      >
        {/* TODO: Fix rendering using native Grid rendering */}
        {sampleServiceCards}
      </Grid>
    </Box>
  );
};

export default ServicesStack;
