// CARTER LEON API KEY: 4e64d301-ed42-492b-bb73-a4648d4fb961
async function TextSpeechCarter() {
  // Initialize DOM elements upfront
  const outputElement = document.getElementById("output");
  const leonResponceElement = document.getElementById("leonResponce");
  const circleOuterElement = document.getElementById("circleOuter");
  const circleOuter1Element = document.getElementById("circleOuter1");
  const borderBoxElement = document.querySelector(".borderBox");

  try {
    var GreetingText =
      "Greetings and welcome! My name is LEON, an AI assistant dedicated to providing exceptional service and support to all users. Whether you need assistance managing your schedule, organizing projects or conducting research, I'm here to make your tasks easier and more efficient. My priority is to help you stay productive and focused on your work, so please let me know how I can assist you today.";
    const speakResponse = fetch("https://api.carterlabs.ai/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: GreetingText,
        // API KEY TO CARTER
        key: "4e64d301-ed42-492b-bb73-a4648d4fb961",
        voice_id: "male",
      }),
    });

    const speakData = await (await speakResponse).json();

    console.log(speakData.file_url);
    const audio = new Audio(speakData.file_url);
    audio.play();

    outputElement.innerHTML = GreetingText;
    leonResponceElement.style.display = "block";
    circleOuterElement.style.display = "block";
    circleOuter1Element.style.display = "block";

    audio.addEventListener("ended", () => {
      circleOuterElement.style.display = "none";
      circleOuter1Element.style.display = "none";
      leonResponceElement.style.display = "none";
      outputElement.innerHTML = "";
      SaveGreetingToFirebase();
    });
  } catch (error) {
    console.error(error);
  }
}

window.onload = CheckIfGreetingSaid();

// function SaveGreetingToFirebase() {
//   var YesItGreetedMe = true;
//   localStorage.setItem("greetings", YesItGreetedMe);
// }

function CheckIfGreetingSaid() {
  var YesItGreetedMe = localStorage.getItem("greetings") === "true"; // localStorage only stores strings

  if (YesItGreetedMe) {
    console.log("Yes it was said");
  } else {
    document.getElementById("leonResponce").style.display = "block";
    document.getElementById("output").innerHTML = "LEON is LOADING. . . ";
    TextSpeechCarter();
  }
}
