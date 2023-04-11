import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

/**
 * Any Button with an icon in front
 * @param props
 * @constructor
 */
const IconButton = (props) => {

    const {loadingCondition, icon, name, color, ...otherProps} = props

    return (
        <>
            {loadingCondition
                ? <LoadingButton loading variant="outlined" size="large" >Submit</LoadingButton>
                : <Button
                    type="button"
                    variant="contained"
                    size="small"
                    color={color}
                    {...otherProps}
                    startIcon={
                        <FontAwesomeIcon className="fa-fw" icon={icon}/>
                    }
                >
                    {name}
                </Button>
            }
        </>
    )
}

export default IconButton;