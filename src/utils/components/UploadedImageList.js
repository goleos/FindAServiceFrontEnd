/* Part of documentation used:
https://mui.com/material-ui/react-image-list/
*/

import {ImageList, ImageListItem} from "@mui/material";
import {useStore} from "../../stores/RootStore";
import {observer} from "mobx-react";

/**
 * Gallery of images for preview before upload
 * @returns {JSX.Element}
 * @constructor
 */
const UploadedImageList = () => {

  const {uploadImagesStore} = useStore();

  const imageUrls = uploadImagesStore.getImageUrls()

  if (imageUrls === undefined || imageUrls === null) {
    return <></>
  }

  return (
    <ImageList sx={{ maxHeight: 450 }} cols={3} rowHeight={200}>
      {imageUrls.map((imageUrl) => (
        <ImageListItem key={imageUrl}>
          <img
            style={{height: 200}}
            src={imageUrl}
            alt={imageUrl}
            loading="lazy"/>
        </ImageListItem>
      ))}
    </ImageList>
  )
};

export default observer(UploadedImageList);
