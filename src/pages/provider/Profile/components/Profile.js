import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import ProfileDetails from "./ProfileDetails";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import ServicesStack from "../../../../utils/components/service/ServicesStack";
import {useStore} from "../../../../stores/RootStore";

/**
 * Component that displays all profile information
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = (props) => {

    const {serviceStore} = useStore()

    const provider = props.store.getProvider();

    // Loading
    if (provider === undefined) {
        return (
            <CircularLoading />
        )
    }

    if (provider === null) {
        return (
            <p>Provider no longer available</p>
        )
    }


    const services = serviceStore.getServices(provider.id);

    // Loading
    if (services === undefined) {
      return <CircularLoading />;
    }

    return (
        <Container>
            <ProfileDetails provider={provider}/>
            <ServicesStack services={services} />
        </Container>
    )
}

export default observer(Profile);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
`

