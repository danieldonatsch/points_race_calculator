let participants = {};
let numbers = [];
let lap = 1;
let history = [];

function initRace() {
  const input = document.getElementById('startNumbers').value;
  numbers = input.split(',').map(n => n.trim()).filter(n => n);
  participants = {};
  numbers.forEach(num => participants[num] = 0);
  lap = 1;
  history = [];
  updatePointsTable();
  updateHistoryTable();
  document.getElementById('raceControls').style.display = 'block';
  document.getElementById('errorMsg').textContent = '';
  updateLapNumber();
}

function addSprint(event) {
  event.preventDefault();
  const firstInput = document.getElementById('firstPlaceInput');
  const secondInput = document.getElementById('secondPlaceInput');
  const first = firstInput.value.trim();
  const second = secondInput.value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';

  if (!numbers.includes(first)) {
    errorMsg.textContent = "1st place number not found!";
    return;
  }
  if (!numbers.includes(second)) {
    errorMsg.textContent = "2nd place number not found!";
    return;
  }
  if (first === second) {
    errorMsg.textContent = "1st and 2nd place cannot be the same!";
    return;
  }

  participants[first] += 2;
  participants[second] += 1;
  history.push({
    lap: lap,
    first: first,
    second: second
  });

  updatePointsTable();
  updateHistoryTable();

  // clear inputs and advance lap
  firstInput.value = '';
  secondInput.value = '';
  lap += 1;
  updateLapNumber();

  // jump cursor back to the first place input
  firstInput.focus();
}

function updateLapNumber() {
  document.getElementById('lapNumber').textContent = "Lap: " + lap;
}
function updatePointsTable() {
  const tbody = document.getElementById('pointsTable').querySelector('tbody');
  tbody.innerHTML = '';
  
  // Create array of number/points pairs and sort by points descending
  const sortedEntries = numbers.map(num => ({
    number: num,
    points: participants[num]
  })).sort((a, b) => b.points - a.points);

  // Create table rows in sorted order
  sortedEntries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.number}</td><td>${entry.points}</td>`;
    tbody.appendChild(row);
  });
}

function updateHistoryTable() {
  const tbody = document.getElementById('historyTable').querySelector('tbody');
  tbody.innerHTML = '';
  history.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.lap}</td><td>${entry.first}</td><td>${entry.second}</td>`;
    tbody.appendChild(row);
  });
}
