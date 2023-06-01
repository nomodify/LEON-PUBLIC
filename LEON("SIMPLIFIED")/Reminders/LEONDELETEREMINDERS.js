function DeleteAllMyReminders() {
  let isOpen = false;
  firebase.database().ref("REMINDERSWIDGET").set(isOpen);
  const ref = firebase.database().ref("REMINDERS");
  ref
    .remove()
    .then(() => {
      var DeletedSuccess = "Your reminders where deleted successfully";
      response = fetch("https://api.carterlabs.ai/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: DeletedSuccess,
          // API KEY TO CARTER
          key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
          voice_id: "male",
        }),
      });
      let speakData = response.json();
      console.log(speakData.file_url);
      const audio = new Audio(speakData.file_url);
      audio.play();
      document.getElementById("leonResponce").style.display = "block";
      document.getElementById("circleOuter").style.display = "block";
      document.getElementById("circleOuter1").style.display = "block";
      document.getElementById("output").innerHTML = DeletedSuccess;
      audio.addEventListener("ended", () => {
        document.getElementById("leonResponce").style.display = "none";
        document.getElementById("circleOuter").style.display = "none";
        document.getElementById("circleOuter1").style.display = "none";
        document.getElementById("output").innerHTML = "";
      });
    })
    .catch((error) => {
      console.error("Error deleting reminders:", error);
      var DeletedSuccess = "Sorry, your reminders could not be deleted";
      response = fetch("https://api.carterlabs.ai/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: DeletedSuccess,
          // API KEY TO CARTER
          key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
          voice_id: "male",
        }),
      });
      let speakData = response.json();
      console.log(speakData.file_url);
      const audio = new Audio(speakData.file_url);
      audio.play();
      document.getElementById("leonResponce").style.display = "block";
      document.getElementById("circleOuter").style.display = "block";
      document.getElementById("circleOuter1").style.display = "block";
      document.getElementById("output").innerHTML = DeletedSuccess;
      audio.addEventListener("ended", () => {
        document.getElementById("leonResponce").style.display = "none";
        document.getElementById("circleOuter").style.display = "none";
        document.getElementById("circleOuter1").style.display = "none";
        document.getElementById("output").innerHTML = "";
      });
    });
}
