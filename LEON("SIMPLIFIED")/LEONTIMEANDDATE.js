function GetTheCurrentTime() {
  const date = new Date();
  //het the hour
  let hour = date.getHours();
  //get the minutes
  let minutes = date.getMinutes();
  //get the minutes
  let seconds = date.getSeconds();
  // get am or pm
  let amOrPm = hour >= 12 ? "pm" : "am";
  // convert the hour from 24 hour to 12 hour
  hour = hour % 12 || 12;
  // add a 0 to the minutes if the minutes are less than 10
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // get the time
  let time = `${hour}:${minutes}:${seconds} ${amOrPm}`;
  document.getElementById("time").innerHTML = time;
}

window.onload = GetTheCurrentTime();
setInterval(GetTheCurrentTime, 100);

function GetTheCurrentDay() {
  // DISPLAY THE DATE
  var date = new Date().toLocaleDateString();
  var importantInformation = date;
  document.getElementById("date").innerHTML = importantInformation;
}

window.onload = GetTheCurrentDay();
setInterval(GetTheCurrentDay, 100);
