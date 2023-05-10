import {observer} from "mobx-react";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Stack} from "@mui/material";
import Review from "../../../utils/components/review/Review";
import styled from "@emotion/styled";

/**
 * Display list of reviews
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ReviewStack = (props) => {
  const {reviewStore} = useStore();
  let reviews = reviewStore.getReviews(props.serviceID);

  // Loading
  if (reviews === undefined) {
    return <CircularLoading/>;
  }

  const reviewComponents = [];
  reviews.forEach((review) => {
    reviewComponents.push(<Review serviceID={props.serviceID} review={review}/>);
  });

  if (reviewComponents.length === 0) {
    return <Text>There are currently no reviews for this service.</Text>;
  } else {
    return (<Stack spacing={1}>{reviewComponents}</Stack>);
  }
};

export default observer(ReviewStack);

const Text = styled.p`
  padding-left: 10px;
`