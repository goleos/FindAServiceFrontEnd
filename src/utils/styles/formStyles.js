import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {border} from "./themeConfig";

export const FormPage = styled.div`
  background-color: ${props => props.theme.palette.primary.light};
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  width: 100vw;
`

export const TitleContainer = styled.div`
`

export const Title = styled.h1`
    margin: 5px 0;
`

export const Subtitle = styled.div`
  color: ${props => props.theme.palette.info.main};
  font-size: 0.8rem;
  font-weight: normal;
  margin: 5px 0;
`

export const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 20px 0;
`

export const StyledContainer = styled(Container)(() => ({
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
}));

export const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'column',
    padding: '100px 50px'
}));

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`
export const LinkContainer = styled.div`
  color: ${props => props.theme.palette.info.main};
  font-size: 0.9rem;
`

export const StyledTextField = styled(TextField)`
  background-color: ${props => props.theme.palette.info.light};
  border-radius: ${border.borderRadius};
  fieldset {
    border-radius: ${border.borderRadius};
  }
  width: 100%;
  
  
  input, textarea {
    font-family: 'PoppinsRegular', sans-serif;
  }
`

export const LinkSpan = styled.span`
  color: ${props => props.theme.palette.primary.main};
  font-family: 'PoppinsSemiBold', sans-serif;
  text-decoration: none;
  transition: color 0.5s;
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`