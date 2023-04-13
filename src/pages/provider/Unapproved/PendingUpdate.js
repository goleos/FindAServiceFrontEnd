import {observer} from "mobx-react";
import styled from "@emotion/styled";
import PendingUpdateWarning from "./PendingUpdateWarning";
import React from "react";
import {border} from "../../../utils/styles/themeConfig";
import formatDate from "../../../utils/helpers/formatDate";
import {Checkbox} from "@mui/material";
import {faCircleCheck, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import axiosConfig from "../../../utils/helpers/axiosConfig";
import {useNavigate} from "react-router-dom";
import IconButton from "../../../utils/components/IconButton";
import {ROUTES} from "../../../utils/helpers/constants";


const PendingUpdate = (props) => {

    const navigate = useNavigate();

    const handleCheck = async (event) => {
        const status = event.target.checked ? 'completed' : 'pending';

        try {
            const res = await axiosConfig().put(`/profile-update/${props.update.id}/change-status`, {status: status});

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

export default observer(PendingUpdate);

const UpdateInfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 5px;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  padding: 10px 20px 5px 20px;
`

const SectionTitle = styled.h3`
    margin-bottom: 0;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 5px;
`

const CreatedAt = styled.div`
  color: ${props => props.theme.palette.info.main};
`

const Reason = styled.div`
`

const ButtonContainer = styled.div`
  align-self: center;
  margin-bottom: 20px;
`
