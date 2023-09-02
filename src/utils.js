export function formatDateToCustomFormat(dateString) {
  const date = new Date(dateString);

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the year, month, and day from the date object
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are zero-based, so August is 7
  const day = date.getDate();

  // Format the date string as "MMM, DD YYYY"
  const formattedDate = `${monthNames[month]}, ${day} ${year}`;

  return formattedDate;
}
