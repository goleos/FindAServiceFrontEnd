import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem, TimelineOppositeContent, timelineOppositeContentClasses,
    TimelineSeparator
} from "@mui/lab";
import {faCheckCircle, faHourglass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import formatDate from "../../../../utils/helpers/formatDate";


const ProfileUpdates = (props) => {

    const profileUpdates = props.store.getProfileUpdates();

    // Loading
    if (profileUpdates === undefined) {
        return (
            <CircularLoading />
        )
    }

    let updateNodes = []

    profileUpdates.forEach((elem, index, array) => {
        const color = elem.status === 'completed' ? 'success' : 'info'

        updateNodes.push(
            <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ py: '12px', px: 2 }} color="textSecondary">
                    {formatDate(elem.createdAt)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color={color}>
                        {elem.status === 'completed' ?
                            <FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/> :
                            <FontAwesomeIcon className="fa-fw" icon={faHourglass}/>
                        }
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    {elem.reason}
                </TimelineContent>
            </TimelineItem>
        )
    })

    return (
        <Container>
            <SectionTitle>Update History</SectionTitle>
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                    },
                }}
            >
                {updateNodes}
            </Timeline>
        </Container>
    )
}

export default observer(ProfileUpdates);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px;
`

const SectionTitle = styled.h3`
`

