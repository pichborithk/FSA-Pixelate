const table = document.querySelector('table');
const inputRowNumber = document.querySelector('#input-row-number');
const addBtn = document.querySelector('#add-row');
const selectColor = document.querySelector('select');
const paintAllBtn = document.querySelector('#paint-all');
const fillAllBtn = document.querySelector('#fill-all');
const clearBtn = document.querySelector('#clear');
let color = 'red';
let isMouseDown = false;

function makeRow() {
  let rowNumber = inputRowNumber.value;
  const tableRow = document.createElement('tr');
  while (rowNumber > 0) {
    const td = document.createElement('td');
    tableRow.appendChild(td);
    rowNumber--;
  }
  table.appendChild(tableRow);
}

function colorize(event) {
  // event.target.classList.toggle(color);
  event.target.classList.add(color);
}

function colorChoose(event) {
  color = event.target.value;
}

function increaseRowNumber(tablesRow) {
  tablesRow.forEach((row) => {
    const td = document.createElement('td');
    row.appendChild(td);
  });
}

function decreaseRowNumber(tablesRow) {
  tablesRow.forEach((row) => {
    row.removeChild(row.lastChild);
  });
}

function changeRowNumber() {
  const currentTablesRow = document.querySelectorAll('tr');
  let rowNumber = inputRowNumber <= 20 ? inputRowNumber : 20;
  if (!currentTablesRow) {
    return;
  }
  // if (inputRowNumber.value <= 20) {
  //   rowNumber = inputRowNumber.value;
  // } else {
  //   rowNumber = 20;
  // }
  let currentRowNumber = currentTablesRow[0].children.length;
  // use while loop to compare rowNumber and currentRowNumber like this it makes us write less code because we don't need use if
  while (rowNumber > currentRowNumber) {
    increaseRowNumber(currentTablesRow);
    rowNumber--;
  }
  while (rowNumber < currentRowNumber) {
    decreaseRowNumber(currentTablesRow);
    rowNumber++;
  }
}

function paintAll() {
  const allTd = document.querySelectorAll('td');
  allTd.forEach((td) => td.classList.add(color));
}

function fillAll() {
  const allTd = document.querySelectorAll('td');
  allTd.forEach((td) => {
    if (!td.className) {
      td.classList.add(color);
    }
  });
}

function clearAll() {
  const allTd = document.querySelectorAll('td');
  allTd.forEach((td) => (td.className = ''));
}

makeRow();
makeRow();

addBtn.addEventListener('click', makeRow);

table.addEventListener('mousedown', () => {
  isMouseDown = true;
});

table.addEventListener('mouseup', () => {
  isMouseDown = false;
});

table.addEventListener('mouseover', (event) => {
  if (isMouseDown) {
    colorize(event);
  }
});

table.addEventListener('click', colorize);

selectColor.addEventListener('change', colorChoose);

inputRowNumber.addEventListener('change', changeRowNumber);

paintAllBtn.addEventListener('click', paintAll);

fillAllBtn.addEventListener('click', fillAll);

clearBtn.addEventListener('click', clearAll);
