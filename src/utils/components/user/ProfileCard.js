import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const ProfileCard = () => {
  return (
    <Stack direction="row" alignItems={"center"} spacing={2} paddingTop={1}>
      <Avatar
        sx={{ bgcolor: "blue", height: 45, width: 45 }}
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
