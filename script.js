const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('time');
const lapList = document.getElementById('lapList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

function formatTime(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(ms).padStart(3, '0')
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  running = true;
  startPauseBtn.textContent = 'Pause';
  startPauseBtn.setAttribute('aria-pressed', 'true');
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  running = false;
  startPauseBtn.textContent = 'Start';
  startPauseBtn.setAttribute('aria-pressed', 'false');
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.000';
  startPauseBtn.textContent = 'Start';
  startPauseBtn.setAttribute('aria-pressed', 'false');
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapList.innerHTML = '';
}

function recordLap() {
  if (!running) return;
  const lapTime = formatTime(elapsedTime);
  const li = document.createElement('li');
  const lapNumber = lapList.children.length + 1;
  li.textContent = `Lap ${lapNumber}`;
  const span = document.createElement('span');
  span.textContent = lapTime;
  li.appendChild(span);
  lapList.prepend(li);
}

startPauseBtn.addEventListener('click', () => {
  if (!running) {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener('click', () => {
  resetTimer();
});

lapBtn.addEventListener('click', () => {
  recordLap();
});
