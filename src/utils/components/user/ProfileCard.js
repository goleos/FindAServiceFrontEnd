import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

/**
 * Image, first name and last name of a user
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileCard = (props) => {

  return (
    <Stack direction="row" alignItems={"center"} spacing={1}>
      <Avatar
        sx={{ height: 53, width: 53 }}
        src={props.profileImage}
      />
      <Stack>
        <Typography variant="h6" color="text.primary">
          {props.firstName} {props.lastName}
        </Typography>
        {props.avgRating &&
          <Typography variant="subtitle1" color="text.secondary">
            <FontAwesomeIcon icon={faStar} color="#faaf00" /> {props.avgRating}
          </Typography>
        }
      </Stack>
    </Stack>
  );
};

export default ProfileCard;
