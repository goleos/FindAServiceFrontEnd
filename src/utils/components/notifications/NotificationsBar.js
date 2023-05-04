import {observer} from "mobx-react";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../CircularLoading";
import styled from "@emotion/styled";
import {Title} from "../Title";
import {device} from "../../helpers/constants";
import NotificationsItem from "./NotificationsItem";


const NotificationsBar = () => {
  const { notificationsStore } = useStore();

  // Get current user
  let notifications = notificationsStore.getNotifications();

  // Loading
  if (notifications === undefined) {
    return (
      <CircularLoading />
    )
  }

  let notificationNodes = []

  notifications.forEach((elem, index) => {
    notificationNodes.push(
      <NotificationsItem key={index} notification={elem} />
    )
  })

  return (
    <Container>
      <Title text={"Notifications"} />
      {notificationNodes}
    </Container>
  )
}

export default observer(NotificationsBar);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  width: 35vw;

  @media only screen and ${device.mobileL} {
    width: 80vw;
    font-size: 0.9rem;
  }
`