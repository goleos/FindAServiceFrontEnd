import styled from "@emotion/styled";
import {border} from "./themeConfig";

export const UpdateInfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 5px;
`

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px 5px 20px;
`

export const SectionTitle = styled.h3`
    margin-bottom: 0;
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 5px;
`

export const CreatedAt = styled.div`
  color: ${props => props.theme.palette.info.main};
`

export const Reason = styled.div`
`

export const ButtonContainer = styled.div`
  align-self: center;
  margin-bottom: 20px;
`