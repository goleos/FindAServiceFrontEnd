import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import {useStore} from "../../../stores/RootStore";
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import ProviderTile from "./ProviderTile";
import {Title} from "../../../utils/components/Title";
import {CircularLoading} from "../../../utils/components/CircularLoading";


const AdminHomePage = () => {

    const { adminStore } = useStore();
    const unApprovedProviders = adminStore.getUnapprovedProviders();

    // Loading
    if (unApprovedProviders === undefined) {
        return (
            <CircularLoading />
        )
    }

    // Create book nodes
    let providerNodes = [];

    unApprovedProviders.forEach((elem, index) => {
        providerNodes.push(
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <NavLink to={`/provider/profile/${elem.id}`}>
                    <ProviderTile provider={elem} />
                </NavLink>
            </Grid>
        )
    })

    return (
        <Page>
            <Title text="New Providers" />
            <Grid container spacing={3}>
                {providerNodes}
            </Grid>
        </Page>
    )
}

export default observer(AdminHomePage);