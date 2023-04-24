export const formatDate = (date) => {
    if (!date) return 'No Date'

    const options = { year: 'numeric', month: 'short', day: 'numeric' }

    return new Date(date).toLocaleDateString('en-UK', options);
}

/**
 * This post helped with the correct format
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
export const formatDateStringISO = (value) => {
  if (!value) return '';
  let date =  new Date(value);

  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))

  return date.toISOString().split('T')[0];
}