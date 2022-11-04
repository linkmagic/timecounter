let totalSeconds = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
let timeCounterTimer = undefined;
let idTotalDays, idTotalHours, idTotalMinutes, idTotalSeconds;

function loadTime() {
  totalSeconds = window.localStorage.getItem('totalSeconds');
}
function saveTime() {
  window.localStorage.setItem('totalSeconds', totalSeconds);
}
function initElements() {
  idTotalDays = document.getElementById('idTotalDays');
  idTotalHours = document.getElementById('idTotalHours');
  idTotalMinutes = document.getElementById('idTotalMinutes');
  idTotalSeconds = document.getElementById('idTotalSeconds');
}
function addLeadingZero(value) {
  return (value > 9 ? '' : '0' ) + value;
}
function calcAndPrintTime() {
  days = Math.floor(totalSeconds / 3600 / 24);
  hours = Math.floor((totalSeconds - (days * 86400)) / 3600);
  minutes = Math.floor((totalSeconds - (days * 86400) - (hours * 3600)) / 60);
  seconds = (totalSeconds - (days * 86400) - (hours * 3600)) - (minutes * 60);
  idTotalDays.textContent = addLeadingZero(days);
  idTotalHours.textContent = addLeadingZero(hours);
  idTotalMinutes.textContent = addLeadingZero(minutes);
  idTotalSeconds.textContent = addLeadingZero(seconds);
}
function clickStart() {
  timeCounterTimer = setInterval(function() {
      totalSeconds++;
      calcAndPrintTime();
    }, 1000);
}
function clickPause() {
  clearInterval(timeCounterTimer);
  saveTime();
}
function clickReset() {
  if (confirm("Reset timer to 00:00:00:00 ?") == true) {
    totalSeconds = 0;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    calcAndPrintTime();
    saveTime();
  }  
}

// Run
loadTime();
initElements();
calcAndPrintTime();
