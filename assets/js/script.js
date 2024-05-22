function initSpeechRecognition() {
  // Get HTML elements.
  const mainBtn = document.getElementById("main-btn");
  const alertsContainer = document.getElementById("alerts-container");
  const alerts = document.getElementById("alerts");

  // Init variables.
  let recognising = false;
  let masterTranscript = "";

  // Init Speech Recognition API.
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Sorry, your browser does not support Speech Recognition. Try using Chrome or Safari."
    );
    return;
  }

  const recognition = new SpeechRecognition();

  // Recognition settings.
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-UK";

  // Handle results.
  recognition.onresult = (event) => {
    let currentTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      currentTranscript = event.results[i][0].transcript;
    }
    masterTranscript += currentTranscript;
  };

  // Handle errors.
  recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
  };

  // -- CLICK HANDLER --

  function handleMainBtnClick() {
    // Toggle the button text
    mainBtn.innerText === "Listen"
      ? (mainBtn.innerText = "Stop + Send")
      : (mainBtn.innerText = "Listen");

    // Display alerts in the UI
    alertsContainer.classList.toggle("show-element");

    // TODO:
    // alerts.innerText === "Listening..." ? () : ();

    // Start/stop the Speech Recognition
    if (recognising) {
      console.log("...processing");
      // Note: setTimeout is a temp workaround to allow the SpeechRecognition to finish transcribing before calling recognition.stop().
      setTimeout(function () {
        recognition.stop();
        recognising = false;
        console.log("Master transcript:", masterTranscript);
        console.log("Speech recognition stopped.");
        masterTranscript = "";
      }, 3000);
    } else {
      recognition.start();
      recognising = true;
      console.log("Speech recognition started.");
    }
  }

  mainBtn.addEventListener("click", handleMainBtnClick);
}

window.onload = initSpeechRecognition;
