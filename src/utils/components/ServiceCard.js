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

const ServiceCard = () => {
  return (
    <Card sx={{}}>
      <CardActionArea>
        <CardMedia
          image="https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg"
          title="Hi"
          sx={{ height: 140 }}
        />
        <CardContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <div>
              <Typography variant="h5" color="text.primary">
                Cleaning of your entire apartment
              </Typography>
              <ProfileCard />
            </div>
            <div>
              <Typography variant="h5" color="text.primary">
                £120.99
              </Typography>
            </div>
          </Stack>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            A deep clean of all rooms in your apartment
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined">Edit</Button>
          <Button variant="contained">Request</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ServiceCard;
