function CloseRemindersWidgets() {
  document.getElementById("remindersWidget").style.display = "none";
  let isOpen = false;
  firebase.database().ref("REMINDERSWIDGET").set(isOpen);
}
