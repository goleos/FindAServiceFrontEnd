import { FormControl, Grid, ImageList } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import { Fab } from "@mui/material";
import UploadedImageList from "./UploadedImageList";

const UploadPhotosGrid = () => {
  return (
    <>
      <FormControl>
        <FormLabel>Upload Photos</FormLabel>
        {/* <Fab color="primary" variant="extended" size="large">
        <PhotoCamera sx={{ mr: 1 }} />
        Choose Photos
      </Fab> */}
        <Button
          variant="contained"
          // TODO: Explain why component prop is used
          component="label"
          startIcon={<PhotoCamera />}
        >
          Choose Photos
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </FormControl>
      <UploadedImageList />
    </>
  );
};

export default UploadPhotosGrid;
