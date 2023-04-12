import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import NoPendingUpdateWarning from "./NoPendingUpdateWarning";
import UpdateHistory from "../UpdateHistory";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import React from "react";
import styled from "@emotion/styled";
import {border} from "../../../utils/styles/themeConfig";
import PendingUpdate from "./PendingUpdate";


const UnapprovedPage = (props) => {

    const profileUpdates = props.store.getProfileUpdates();

    // Loading
    if (profileUpdates === undefined) {
        return (
            <CircularLoading />
        )
    }

    let hasUpdate = false;

    if (profileUpdates.length > 0) {
        hasUpdate = profileUpdates[0].status === 'pending'
    }

    return (
        <Page>
            <Container>
                {hasUpdate ? <PendingUpdate store={props.store} update={profileUpdates[0]}/> : <NoPendingUpdateWarning />}
                <UpdateHistoryContainer>
                    <UpdateHistory updates={hasUpdate ? profileUpdates.slice(1): profileUpdates}/>
                </UpdateHistoryContainer>
            </Container>
        </Page>
    )
}

export default observer(UnapprovedPage);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`

const UpdateHistoryContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px 5px 20px;
`