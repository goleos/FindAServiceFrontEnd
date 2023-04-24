/* Based on MUI documentation sections:
https://mui.com/system/react-grid/
*/

import { Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { observer } from "mobx-react";
import {NavLink} from "react-router-dom";

const ServicesStack = (props) => {
  return (
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      >
          {/* TODO:Fix rendering using native Grid rendering */}

          {props.services.map((service) => (
              <Grid
                  item
                  key={service.id}
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
                  <NavLink to={`/service/${service.id}`}>
                      <ServiceCard
                          id={service.id}
                          image="https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg"
                          title={service.title}
                          price={service.price}
                          description={service.description}
                          perspective="provider"
                      />
                  </NavLink>
              </Grid>
          ))}
      </Grid>
  );
};

export default observer(ServicesStack);
