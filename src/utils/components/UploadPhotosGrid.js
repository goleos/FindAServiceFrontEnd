import { FormControl } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { FormLabel } from "@mui/material";
import UploadedImageList from "./UploadedImageList";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";
import styled from "@emotion/styled";

const UploadPhotosGrid = (props) => {

  const {  uploadImagesStore } = useStore()

  // Change images frontend
  const uploadImage = (files) => {
    console.log(files)
    if (files !== null) {

      const imageUrls = []

      for (const file of files) {
        imageUrls.push(URL.createObjectURL(file));
      }

      uploadImagesStore.setImageUrls(imageUrls);
      uploadImagesStore.setImages(files);
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel>Upload Photos</FormLabel>
        {props.editingExistingService &&
          <div>This will replace any previously uploaded photos</div>
        }
        {/* <Fab color="primary" variant="extended" size="large">
        <PhotoCamera sx={{ mr: 1 }} />
        Choose Photos
      </Fab> */}
        <ButtonContainer>
          <Button
            variant="contained"
            // TODO: Explain why component prop is used
            component="label"
            startIcon={<PhotoCamera />}
          >
            Choose Photos
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(Event) => {uploadImage(Event.target.files)}}
            />
          </Button>
        </ButtonContainer>

      </FormControl>
      <UploadedImageList />
    </>
  );
};

export default observer(UploadPhotosGrid);

const ButtonContainer = styled.div`
  padding: 10px 0 30px 0;
`