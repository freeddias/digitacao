// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

// list of words for game
const words = [
"araraquara","o"
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 90;

// Set difficulty
let difficulty = "god";
// focus on text on start
text.focus();

// count down
const timeInterval = setInterval(updateTime, 1000);

// Random words generator from Array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);

    //   game over
    gameOver();
  }
}

// show Game over
function gameOver() {
  if(score < 50){
    endGameElement.innerHTML = `
  <h1>Fim do Tempo</h1>
  <p>Sua pontuação final é: ${score}</p>
  <button onclick="location.reload()" style="
  background: #004A8D; color: #fff;">Recomeçar</button>
  <h1>Dá pra melhorar hein?</h1>
    `;
  }
  else
    if(score < 100){
    endGameElement.innerHTML = `
  <h1>Fim do Tempo</h1>
  <p>Sua pontuação final é: ${score}</p>
  <button onclick="location.reload()" style="
  background: #004A8D; color: #fff;">Recomeçar</button>
  <h1>Tá quase bom!</h1>
    `;
  }
  else
      endGameElement.innerHTML = `
  <h1>Fim do Tempo</h1>
  <p>Sua pontuação final é: ${score}</p>
  <button onclick="location.reload()" style="
  background: #004A8D; color: #fff;">Recomeçar</button>
  <h1>Excelente!</h1>
    `;
  localStorage.setItem("difficulty", difficulty);
  endGameElement.style.display = "flex";
}

addWordToDOM();

// Typing Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    console.log(localStorage.getItem("difficulty"));
    console.log(difficulty);
    e.target.value = "";
    updateTime();
  }
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("god", difficulty);
});
