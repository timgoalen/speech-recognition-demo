function initSpeechRecognition() {
  // Get HTML elements.
  const mainBtn = document.getElementById("main-btn");
  const alertsContainer = document.getElementById("alerts-container");
  const alert = document.getElementById("alert");

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

  // -- FUNCTIONS --

  function updateUiToListening() {
    // Set button text.
    mainBtn.innerText = "Stop + Send";
    // Display alerts in the UI.
    alert.innerText = "Listening...";
    alertsContainer.classList.add("show-element");
  }

  function updateUiToProcessing() {
    mainBtn.innerText = "Listen";
    mainBtn.style.cursor = "not-allowed";
    mainBtn.disabled = true;
    alert.innerText = "Processing...";
  }

  function updateUiToSuccess() {
    mainBtn.style.cursor = "pointer";
    mainBtn.disabled = false;
    alert.innerText = "Success!";
  }

  function startSpeechRecognition() {
    recognition.start();
    recognising = true;
    console.log("Speech recognition started.");
  }

  function stopSpeechRecognition() {
    recognition.stop();
    recognising = false;
    console.log("Master transcript:", masterTranscript);
    console.log("Speech recognition stopped.");
    masterTranscript = "";
  }

  // -- CLICK HANDLER --

  function handleMainBtnClick() {
    // Start/stop the Speech Recognition
    if (!recognising) {
      updateUiToListening();
      startSpeechRecognition();
    } else {
      updateUiToProcessing();
      console.log("...processing");
      // Note: setTimeout is a temp workaround to allow the SpeechRecognition to finish transcribing before calling recognition.stop().
      setTimeout(function () {
        updateUiToSuccess();
        stopSpeechRecognition();
        // Remove "Success!" alert after 1.5 seconds.
        setTimeout(function () {
          alertsContainer.classList.remove("show-element");
        }, 1500);
      }, 3000);
    }
  }

  mainBtn.addEventListener("click", handleMainBtnClick);
}

window.onload = initSpeechRecognition;
