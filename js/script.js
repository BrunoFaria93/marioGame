const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameBoard = document.querySelector(".game-board");
const jumpSound = document.querySelector("#jump_sound");
const backgroundSound = document.querySelector("#backSound");
const gameOver = document.querySelector("#game_over");
const timeout = document.querySelector("#timeout");
// gameBoard.style.background = "linear-gradient(to bottom, " + "#ec9713" + ", " + "#e0f6ff" + ") !important";
document.querySelector(".game-board").style.background =
  "linear-gradient(to bottom, #87ceeb, #e0f6ff)";

let count = 0;
let flagScore = 0;
let flagTime = 0;
let alive = true;
let score = 0;
let isMorning = true;
let isAfternoon = false;
let isNight = false;

document.addEventListener("orientationchange", function (event) {
  switch (window.orientation) {
    case -90:
    case 90:
      /* Device is in landscape mode */
      break;
    default:
    /* Device is in portrait mode */
  }
});

const jump = () => {
  if (alive) {
    jumpSound.play();
    jumpSound.volume = 0.1;
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

let scorePainel = document.createElement("div");
scorePainel.style.position = "absolute";
scorePainel.style.right = "25px";
scorePainel.classList.add("scorePainel");

gameBoard.appendChild(scorePainel);

let scoreDiv = document.createElement("div");
let coinImage = document.createElement("img");
coinImage.src = "./imagens/coin.gif";
coinImage.classList.add("coin");
scorePainel.appendChild(coinImage);

const loop = setInterval(() => {
  backgroundSound.play();
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  score++;
  if (flagScore === 0) {
    scoreDiv.classList.add("score");
    scorePainel.appendChild(scoreDiv);
    flagScore++;
  }
  if (500 < score && score < 1000) {
    isMorning = false;
    isAfternoon = true;
    gameBoard.style.background = "linear-gradient(to bottom, #ec9713, #ddce22)";
    if (pipePosition < 0) {
      pipe.style.animationDuration = "1.5s";
    }
  }
  if (1000 < score) {
    // mario.src = "./imagens/mario-cape.gif";
    // mario.style.width = "70px";
    isAfternoon = true;
    isNight = true;
    if (flagTime === 0) {
      timeout.play();
      timeout.volume = 0.9;

      flagTime++;
    }
    isMorning = false;
    isAfternoon = true;
    gameBoard.style.background = "linear-gradient(to bottom, #39107c, #9b6ad5)";
    pipe.style.width = "80px";
  }
  scoreDiv.innerHTML = `Score: ${score}`;

  if (!isNight) {
    if (pipePosition <= 70 && pipePosition > 0 && marioPosition < 20) {
      alive = false;
      if (count === 0) {
        gameOver.play();
        gameOver.volume = 0.5;
      }
      count++;

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
    // mario.classList.add(".gameover")
      mario.src = "./imagens/mario-dies.gif";
      mario.style.width = "50px";
      mario.style.marginLeft = "50px";
      mario.style.zIndex = "1";

      let replayButtonDiv = document.createElement("div");
      replayButtonDiv.style.position = "absolute";
      replayButtonDiv.style.width = "100vw";
      replayButtonDiv.style.height = "100vh";
      replayButtonDiv.classList.add("replayButtonDiv");
      gameBoard.appendChild(replayButtonDiv);

      let replayButton = document.createElement("button");
      replayButton.classList.add("restartButton");
      replayButton.innerHTML = "Replay";
      replayButtonDiv.appendChild(replayButton);

      replayButton.addEventListener("click", () => {
        location.reload();
      });
      clearInterval(loop);
    } else {
      document.addEventListener("keydown", jump);
    }
  } else {
    if (pipePosition <= 70 && pipePosition > 0 && marioPosition < 60) {

      alive = false;
      if (count === 0) {

        gameOver.play();
        gameOver.volume = 0.5;
      }
      count++;
      backgroundSound.src = "./imagens/over.mp3";

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
    // mario.classList.add(".gameover")

      mario.src = "./imagens/mario-dies.gif";
      mario.style.width = "50px";
      mario.style.marginLeft = "50px";
      mario.style.zIndex = "1";

      let replayButtonDiv = document.createElement("div");
      replayButtonDiv.style.position = "absolute";
      replayButtonDiv.style.width = "100vw";
      replayButtonDiv.style.height = "100vh";
      replayButtonDiv.classList.add("replayButtonDiv");
      gameBoard.appendChild(replayButtonDiv);

      let replayButton = document.createElement("button");
      replayButton.classList.add("restartButton");
      replayButton.innerHTML = "Replay";
      replayButtonDiv.appendChild(replayButton);

      replayButton.addEventListener("click", () => {
        location.reload();
      });
      clearInterval(loop);
    } else {
      document.addEventListener("keydown", jump);
    }
  }
}, 10);
