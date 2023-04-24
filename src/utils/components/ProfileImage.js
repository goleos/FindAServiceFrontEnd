import styled from "@emotion/styled";
import React from "react";
import {device} from "../helpers/constants";

/**
 * User profile image
 * @param props
 * @constructor
 */
export const ProfileImage = (props) => {

    const {image, size, ...otherProps} = props

    return (
        <Container image={props.image} size={props.size} {...otherProps}/>
    );
}

const Container = styled.div`
  min-width: ${props => props.size === 'small' ? '55px': props.size === 'large' ? '120px' : '30px' };
  min-height: ${props => props.size === 'small' ? '55px': props.size === 'large' ? '120px' : '30px' };
  max-width: 120px;
  max-height: 120px;
  border-radius: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  cursor: pointer;

  @media only screen and ${device.tablet} {
    max-width: 80px;
    max-height: 80px;
  }
`
