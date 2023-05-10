/* Based on MUI documentation sections:
https://mui.com/system/react-grid/
*/

import { Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { observer } from "mobx-react";
import {NavLink} from "react-router-dom";

/**
 * List of services
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServicesStack = (props) => {


  const serviceNodes = []

  props.services.forEach((service) => {

    serviceNodes.push(
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
            service={service}
            perspective="provider"
          />
        </NavLink>
      </Grid>
    )
  })


  return (
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      >
          {/* TODO:Fix rendering using native Grid rendering */}

          {serviceNodes}
      </Grid>
  );
};

export default observer(ServicesStack);
