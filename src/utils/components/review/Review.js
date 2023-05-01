import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import { CircularLoading } from "../../../utils/components/CircularLoading";
import { Stack } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@emotion/react";
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { border } from "../../styles/themeConfig";
import { theme } from "../../styles/themeConfig";
import { Typography } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
    const theme = useTheme();

    return (
        <Container>
            <Stack direction="row" spacing={3}>
                <Typography variant="h6">{props.review.title}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <FontAwesomeIcon className="fa-fw" icon={faStar} color={theme.palette.secondary.main} />
                    <div>{props.review.rating}/5</div>
                </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                <FontAwesomeIcon className="fa-fw" icon={faUser} color={theme.palette.secondary.main} />
                <Typography>John Doe</Typography>
            </Stack>

            <Typography variant="subtitle1">{props.review.description}</Typography>
        </Container>
    );
};

export default observer(Review);

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-flow: column;
    gap: 10px;
    border-bottom: 4px solid ${theme.palette.primary.light};
    border-radius: ${border.borderRadius};
    background-color: ${theme.palette.info.light};
`;
