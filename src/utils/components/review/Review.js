import { observer } from "mobx-react";
import {Rating, Stack} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@emotion/react";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { border } from "../../styles/themeConfig";
import { theme } from "../../styles/themeConfig";
import { Typography } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "../../helpers/formatDate";
import {Line} from "../../styles/pageStyles";

const Review = (props) => {
    const theme = useTheme();

    return (
        <Container>
            <Stack direction="row" spacing={3}>
                <Typography variant="h6">{props.review.title}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    name="rating"
                    precision={0.5}
                    value={props.review.rating}
                    icon={<FontAwesomeIcon icon={faStar}/>}
                    size="small"
                    readOnly
                  />
                </Stack>
            </Stack>
          
          
            <Details>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FontAwesomeIcon className="fa-fw" icon={faUser} color={theme.palette.secondary.main} />
                <div>{props.review.customerFirstName + " " + props.review.customerLastName}</div>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FontAwesomeIcon className="fa-fw" icon={faCalendar} color={theme.palette.secondary.main} />
                <div>{formatDate(props.review.createdAt)}</div>
              </Stack>
            </Details>
           
            <Line />
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
    border-radius: ${border.borderRadius};
    background-color: ${theme.palette.info.light};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.palette.info.main}
`;
