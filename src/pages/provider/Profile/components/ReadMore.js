import React, {useState} from "react";
import styled from "@emotion/styled";


/**
 * Component for displaying part of a long text
 * and a Read More button
 * @param props
 * @constructor
 */
const ReadMore = (props) => {

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <Container>
            <Description>
                {isReadMore ? props.text.slice(0, props.length) : props.text}
            </Description>
            {props.text.length >= props.length &&
                <ReadMoreLink onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...more" : " less"}
                </ReadMoreLink>
            }
        </Container>
    )
}

export default ReadMore;

const Container = styled.div`
`

const Description = styled.div`
`

const ReadMoreLink = styled.span`
  color: ${props => props.theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
`