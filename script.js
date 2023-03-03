const table = document.querySelector('table');
const inputRowNumber = document.querySelector('#input-row-number');
const addBtn = document.querySelector('#add-row');
const selectColor = document.querySelector('select');
const paintAllBtn = document.querySelector('#paint-all');
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

function changeRowNumber2() {
  const currentTablesRow = document.querySelectorAll('tr');
  if (!currentTablesRow) {
    return;
  }
  let rowNumber = inputRowNumber.value;
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

function changeRowNumber() {
  const currentTr = document.querySelectorAll('tr');
  //Added if statement so that if player manually entered a number higher than 20, 20 would still remain as the max value of columns
  if (inputRowNumber.value <= 20) {
    rowNumber = inputRowNumber.value;
  } else rowNumber = 20;
  let previousRowCount = currentTr[0].children.length;
  //if adding columns
  if (rowNumber > previousRowCount) {
    let numberAdded = rowNumber - previousRowCount;
    for (row of currentTr) {
      for (let i = 0; i < numberAdded; i++) {
        let td = document.createElement('td');
        row.appendChild(td);
      }
    }
    //if removing columns
  } else {
    let numberSubtracted = previousRowCount - rowNumber;
    for (let i = 0; i < currentTr.length; i++) {
      for (let j = 0; j < numberSubtracted; j++) {
        let childToDelete = currentTr[i].children[0];
        currentTr[i].removeChild(childToDelete);
      }
      console.log(previousRowCount - rowNumber);
    }

    //   console.log(rowNumber);
  }
}

function paintAll() {
  const allTd = document.querySelectorAll('td');
  allTd.forEach((td) => td.classList.add(color));
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

inputRowNumber.addEventListener('change', changeRowNumber2);

paintAllBtn.addEventListener('click', paintAll);
