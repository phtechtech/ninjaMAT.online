let score = 0;
let lives = 2;
let time = 5;
let timer;
let difficulty = 'basico';
let currentA, currentB, currentOp;

const questionEl = document.getElementById('question');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const answerEl = document.getElementById('answer');
const messageEl = document.getElementById('message');
const timeEl = document.getElementById('time-left');
const timerBox = document.getElementById('timer');
const ninja = document.getElementById('ninja');
const enemy = document.getElementById('enemy');

const hitSound = document.getElementById('sound-hit');
const failSound = document.getElementById('sound-fail');

function startGame(level) {
  difficulty = level;
  document.getElementById('level-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  resetGame();
}

function resetGame() {
  score = 0;
  lives = 2;
  updateDisplay();
  newQuestion();
}

function updateDisplay() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
}

function newQuestion() {
  if (difficulty === 'basico') {
    currentOp = Math.random() < 0.5 ? '+' : '-';
    currentA = Math.floor(Math.random() * 10) + 1;
    currentB = Math.floor(Math.random() * 10) + 1;
    if (currentOp === '-' && currentB > currentA) [currentA, currentB] = [currentB, currentA];
  } else {
    const ops = ['+', '-', '*', '/'];
    currentOp = ops[Math.floor(Math.random() * ops.length)];
    currentA = Math.floor(Math.random() * 10) + 1;
    currentB = Math.floor(Math.random() * 9) + 1;
    if (currentOp === '/') currentA = currentA * currentB;
  }

  questionEl.textContent = `Quanto é ${currentA} ${currentOp} ${currentB}?`;
  answerEl.value = '';
  messageEl.textContent = '';
  if (difficulty === 'ninja') startTimer();
}

function getCorrectAnswer() {
  switch (currentOp) {
    case '+': return currentA + currentB;
    case '-': return currentA - currentB;
    case '*': return currentA * currentB;
    case '/': return currentA / currentB;
  }
}

function checkAnswer() {
  if (difficulty === 'ninja') clearInterval(timer);
  const userAnswer = parseFloat(answerEl.value);
  const correct = getCorrectAnswer();

  if (userAnswer === correct) {
    score++;
    animateHit();
    hitSound.play();
    messageEl.textContent = '✅ Acertou!';
  } else {
    lives--;
    failSound.play();
    messageEl.textContent = `❌ Errado! Resposta correta: ${correct}`;
  }

  updateDisplay();
  if (lives <= 0) {
    alert('💀 Fim de jogo!');
    location.reload();
  } else if (score >= 10) {
    alert('🏆 Você é um ninja da matematica! 🥇');
    location.reload();
  } else {
    newQuestion();
  }
}

function animateHit() {
  enemy.classList.add('hit');
  setTimeout(() => enemy.classList.remove('hit'), 300);
}

function startTimer() {
  time = 5;
  timerBox.classList.remove('hidden');
  timeEl.textContent = time;
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      lives--;
      failSound.play();
      messageEl.textContent = '⏰ Tempo esgotado!';
      updateDisplay();
      if (lives <= 0) {
        alert('💀 Fim de jogo!');
        location.reload();
      } else {
        newQuestion();
      }
    }
  }, 1000);
}

answerEl.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});