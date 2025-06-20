const questions = [
   {
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    answer: "Mercury"
  },
  {
    question: "Which language is used to create web pages?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: "HTML"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the boiling point of water?",
    options: ["50°C", "90°C", "100°C", "120°C"],
    answer: "100°C"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "Which instrument has keys, pedals, and strings?",
    options: ["Piano", "Drums", "Guitar", "Flute"],
    answer: "Piano"
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Leopard"],
    answer: "Lion"
  },
  {
    question: "Which planet has rings?",
    options: ["Mars", "Earth", "Saturn", "Venus"],
    answer: "Saturn"
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["Germany", "France", "Canada", "Italy"],
    answer: "France"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale"
  },
  {
    question: "What does CPU stand for?",
    options: ["Central Power Unit", "Central Processing Unit", "Control Processing Unit", "Computer Primary Unit"],
    answer: "Central Processing Unit"
  },
  {
    question: "Which bird is known for mimicking human speech?",
    options: ["Sparrow", "Crow", "Parrot", "Eagle"],
    answer: "Parrot"
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Aluminum", "Lead"],
    answer: "Mercury"
  },
  {
    question: "Which month has an extra day in a leap year?",
    options: ["January", "March", "February", "April"],
    answer: "February"
  },
  {
    question: "Which is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Granite"],
    answer: "Diamond"
  },
  {
    question: "What is the name of the fairy in Peter Pan?",
    options: ["Cinderella", "Tinker Bell", "Ariel", "Wendy"],
    answer: "Tinker Bell"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  }
];

// 🔁 Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the questions
shuffle(questions);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const timerDiv = document.getElementById("timer");
const scoreText = document.getElementById("score");
const quitBtn = document.getElementById("quit-btn");
const restartBtn = document.getElementById("restart-btn");

function startTimer() {
  timeLeft = 15;
  timerDiv.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      goToNextQuestion(); // Treat as timeout
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsDiv.appendChild(btn);
  });

  // Show Quit button from 2nd question onwards
  quitBtn.style.display = currentQuestion >= 1 ? "inline-block" : "none";
  restartBtn.style.display = "none";
  scoreText.textContent = "";
  startTimer();
}

function selectAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  if (selected === correct) score++;
  goToNextQuestion();
}

function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionText.textContent = "Quiz Completed!";
  optionsDiv.innerHTML = "";
  timerDiv.textContent = "";

  const percentage = ((score / questions.length) * 100).toFixed(2);

  scoreText.innerHTML = `
    You answered <strong>${score}</strong> out of <strong>${questions.length}</strong> questions correctly.<br>
    <strong>Percentage:</strong> ${percentage}%
  `;

  quitBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}


function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function quitQuiz() {
  clearInterval(timer);
  questionText.textContent = "You quit the quiz!";
  optionsDiv.innerHTML = "";
  timerDiv.textContent = "";
  scoreText.textContent = `Your score: ${score} out of ${questions.length}`;
  quitBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

// Button event listeners
restartBtn.addEventListener("click", restartQuiz);
quitBtn.addEventListener("click", quitQuiz);

// Start the quiz
showQuestion();
