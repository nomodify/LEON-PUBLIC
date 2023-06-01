function CheckforStuffOnload() {
  // CHECK IF WHATCANYOUDO IS TRUE or FALSE

  firebase
    .database()
    .ref("WHATCANYOUDO")
    .on("value", (snapshot) => {
      const isOpen1 = snapshot.val();
      if (isOpen1) {
        document.getElementById("whatcanyoudoWidget").style.display = "block";
      } else {
        document.getElementById("whatcanyoudoWidget").style.display = "false";
      }
    });
  //
  //
  //
  // CHECK IF WHATCANYOUDO IS TRUE or FALSE
  firebase
    .database()
    .ref("WEATHERWIDGET")
    .on("value", (snapshot) => {
      const isOpen2 = snapshot.val();
      if (isOpen2) {
        getTheCurrentWeather();
      } else {
        document.getElementById("weatherWidget").style.display = "false";
      }
    });
  //
  //
  //
  //
  firebase
    .database()
    .ref("REMINDERSWIDGET")
    .on("value", (snapshot) => {
      const isOpen2 = snapshot.val();
      if (isOpen2) {
        document.getElementById("remindersWidget").style.display = "block";
        AppendREMINDER();
      } else {
        document.getElementById("remindersWidget").style.display = "false";
      }
    });
}

window.onload = CheckforStuffOnload();
