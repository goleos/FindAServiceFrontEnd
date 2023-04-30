import styled from "@emotion/styled";
import {device} from "../helpers/constants";

export const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

export const Line = styled.hr`
  width: 80%;
  border: 2px solid ${props => props.theme.palette.primary.light}
`

export const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`

export const PriceContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and ${device.tablet} {
    justify-content: center;
  }
`

export const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;
  font-size: 0.9rem;

  @media only screen and ${device.tablet} {
    align-items: center;
    justify-content: center;
  }
`

export const Name = styled.p`
  margin: 0;
  padding: 0;
    

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`

export const UserDetails = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    justify-content: center;
  }
`

export const ApprovalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and ${device.tablet} {
    padding: 20px;
  }
`

export const RequestNumber = styled.div`
  color: ${props => props.theme.palette.info.main};
  font-size: 0.8rem;
  margin-bottom: 10px;
  align-self: end;
`
