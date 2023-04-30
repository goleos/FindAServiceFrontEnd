import {
  faBabyCarriage,
  faBroom,
  faBugSlash,
  faCalendarCheck,
  faCircleCheck,
  faCircleQuestion,
  faCircleXmark,
  faHourglassHalf,
  faPlug,
  faSprayCanSparkles, faToolbox, faTrash,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

export const getServiceIcon = (category) => {
  switch (category) {
    case "Cleaning":
      return faBroom
    case "Babysitting":
      return faBabyCarriage
    case "Pest Control":
      return faBugSlash
    case "Plumbing":
      return faWrench
    case "Electrical Repairs":
      return faPlug
    case "Beauty":
      return faSprayCanSparkles
    default :
      return faToolbox
  }
}


export const getRequestStatusInfo = (status, provider, theme) => {

  let color
  let icon
  let statusText
  let info

  switch (status) {
    case "pending":
      color = provider ? theme.palette.secondary.main : theme.palette.info.main;
      icon = faHourglassHalf;
      statusText = provider ? "To Review" : "Pending";
      info = "Wait for the service provider to review your request"
      break;
    case "accepted":
      color = theme.palette.warning.main;
      icon = faCalendarCheck;
      statusText = "Accepted";
      info = "This request was accepted. The service provider should carry out the service at the agreed booking time."
      break;
    case "rejected":
      color = theme.palette.error.main;
      icon = faCircleXmark;
      statusText = "Rejected";
      info = "This request was rejected. Please try making a new one."
      break;
    case "completed":
      color = theme.palette.success.main;
      icon = faCircleCheck;
      statusText = "Completed";
      info = "This request was completed"
      break;
    case "request_further_details":
      color =  provider ? theme.palette.info.main : theme.palette.secondary.main;
      icon = faCircleQuestion;
      statusText = provider ? "Further Details Requested" : "Further Details Needed";
      info = "Please review and make the requested updates. Make sure to mark the request as completed when finished";
      break;
    default :
      color = theme.palette.error.main;
      icon = faTrash;
      statusText = "Withdrawn";
      info = "This request was withdrawn"
      break;
  }

  return {
    color: color,
    icon: icon,
    statusText: statusText,
    info: info
  }
}