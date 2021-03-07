var frameWidth = window.innerWidth;
var frameHeight = window.innerHeight;

document.documentElement.style.setProperty('--innerwidth', frameWidth + "px");
document.documentElement.style.setProperty('--innerheight', frameHeight + "px");

let startColumnCode = 'a'.charCodeAt(0);
let columnSignsName = "columnSigns";

function setColumnSigns(startColumnCode) {
  if (consoleLogData) console.log('-setColumnSigns:');
  eval(`${columnSignsName} = []`);
  for (let ii = 0; ii < 8; ii++) {
    eval(`${columnSignsName}[ii] = String.fromCharCode(startColumnCode + ii)`);
  }
  if (consoleLogData) console.log(columnSigns);
  if (consoleLogData) console.log('----------------');
}
setColumnSigns(startColumnCode);

let boardsquaresName = "s";
let hsquaresName = "h";
let squares = [];
let highlights = [];

function setSquaresArray() {
  if (consoleLogData) console.log('-setSquaresArray:');
  let s = "";
  for (let ii = 0; ii < 8; ii++) {
    let brow = [];
    let hrow = [];
    for (let jj = 0; jj < 8; jj++) {
      brow.push(document.getElementById(boardsquaresName + ii + '-' + jj));
      hrow.push(document.getElementById(hsquaresName + ii + '-' + jj));
    }
    squares.push(brow);
    highlights.push(hrow);
  }
  if (consoleLogData) console.log(squares);
  if (consoleLogData) console.log(highlights);
  if (consoleLogData) console.log('----------------');
}
setSquaresArray();