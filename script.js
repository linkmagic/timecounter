let totalSeconds = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
let statisticsJson = [];
let idTotalDays, idTotalHours, idTotalMinutes, idTotalSeconds, idStatisticsRoot, idStartBtn, idStopBtn, idResetBtn;
let currentTimeStart, currentTimeStop;
let isStarted = false;

function loadTime() {
  const lsTotSec = window.localStorage.getItem('totalSeconds');
  const lsStat = window.localStorage.getItem('statistics')
  totalSeconds = lsTotSec ? parseInt(lsTotSec) : 0;
  statisticsJson = lsStat ? JSON.parse(lsStat) : [];
}

function saveTime() {
  window.localStorage.setItem('totalSeconds', totalSeconds);
  window.localStorage.setItem('statistics', JSON.stringify(statisticsJson));
}

function initElements() {
  idTotalDays = document.getElementById('idTotalDays');
  idTotalHours = document.getElementById('idTotalHours');
  idTotalMinutes = document.getElementById('idTotalMinutes');
  idTotalSeconds = document.getElementById('idTotalSeconds');
  idStatisticsRoot = document.getElementById('idStatisticsRoot');
  idStartBtn = document.getElementById('idStartBtn');
  idStopBtn = document.getElementById('idStopBtn');
  idResetBtn = document.getElementById('idResetBtn');
}

function applyUISettings() {
  idStopBtn.classList.toggle('disabledElement');
}

function renderStatistics() {
  idStatisticsRoot.innerHTML = '';
  for (let statItem in statisticsJson) {
    const newStatItemNode = document.createElement('div');
    newStatItemNode.classList.add('statTableItem');

    const newSataValueStartItem = document.createElement('div');
    newSataValueStartItem.textContent = statisticsJson[statItem].start;
    const newSataValueStopItem = document.createElement('div');
    newSataValueStopItem.textContent = statisticsJson[statItem].stop;

    newStatItemNode.appendChild(newSataValueStartItem);
    newStatItemNode.appendChild(newSataValueStopItem);

    idStatisticsRoot.appendChild(newStatItemNode);
  }
}

function renderDateTimeStr(timeStampValue) {
  const dateParsed = new Date(timeStampValue);
  return `${dateParsed.getFullYear()}/${addLeadingZero(dateParsed.getMonth()+1)}/${addLeadingZero(dateParsed.getDate())} - ${addLeadingZero(dateParsed.getHours())}:${addLeadingZero(dateParsed.getMinutes())}:${addLeadingZero(dateParsed.getSeconds())}`;
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
  if (isStarted) {
    return;
  }
  isStarted = true;
  currentTimeStart = Date.now();
  idStartBtn.classList.toggle('disabledElement');
  idStopBtn.classList.toggle('disabledElement');
  idResetBtn.classList.toggle('disabledElement');
}

function clickPause() {
  if (!isStarted) {
    return;
  }
  isStarted = false;
  currentTimeStop = Date.now();
  const timeDelta = (currentTimeStop - currentTimeStart) / 1000;
  totalSeconds += Math.floor(timeDelta);
  statisticsJson.push({
    start: renderDateTimeStr(currentTimeStart),
    stop: renderDateTimeStr(currentTimeStop)
  });
  idStartBtn.classList.toggle('disabledElement');
  idStopBtn.classList.toggle('disabledElement');
  idResetBtn.classList.toggle('disabledElement');
  saveTime();
  calcAndPrintTime();
  renderStatistics();
}

function clickReset() {
  if (isStarted) {
    return;
  }
  if (confirm("Reset timer to 00:00:00:00 ?") == true) {
    statisticsJson = [];
    totalSeconds = 0;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    calcAndPrintTime();
    saveTime();
    renderStatistics();
  }  
}

// Run
loadTime();
initElements();
calcAndPrintTime();
renderStatistics();
applyUISettings();
