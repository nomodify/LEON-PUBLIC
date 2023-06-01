function closeWHATICANDO() {
  document.getElementById("whatcanyoudoWidget").style.display = "none";
  let isOpen = false;
  firebase.database().ref("WHATCANYOUDO").set(isOpen);
}
