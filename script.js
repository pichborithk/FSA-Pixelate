const table = document.querySelector('table');
const inputRowNumber = document.querySelector('#input-row-number');
const addBtn = document.querySelector('#add-row');
const selectColor = document.querySelector('select');
const paintAllBtn = document.querySelector('#paint-all');
const fillAllBtn = document.querySelector('#fill-all');
const clearBtn = document.querySelector('#clear');
let color = 'red';
let isMouseDown = false;
let eraserMode = false;

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
  if (color === 'eraser') {
    event.target.className = '';
  } else if (event.target.classList.value === color) {
    event.target.className = '';
  } else {
    event.target.className = '';
    event.target.classList.add(color);
  }
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
  let rowNumber = inputRowNumber.value <= 20 ? inputRowNumber.value : 20;
  if (!currentTablesRow) {
    return;
  }
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
  //Set class "no class" before assigning new class color
  //This will allow classes that would have been otherwise overruled by specificity to replace the existing class
  allTd.forEach((td) => (td.className = ''));
  allTd.forEach((td) => td.classList.add(color));
}

function fillAll() {
  const allTd = document.querySelectorAll('td');
  allTd.forEach((td) => {
    if (!td.className || td.className === 'eraser') {
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
makeRow();
makeRow();
makeRow();

addBtn.addEventListener('click', makeRow);

table.addEventListener('mousedown', (event) => {
  if (event.target.className === color) {
    eraserMode = true;
  }
  isMouseDown = true;
});

table.addEventListener('mouseup', () => {
  isMouseDown = false;
  eraserMode = false;
});

table.addEventListener('mouseover', (event) => {
  if (isMouseDown && event.target.classList.value !== color && !eraserMode) {
    colorize(event);
  } else if (
    isMouseDown &&
    event.target.classList.value === color &&
    eraserMode
  ) {
    event.target.className = '';
  }
});

//Changed click event to mousdeown event, and removed colorize from mousedown function. This allows us to reclick colors to deselect that color, while still letting the drag to paint function work
table.addEventListener('mousedown', colorize);

selectColor.addEventListener('change', colorChoose);

inputRowNumber.addEventListener('change', changeRowNumber);

paintAllBtn.addEventListener('click', paintAll);

fillAllBtn.addEventListener('click', fillAll);

clearBtn.addEventListener('click', clearAll);
