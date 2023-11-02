// function to format a timestamp, accepts the timestamp and an `options` object as parameters
module.exports = (timestamp) => {

  const dateObj = new Date(timestamp);
  const formattedMonth = dateObj.getMonth() + 1;

  const dayOfMonth = dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth}/${dayOfMonth}/${year} ${hour}:${minutes}${periodOfDay}`;

  return formattedTimeStamp;
};















// module.exports = (timestamp) => {
//   const dateObj = new Date(timestamp);

//   // Get the month, day, and year
//   const month = dateObj.getMonth() + 1;
//   const day = dateObj.getDate();
//   const year = dateObj.getFullYear();
//   let hours =
//   dateObj.getHours() > 12
//     ? Math.floor(dateObj.getHours() - 12)
//     : dateObj.getHours();

// // if hour is 0 (12:00am), change it to 12
// if (hours === 0) {
//   hours = 12;
// }

// const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

// // set `am` or `pm`
// const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

//   // Format as MM/DD/YYYY
//   const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

//   console.log('Date object:', dateObj);
//   console.log('Formatted date:', formattedDate);
  
//   // Combine date and time
//   const formattedDateTime = `${formattedDate} ${hours}:${minutes} ${periodOfDay}`;

//   return formattedDateTime;
// }