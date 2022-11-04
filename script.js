let totalSeconds = 333, days = 0, hours = 0, minutes = 0, seconds = 0;

function loadTime() {
  totalSeconds = window.localStorage.getItem('totalSeconds');
}
function saveTime() {
  window.localStorage.setItem('totalSeconds', totalSeconds);
}

function clickStart() {
  console.log('start');
}
function clickPause() {
  console.log('Pause');
}
function clickSave() {
  console.log('Save');
}
function clickReset() {
  console.log('Reset');
}

let divTotalTime = document.getElementById('idtotaltime');


// let timeCounterTimer = setInterval(function() {
//   seconds++;
//   divTotalTime.textContent = seconds;
// }, 1000);

// saveTime();
// loadTime();
// divTotalTime.textContent = totalSeconds;
