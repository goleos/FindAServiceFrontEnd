/* Code adapted from https://mui.com/material-ui/react-card/#MediaCard.js */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, Stack } from "@mui/material";
import ProfileCard from "./user/ProfileCard";
import Divider from "@mui/material/Divider";

const ServiceCard = (props) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardActionArea>
        <CardMedia image={props.image} sx={{ height: 140 }} />
        <CardContent>
          <Typography variant="h5" color="text.primary">
            {props.title}
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"start"}
            justifyContent={"space-between"}
          >
            <Stack spacing={1}>
              <ProfileCard />
            </Stack>
            <Stack>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontSize: 20 }}
              >
                £{props.price}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {props.description}
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
