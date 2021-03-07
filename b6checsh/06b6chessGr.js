var frameWidth = window.innerWidth;
var frameHeight = window.innerHeight;

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

function removeClasses() {
  let elements = document.getElementsByClassName("chesspiece whitepiece rook");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" rook", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece rook");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" rook", "");
  }
  elements = document.getElementsByClassName("chesspiece whitepiece knight");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" knight", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece knight");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" knight", "");
  }
  elements = document.getElementsByClassName("chesspiece whitepiece bishop");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" bishop", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece bishop");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" bishop", "");
  }
  elements = document.getElementsByClassName("chesspiece whitepiece queen");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" queen", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece queen");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" queen", "");
  }
  elements = document.getElementsByClassName("chesspiece whitepiece king");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" king", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece king");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" king", "");
  }
  elements = document.getElementsByClassName("chesspiece whitepiece pawn");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" pawn", "");
  }
  elements = document.getElementsByClassName("chesspiece blackpiece pawn");
  if (consoleLogData) console.log(elements);
  for (let ii = elements.length - 1; ii >= 0; ii--) {
    elements[ii].className = elements[ii].className.replace(" pawn", "");
  }
}

let initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function checkStartPosition(fen0) {
  if (fen0 === undefined) return initialPosition;
  if (fen0 === null) return initialPosition;
  if (fen0 === "") return initialPosition;

  let index = fen0.indexOf(" ");
  let fen = fen0.substring(0, index);

  let r = fen.match(/r/g).length;
  let n = fen.match(/n/g).length;
  let b = fen.match(/b/g).length;
  let q = fen.match(/q/g).length;
  let k = fen.match(/k/g).length;
  let p = fen.match(/p/g).length;
  let R = fen.match(/R/g).length;
  let N = fen.match(/N/g).length;
  let B = fen.match(/B/g).length;
  let Q = fen.match(/Q/g).length;
  let K = fen.match(/K/g).length;
  let P = fen.match(/P/g).length;

  if (k > 1 || K > 1 || p > 8 || P > 8) return initialPosition;
  if (r + n + b + q + p > 15 || R + N + B + Q + P > 15) return initialPosition;

  if (r > 2) r = r - 2
  else r = 0;
  if (n > 2) n = n - 2;
  else n = 0;
  if (b > 2) b = b - 2;
  else b = 0;
  if (q > 1) q = q - 1;
  else q = 0;
  if (R > 2) R = R - 2;
  else R = 0;
  if (N > 2) N = n - 2;
  else N = 0;
  if (B > 2) B = B - 2;
  else B = 0;
  if (Q > 1) Q = Q - 1;
  else Q = 0;

  if (r + n + b + q + p > 8 || R + N + B + Q + P > 8) return initialPosition;

  return fen0;
}