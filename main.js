let starttime, endtime;
let reactionTimes = [];
function generateRandomTime() {
  // soll eine zufällige zahl generieren
  const randomtime = Math.floor(Math.random() * 1000) * 5;
  return randomtime;
}

function messuretime() {
  endtime = Date.now();
  const reactiontime = endtime - starttime;
  reactionTimes.push(reactiontime);
  const sortedTimes = [...reactionTimes].sort((a, b) => a - b);
  document.querySelector(
    ".reaction-time-text"
  ).innerText = `${reactiontime} ms`;
  const highscoreslist = document.querySelector(".highscores");
  highscoreslist.innerHTML =
    "<strong>Highscores:</strong><br>" +
    sortedTimes.map((time, index) => `${index + 1}. ${time} ms`).join("<br>");
  console.log("Alle Zeiten:", reactionTimes);
  switchscreenendscreen();
  document
    .querySelector(".clickable-area")
    .removeEventListener("click", messuretime);
}

function switchscreenmainmenu() {
  const mainMenu = document.querySelector(".main-menu");
  const endScreen = document.querySelector(".end-screen");
  const falsescreen = document.querySelector(".false-screen");
  mainMenu.classList.add("active");
  endScreen.classList.remove("active");
  falsescreen.classList.remove("active");
}

function switchscreenendscreen() {
  const mainMenu = document.querySelector(".main-menu");
  const endScreen = document.querySelector(".end-screen");
  const falsescreen = document.querySelector(".false-screen");
  mainMenu.classList.remove("active");
  falsescreen.classList.remove("active");
  endScreen.classList.add("active");
}

function switchscreenfalsescreen() {
  const mainMenu = document.querySelector(".main-menu");
  const endScreen = document.querySelector(".end-screen");
  const falsescreen = document.querySelector(".false-screen");
  mainMenu.classList.remove("active");
  endScreen.classList.remove("active");
  falsescreen.classList.add("active");
}

function switchscreenclickablearea() {
  const mainMenu = document.querySelector(".main-menu");
  const endScreen = document.querySelector(".end-screen");
  mainMenu.classList.remove("active");
  endScreen.classList.remove("active");
}

function switchscreens() {
  // soll zwischen den screens wechseln (main-menu und end-screen)
  const mainMenu = document.querySelector(".main-menu");
  const endScreen = document.querySelector(".end-screen");

  if (mainMenu.classList.contains("active")) {
    mainMenu.classList.remove("active");
    endScreen.classList.add("active");
  }
  if (endScreen.classList.contains("active")) {
    endScreen.classList.remove("active");
    mainMenu.classList.add("active");
  }
}

function starttest() {
  // soll den Test starten
  switchscreenclickablearea();
  const clickableArea = document.querySelector(".clickable-area");
  clickableArea.style.backgroundColor = "gray";
  clickableArea.innerText = "Noch nicht";
  clickableArea.removeEventListener("click", messuretime);
  let isGreen = false;
  clickableArea.onclick = function () {
    if (!isGreen) {
      switchscreenfalsescreen();
      clickableArea.onclick = null;
    } else {
      messuretime();
      clickableArea.onclick = null;
    }
  };
  const delay = generateRandomTime();
  setTimeout(() => {
    clickableArea.style.backgroundColor = "green";
    clickableArea.innerText = "Jetzt drücken";
    starttime = Date.now();
    clickableArea.addEventListener("click", messuretime);
  }, delay);
}

switchscreenmainmenu();
