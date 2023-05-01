import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import { CircularLoading } from "../../../utils/components/CircularLoading";
import { Stack } from "@mui/system";
import Review from "../../../utils/components/review/Review";

const ReviewStack = (props) => {
    const { reviewStore } = useStore();

    let reviews = reviewStore.getReviews(props.serviceID);
    const reviewComponents = [];

    reviews.forEach((review) => {
        reviewComponents.push(<Review key={review.id} review={review} />);
    });

    // Loading
    if (reviews === undefined) {
        return <CircularLoading />;
    }

    return <Stack spacing={1}>{reviewComponents}</Stack>;
};

export default observer(ReviewStack);
