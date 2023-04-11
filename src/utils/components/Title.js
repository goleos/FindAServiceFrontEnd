import React from "react";
import styled from "@emotion/styled";


/**
 * Title component that adapts to theme change
 * @param props
 */
export const Title = (props) => {

    return (
        <TitleContainer>{props.text}</TitleContainer>
    );
}

const TitleContainer = styled.h1`
  color: ${props => props.theme.palette.secondary.dark}
`


