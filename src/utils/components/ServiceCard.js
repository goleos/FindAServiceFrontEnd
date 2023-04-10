/* Code adapted from https://mui.com/material-ui/react-card/#MediaCard.js */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardHeader, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ServiceCard = () => {
  return (
    <Card sx={{}}>
      <CardHeader
        title="Full apartment clean"
        subheader="Cleaning"
        action={
          <IconButton>
            <ModeEditIcon />
          </IconButton>
        }
      />

      <CardMedia
        image="https://4.img-dpreview.com/files/p/TS1200x900~sample_galleries/8406609137/8530102685.jpg"
        title="Hi"
        sx={{ height: 140 }}
      />
      <CardContent>
        {/* <Typography variant="h4" color="text.primary">
          Full apartment clean
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          A deep clean of all rooms in your apartment
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Request</Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
