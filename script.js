// Your code here
const table = document.querySelector('table');
let inputRowNumber = document.querySelector('#input-row-number');
// let rowNumber = inputRowNumber.value;
const addBtn = document.querySelector('#add-row');

function makeRow() {
  let rowNumber = inputRowNumber.value;
  const tableRow = document.createElement('tr');
  while (rowNumber > 0) {
    let tableData = document.createElement('td');
    tableRow.appendChild(tableData);
    rowNumber--;
  }
  table.appendChild(tableRow);
}

addBtn.addEventListener('click', makeRow);
makeRow();
makeRow();

function colorize(e) {
  e.target.classList.toggle(color);
}

table.addEventListener('click', colorize);

let selectColor = document.querySelector('select');
let color = 'red';

function colorChoose(e) {
  color = e.target.value;
  console.log(color);
}

selectColor.addEventListener('change', colorChoose);

inputRowNumber.addEventListener('change', changeRowNumber);

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
