// Supplied three-question practice quiz.
const questions = [
  { text: 'Which tag is a heading?', choices: ['h1', 'p', 'div'], answer: 0 },
  { text: 'Which language styles a page?', choices: ['CSS', 'SQL', 'C++'], answer: 0 },
  { text: 'How many days in a week?', choices: ['5', '7', '9'], answer: 1 }
];
let index = 0, score = 0, answered = false;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const nextButton = document.getElementById('next');
const progressEl = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const liveScoreEl = document.getElementById('live-score');
const resultEl = document.getElementById('result');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');
const restartButton = document.getElementById('restart');
function renderQuestion() {
  const current = questions[index];
  questionEl.textContent = current.text;
  answersEl.replaceChildren(); feedbackEl.textContent = ''; feedbackEl.className = 'feedback';
  answered = false; nextButton.disabled = true;
  nextButton.textContent = index === questions.length - 1 ? 'See final score' : 'Next question →';
  progressEl.textContent = `QUESTION ${index + 1} OF ${questions.length}`;
  progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
  liveScoreEl.textContent = `Score: ${score}`;
  current.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'answer'; button.textContent = choice;
    button.addEventListener('click', () => selectAnswer(choiceIndex)); answersEl.appendChild(button);
  });
}
function selectAnswer(choiceIndex) {
  if (answered) return; // A question can only be counted once.
  answered = true;
  const correctIndex = questions[index].answer;
  const buttons = [...answersEl.querySelectorAll('button')];
  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === correctIndex) button.classList.add('correct');
    if (buttonIndex === choiceIndex && choiceIndex !== correctIndex) button.classList.add('incorrect');
  });
  if (choiceIndex === correctIndex) { score += 1; feedbackEl.textContent = 'Correct! Well done.'; feedbackEl.classList.add('good'); }
  else { feedbackEl.textContent = `Not quite. The correct answer is ${questions[index].choices[correctIndex]}.`; feedbackEl.classList.add('bad'); }
  liveScoreEl.textContent = `Score: ${score}`; nextButton.disabled = false;
}
function showFinalScore() {
  document.querySelector('.quiz-meta').hidden = true; document.querySelector('.progress-track').hidden = true;
  questionEl.hidden = true; answersEl.hidden = true; feedbackEl.hidden = true; nextButton.hidden = true; resultEl.hidden = false;
  finalScoreEl.textContent = `${score} / ${questions.length}`;
  resultMessageEl.textContent = score === questions.length ? 'Perfect score — all answers are correct!' : score === 0 ? 'Keep practising. You can try again!' : 'Good effort! Review the answers and try again.';
}
nextButton.addEventListener('click', () => {
  if (!answered) return;
  if (index < questions.length - 1) { index += 1; renderQuestion(); } else showFinalScore();
});
restartButton.addEventListener('click', () => {
  index = 0; score = 0; document.querySelector('.quiz-meta').hidden = false; document.querySelector('.progress-track').hidden = false;
  questionEl.hidden = false; answersEl.hidden = false; feedbackEl.hidden = false; nextButton.hidden = false; resultEl.hidden = true; renderQuestion();
});
renderQuestion();
