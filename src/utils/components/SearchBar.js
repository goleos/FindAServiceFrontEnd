import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import InputAdornment from "@mui/material/InputAdornment";
import {device} from "../helpers/constants";
import {StyledTextField} from "../styles/formStyles";


/**
 * Search bar used for search
 * @param props
 * @constructor
 */
export const SearchBar = (props) => {

    const {...otherProps} = props;

    return (
        <SearchContainer>
            <StyledTextField
                id="search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconContainer><FontAwesomeIcon icon={faSearch}/></IconContainer>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                placeholder="Search for services"
                fullWidth={true}
                {...otherProps}
            />
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
  width: 40%;

  @media only screen and ${device.tablet} {
    width: 45%;
  }
`

const IconContainer = styled.div`
  color: ${props => props.theme.palette.info.main};
  > .Mui-focused{
    color: black;
  }
`


