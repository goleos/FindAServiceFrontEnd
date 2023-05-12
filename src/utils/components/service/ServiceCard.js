/* Code adapted from https://mui.com/material-ui/react-card/#MediaCard.js */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, Stack } from "@mui/material";
import ProfileCard from "../user/ProfileCard";
import Divider from "@mui/material/Divider";
import {SERVICE_IMAGE} from "../../helpers/constants";
import styled from "@emotion/styled";
import ReadMore from "../../../pages/provider/Profile/components/ReadMore";


const ServiceCard = (props) => {

  const image = (props.service.serviceImages && props.service.serviceImages.length > 0) ? props.service.serviceImages[0] : SERVICE_IMAGE;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardActionArea>
        <CardMedia image={image} sx={{ height: 140 }} />
        <CardContent>
          <Typography variant="h5" color="text.primary">
            {props.service.title}
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"start"}
            justifyContent={"space-between"}
          >
            <Stack spacing={1}>
              <ProfileCard
                profileImage={props.service.providerProfileImage}
                firstName={props.service.providerFirstName}
                lastName={props.service.providerLastName}
                avgRating={props.service.avgRating}
              />
            </Stack>
            <Stack>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontSize: 20 }}
              >
                £{props.service.price}
              </Typography>
            </Stack>
          </Stack>
          <StyledDivider />
          <Typography variant="body2" color="text.secondary">
            <ReadMore text={props.service.description} length={63}/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {props.perspective === "provider" && (
          <Button variant="outlined">Manage</Button>
        )}
        {props.perspective === "customer" && (
          <Button variant="contained">Request</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ServiceCard;

const StyledDivider = styled(Divider)`
  margin: 5px 0;
`