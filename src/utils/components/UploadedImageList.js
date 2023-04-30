/* Part of documentation used:
https://mui.com/material-ui/react-image-list/
*/

import {ImageList, ImageListItem} from "@mui/material";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";

const UploadedImageList = () => {

  const {uploadImagesStore} = useStore();

  const imageUrls = uploadImagesStore.getImageUrls()

  if (imageUrls === undefined) {
    return <></>
  }

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {imageUrls.map((imageUrl) => (
        <ImageListItem key={imageUrl}>
          <img
            src={imageUrl}
            alt={imageUrl}
            loading="lazy"/>
        </ImageListItem>
      ))}
    </ImageList>
  )
};

export default observer(UploadedImageList);
