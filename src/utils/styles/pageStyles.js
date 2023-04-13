import styled from "@emotion/styled";

export const Page = styled.div`
  padding: 20px;
  color: ${props => props.theme.palette.secondary.dark}
`

export const Line = styled.hr`
  width: 80%;
  border: 2px solid ${props => props.theme.palette.primary.light}
`