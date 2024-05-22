// -- Get HTML elements

const mainBtn = document.getElementById("main-btn");
const listeningAlertContainer = document.getElementById(
  "listening-alert-container"
);

// -- Click handlers

function handleMainBtnClick() {
  console.log("clicked");

  mainBtn.innerText === "Listen"
    ? (mainBtn.innerText = "Stop + Send")
    : (mainBtn.innerText = "Listen");

  listeningAlertContainer.classList.toggle("show-element");
}

// -- Event listeners

mainBtn.addEventListener("click", handleMainBtnClick);
