import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import { CircularLoading } from "../../../utils/components/CircularLoading";
import { Stack } from "@mui/system";
import Review from "../../../utils/components/review/Review";
import { Typography } from "@mui/material";

const ReviewStack = (props) => {
    const { reviewStore } = useStore();

    const reviews = reviewStore.getReviews(props.serviceID);
    // Loading
    if (reviews === undefined) {
        return <CircularLoading />;
    }
    const reviewComponents = [];

    reviews.forEach((review) => {
        reviewComponents.push(<Review key={review.id} review={review} />);
    });

    if (reviewComponents.length === 0) {
        return <Typography>There are currently no reviews for this service.</Typography>;
    } else {
        return <Stack spacing={1}>{reviewComponents}</Stack>;
    }
};

export default observer(ReviewStack);
