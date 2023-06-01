function fetchReminders() {
  const ref = firebase.database().ref("REMINDERS");

  ref.on(
    "value",
    (snapshot) => {
      const data = snapshot.val();

      // Check if there is any data
      if (data) {
        var textToSpeak =
          "Yes, it looks like you have some reminders set. Let me pull them up.";
        console.log("Reminders exist:");
        fetch("https://api.carterlabs.ai/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textToSpeak,
            // API KEY TO CARTER
            key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
            voice_id: "male",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.file_url);
            const audio = new Audio(data.file_url);
            audio.play();
            document.getElementById("leonResponce").style.display = "block";
            document.getElementById("circleOuter").style.display = "block";
            document.getElementById("circleOuter1").style.display = "block";
            document.getElementById("output").innerHTML = textToSpeak;
            audio.addEventListener("ended", () => {
              document.getElementById("leonResponce").style.display = "none";
              document.getElementById("circleOuter").style.display = "none";
              document.getElementById("circleOuter1").style.display = "none";
              document.getElementById("output").innerHTML = "";
              AppendREMINDER();
            });
          });
        var firebaseRef = firebase.database().ref();
        let isOpen = true;
        firebase.database().ref("REMINDERSWIDGET").set(isOpen);
      } else {
        var textToSpeak = "No, there was no reminders found";
        fetch("https://api.carterlabs.ai/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textToSpeak,
            // API KEY TO CARTER
            key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
            voice_id: "male",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.file_url);
            const audio = new Audio(data.file_url);
            audio.play();
            document.getElementById("leonResponce").style.display = "block";
            document.getElementById("circleOuter").style.display = "block";
            document.getElementById("circleOuter1").style.display = "block";
            document.getElementById("output").innerHTML = textToSpeak;
            audio.addEventListener("ended", () => {
              document.getElementById("leonResponce").style.display = "none";
              document.getElementById("circleOuter").style.display = "none";
              document.getElementById("circleOuter1").style.display = "none";
              document.getElementById("output").innerHTML = "";
            });
          });

        document.getElementById("remindersWidget").style.display = "none";
        let isOpen = false;
        firebase.database().ref("REMINDERSWIDGET").set(isOpen);
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
}

function AppendREMINDER() {
  const ref = firebase.database().ref("REMINDERS");

  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    const allRemindersElement = document.getElementById("allReminders2"); // changed to allReminders2
    if (data) {
      document.getElementById("remindersWidget").style.display = "block";
      allRemindersElement.innerHTML = ""; // Clear previous data

      // Iterate through each reminder and append it to the list
      Object.values(data).forEach((reminder) => {
        const listItem = document.createElement("li");
        listItem.textContent = reminder;
        allRemindersElement.appendChild(listItem); // append new list item directly to the existing ul
      });
    } else {
      // Hide widget if there are no reminders
      document.getElementById("remindersWidget").style.display = "none";
    }
  });
}
