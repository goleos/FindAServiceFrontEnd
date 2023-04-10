/* Code adapted from https://mui.com/material-ui/react-card/#MediaCard.js */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, CardHeader, IconButton, Stack } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProfileCard from "./user/ProfileCard";
import Divider from "@mui/material/Divider";
import { AlignHorizontalCenter, Padding } from "@mui/icons-material";

const ServiceCard = (props) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardActionArea>
        <CardMedia image={props.image} sx={{ height: 140 }} />
        <CardContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <div>
              <Typography variant="h5" color="text.primary">
                {props.title}
              </Typography>
              <ProfileCard />
            </div>
            <div>
              <Typography variant="h5" color="text.primary">
                £{props.price}
              </Typography>
            </div>
          </Stack>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {props.perspective === "provider" && (
            <Button variant="outlined">Manage</Button>
          )}
          {props.perspective === "customer" && (
            <Button variant="contained">Request</Button>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ServiceCard;
