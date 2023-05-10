import {observer} from "mobx-react";
import {faCheckCircle, faHourglass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import {
    Timeline,
    TimelineConnector, TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import React from "react";
import {formatDate} from "../helpers/formatDate";

/**
 * Timeline for displaying updates requested
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UpdateHistory = (props) => {

    const updates = props.updates;

    let updateNodes = []

    updates.forEach((elem, index) => {
        const color = elem.status === 'completed' ? 'success' : 'info'

        updateNodes.push(
            <TimelineItem key={index}>
                <TimelineOppositeContent sx={{m: '32px 0 13px 0', py: 0}} color="textSecondary">
                    {formatDate(elem.createdAt)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={color}>
                        {elem.status === 'completed' ?
                            <FontAwesomeIcon className="fa-fw" icon={faCheckCircle}/> :
                            <FontAwesomeIcon className="fa-fw" icon={faHourglass}/>
                        }
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{m: '32px 0 13px 0', py: 0}}>
                    {elem.reason}
                </TimelineContent>
            </TimelineItem>
        )
    })

    return (
        <UpdateHistoryContainer>
            <SectionTitle>Update History</SectionTitle>
            {updateNodes.length >= 1 ?
                <Timeline>
                    {updateNodes}
                </Timeline>
                :
                <p>No updates were requested previously</p>
            }
        </UpdateHistoryContainer>
    )
}

export default observer(UpdateHistory);


const UpdateHistoryContainer = styled.div`
`

const SectionTitle = styled.h3`
`