// -- GET HTML ELEMENTS --

const mainBtn = document.getElementById("main-btn");
const listeningAlertContainer = document.getElementById(
  "listening-alert-container"
);

function initSpeechRecognition() {
  let recognising = false;
  let masterTranscript = "";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert(
      "Sorry, your browser does not support Speech Recognition. Try using Chrome or Safari."
    );
    return;
  }

  const recognition = new SpeechRecognition();

  // Recognition settings

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-UK";
  recognition.onresult = (event) => {
    let currentTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      currentTranscript = event.results[i][0].transcript;
    }
    masterTranscript += currentTranscript;
  };
  recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
  };

  function handleMainBtnClick() {
    // Toggle the button text
    mainBtn.innerText === "Listen"
      ? (mainBtn.innerText = "Stop + Send")
      : (mainBtn.innerText = "Listen");

    // Display "Listening.." in UI
    listeningAlertContainer.classList.toggle("show-element");

    // Start/stop the Speech Recognition
    if (recognising) {
      recognition.stop();
      recognising = false;
      console.log("Master:", masterTranscript);
      console.log("Speech recognition stopped.");
      masterTranscript = "";
    } else {
      recognition.start();
      recognising = true;
      console.log("Speech recognition started.");
    }
  }

  mainBtn.addEventListener("click", handleMainBtnClick);
}

// -- CLICK HANDLERS --

// -- EVENT LISTENERS --

window.onload = initSpeechRecognition;
