// Your code here
const table = document.querySelector("table");
// let tr = document.createElement('tr');
// let td = document.createElement('td');
let rowNumber = 20;
const addBtn = document.querySelector("#add-row");
let tr;

function addTd(num) {
  tr = document.createElement("tr");
  while (num > 0) {
    let td = document.createElement("td");
    tr.appendChild(td);
    // console.log(tr);
    num--;
  }
  return tr;
}

function makeRow() {
  table.appendChild(addTd(rowNumber));

  //   addTd(rowNumber);
}

addBtn.addEventListener("click", makeRow);
makeRow();
makeRow();

function colorize(e) {
  e.target.classList.toggle(color);
}

table.addEventListener("click", colorize);

let selectColor = document.querySelector("select");
let color = "red";

function colorChoose(e) {
  color = e.target.value;
  console.log(color);
}

selectColor.addEventListener("change", colorChoose);
