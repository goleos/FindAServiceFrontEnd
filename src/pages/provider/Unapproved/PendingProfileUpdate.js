import {observer} from "mobx-react";
import PendingUpdateWarning from "./PendingUpdateWarning";
import React from "react";
import {formatDate} from "../../../utils/helpers/formatDate";
import {Checkbox} from "@mui/material";
import {faCircleCheck, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import {useNavigate} from "react-router-dom";
import IconButton from "../../../utils/components/IconButton";
import {ROUTES} from "../../../utils/helpers/constants";
import {
  Container,
  CreatedAt,
  DetailsContainer, Reason,
  SectionTitle,
  UpdateInfoContainer
} from "../../../utils/styles/updateStyles";
import {ButtonContainer} from "../../../utils/styles/formStyles";

/**
 * Component to display when the provider has a profile update request
 * from the admin
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PendingProfileUpdate = (props) => {

    const navigate = useNavigate();

    const handleCheck = async (event) => {
        const status = event.target.checked ? 'completed' : 'pending';

        try {
            const res = await axiosConfig().put(`/profileUpdate/${props.update.id}/changeStatus`, {status: status});

            if (res.data.status) {
                props.store.requestProfileUpdates();
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = () => {
        navigate(ROUTES.provider.editProfile)
    }

    return (
        <>
            <PendingUpdateWarning />
            <Container>
                <SectionTitle>Update Information</SectionTitle>
                <DetailsContainer>
                    <UpdateInfoContainer>
                        <Checkbox
                            size="large"
                            color="success"
                            icon={<FontAwesomeIcon className="fa-fw" icon={faCircle}/>}
                            checkedIcon={<FontAwesomeIcon className="fa-fw" icon={faCircleCheck}/>}
                            onChange={handleCheck}
                        />
                        <Reason>{props.update.reason}</Reason>
                    </UpdateInfoContainer>
                    <CreatedAt>{formatDate(props.update.createdAt)} </CreatedAt>
                </DetailsContainer>
                <ButtonContainer>
                    <IconButton
                        icon={faPen}
                        name="Edit Profile"
                        color="primary"
                        onClick={handleClick}
                    />
                </ButtonContainer>
            </Container>
        </>
    )
}

export default observer(PendingProfileUpdate);

