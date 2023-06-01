function CheckIfGreetingSaidGREETINGS() {
  var YesItGreetedMe = localStorage.getItem("greetings") === "true";

  if (YesItGreetedMe) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const wakeUpWord = "leon" || "hey leon"; // WAKE UP WORD.... you can change it to anything you like it to be
    recognition.addEventListener("start", () => {
      console.log("Voice is activated, you can talk to the microphone");
    });
    recognition.addEventListener("result", ({ results, resultIndex }) => {
      const [{ transcript, confidence }] = results[resultIndex];
      if (transcript.toLowerCase().includes(wakeUpWord)) {
        console.log("Wake up word detected");
        console.log(`Confidence: ${confidence}`);
        console.log(transcript);
        FetchLEONRESPONCE(transcript);
        document.getElementById("circleOuter").style.display = "block";
      } else {
        console.log("The wake-up word wasn't detected");
      }
    });

    recognition.onend = () => recognition.start();
    recognition.start();
  } else {
    document.getElementById("output").innerHTML = "LEON is LOADING. . . ";
    TextSpeechCarter();
  }
}

window.onload = CheckIfGreetingSaidGREETINGS();

async function FetchLEONRESPONCE(transcript) {
  const data = {
    text: transcript,
    // API KEY TO CARTER
    key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
    playerId: "user123",
    speak: true, // DEFAULT FALSE | FOR VOICE OUTPUT
  };

  try {
    // Fetch data from chat API
    let response = await fetch("https://api.carterlabs.ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let chatData = await response.json();

    console.log("Output Text:", chatData.output.text);

    chatData.forced_behaviours.forEach((fb) => {
      console.log("Forced Behaviour:", fb.name);
    });

    // Fetch data from speak API
    response = await fetch("https://api.carterlabs.ai/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: chatData.output.text,
        // API KEY TO CARTER
        key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
        voice_id: "male",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let speakData = await response.json();
    console.log(speakData.file_url);
    const audio = new Audio(speakData.file_url);
    audio.play();
    document.getElementById("leonResponce").style.display = "block";
    document.getElementById("circleOuter").style.display = "block";
    document.getElementById("circleOuter1").style.display = "block";
    document.getElementById("output").innerHTML = chatData.output.text;
    audio.addEventListener("ended", () => {
      document.getElementById("leonResponce").style.display = "none";
      document.getElementById("circleOuter").style.display = "none";
      document.getElementById("circleOuter1").style.display = "none";
      document.getElementById("output").innerHTML = "";
    });

    // THIS CHECKS FOR A SPECIFiC TRiGER THAT LEON MIGHT RETuRN
    chatData.forced_behaviours.forEach((fb) => {
      // WHAT CAN YOU DO TRIGGER
      if (fb.name === "WhatCanYouDo") {
        document.getElementById("whatcanyoudoWidget").style.display = "block";
        let isOpen = true;
        firebase.database().ref("WHATCANYOUDO").set(isOpen);
      } else if (fb.name === "SetAReminder") {
        leonSETREMINDER(transcript);
        // CHECK FOR REMINDERS TRIGGER
      } else if (fb.name === "CheckForReminder") {
        audio.addEventListener("ended", () => {
          fetchReminders();
        });
        // DELETE MY REMINDERS TRIGGER
      } else if (fb.name === "DeleteMyReminders") {
        DeleteAllMyReminders();
        // GET THE WEATHER TRIGGER
      } else if (fb.name === "GetTheWeather") {
        getTheCurrentWeather();
      } else if (fb.name === "CloseTheWeatherWidget") {
        CloseTheWeather();
      } else if (fb.name === "CloseTheRemindersWidget") {
        CloseRemindersWidgets();
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
