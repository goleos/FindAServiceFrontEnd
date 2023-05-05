import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {ProfileImage} from "../ProfileImage";
import {formatDate} from "../../helpers/formatDate";
import {border} from "../../styles/themeConfig";
import {NavLink} from "react-router-dom";


const NotificationsItem = (props) => {

  const {providerFirstName, providerLastName, providerProfileImage, type, date, read, serviceId } = props.notification;

  const message = type === 'service_completed' ? ' completed the requested service. Leave a review!' : ' added a new service. View.'

  return (
    <NavLink to={`/service/${serviceId}`}>
      <Container>
        <ProfileImage size="small" image={providerProfileImage}/>
        <MessageContainer>
          <Message><Name>{providerFirstName} {providerLastName}</Name> {message}</Message>
          <Date>{formatDate(date)}</Date>
        </MessageContainer>
        {!read &&
          <div>
            <UnreadDot />
          </div>
        }
      </Container>
    </NavLink>
  )
}

export default observer(NotificationsItem);

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: ${border.borderRadius};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 10px;
  width: 100%;
  transition: box-shadow 0.5s;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`

const Message = styled.div`
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Name = styled.h4`
  display: inline;
  margin: 0; 
  padding: 0;
`

const UnreadDot = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${props => props.theme.palette.primary.main};
`


const Date = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.palette.info.main}
`