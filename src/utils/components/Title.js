import React from "react";
import styled from "@emotion/styled";


/**
 * Title component
 * @param props
 */
export const Title = (props) => {

    return (
        <TitleContainer padding={props.padding}>{props.text}</TitleContainer>
    );
}

const TitleContainer = styled.h1`
  color: ${props => props.theme.palette.secondary.dark};
  margin-bottom: 0;
  padding: ${props => props.padding && '20px'};
`


