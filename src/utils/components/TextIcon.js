import styled from "@emotion/styled";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {device} from "../helpers/constants";

/**
 * Any text with an icon next to it
 * @param props
 * @constructor
 */
export const TextIcon = (props) => {


    return (
        <Container color={props.color}>
            <IconContainer><FontAwesomeIcon className="fa-fw" icon={props.icon}/></IconContainer>
            <Text>{props.text}</Text>
        </Container>
    );
}

const IconContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
`

const Text = styled.div`
`

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.color};
  width: 150px;

  @media only screen and ${device.tablet} {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`


