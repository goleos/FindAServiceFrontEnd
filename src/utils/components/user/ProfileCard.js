import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ProfileCard = () => {
  return (
    <Stack direction="row" alignItems={"center"} spacing={1}>
      <Avatar
        sx={{ height: 53, width: 53 }}
        src="http://www.rottmair.de/profiles/Sebastian_Rottmair.jpg"
      />
      <Stack>
        <Typography variant="h6" color="text.primary">
          John Doe
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ⭐️ 4.97
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileCard;
