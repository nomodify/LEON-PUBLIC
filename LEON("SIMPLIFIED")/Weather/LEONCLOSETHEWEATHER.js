function CloseTheWeather() {
  document.getElementById("weatherWidget").style.display = "none";
  let isOpen = false;
  firebase.database().ref("WEATHERWIDGET").set(isOpen);
}
