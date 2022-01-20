let chess = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  // [ -1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 5, 0, 0, 0],
  // [ 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 5],
];

function draw(board) {
  const table = document.querySelector("#table");
  table.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    let arr = board[i];
    const row = document.createElement("div");
    row.classList.add("chess-row");
    for (let j = 0; j < arr.length; j++) {
      row.innerHTML += `<div class="chess-block ${
        arr[j] === 1 ? `white-pawn` : ``
      } ${arr[j] === -1 ? `black-pawn` : ``} ${
        arr[j] === 5 ? `white-queen` : ``
      } ${
        arr[j] === -5 ? `black-queen` : ``
      }" data-x="${j}" data-y="${i}" onclick=changePosition(${i},${j},${
        arr[j]
      })></div>`;
    }
    table.appendChild(row);
  }
}

let bufferCord = null;

function changePosition(y, x, value) {
  if (!bufferCord) {
    if (!value) {
      return;
    }

    bufferCord = {
      x,
      y,
      value,
    };
    // bottom(x,y)
    up(x,y)
    // right(x,y)
    // left(x,y)
    topLeftDiag(x, y);
    // topRightDiag(x,y)
    // bottomLeftDiag(x,y)
    // bottomRightDiag(x,y)
  } else {
    if (value == 5 || value === -5) {
      alert("this cell not empty");
      return;
    }

    if (checkDirectionQeen(bufferCord.x, bufferCord.y, x, y)) {
      chess[bufferCord.y][bufferCord.x] = 0;
      chess[y][x] = bufferCord.value;
      draw(chess);
    }
    bufferCord = null;
  }
}

function checkDirectionQeen(x1, y1, x2, y2) {
  if ((x1 - x2 == 1 || x1 - x2 == -1) && y1 - y2 == 0) {
    return true;
  }
  if ((y1 - y2 == 1 || y1 - y2 == -1) && x1 - x2 == 0) {
    return true;
  }
  // if (((x1 - x2) == 1 || (x1 - x2) == -1) && ((y1 - y2) == 1)) {
  //     return true
  // }
  // if (((y1 - y2) == 1 || (y1 - y2) == -1) && ((x1 - x2) == -1)) {
  //     return true
  // }
  return false;
}

draw(chess);

function bottom(x, y) {
  for (y; y < 8; y) {
    document
      .querySelector(`.chess-block[data-x="${x}"][data-y="${y++}"]`)
      .classList.add("possible-move");
  }
}

function getVector(x, y, dx, dy){
    while(y >= 0 && y <= 7 && x >=0 && x <= 7){
        document
            .querySelector(`.chess-block[data-x="${x}"][data-y="${y}"]`)
            .classList.add("possible-move");
        y += dy;
        x += dx;
    }
}



function up(x, y) {
    getVector(x,y,0,-1);
}

function right(x, y) {
  for (x; x < 8; x) {
    document
      .querySelector(`.chess-block[data-x="${x++}"][data-y="${y}"]`)
      .classList.add("possible-move");
  }
}
function left(x, y) {
  for (x; x >= 0; x) {
    document
      .querySelector(`.chess-block[data-x="${x--}"][data-y="${y}"]`)
      .classList.add("possible-move");
  }
}
function topLeftDiag (x, y) {
    getVector(x,y,-1,-1);
}

// function topLeftDiag(cx, cy) {
//   let y = cy - 1;
//   let x = cx - 1;
//   while (x >= 0) {
//     const elem = document.querySelector(
//       `.chess-block[data-x="${x}"][data-y="${y}"]`
//     );
//     console.log(elem);
//     elem.classList.add("possible-move");
//     console.log({ x, y });
//     x--;
//     y--;
//   }
// }

// function topRightDiag(x,y){
//     for(x; x <8 ; x){
//         for( y; y >= 0 ; y){
//             document.querySelector(`.chess-block[data-x="${++x}"][data-y="${--y}"]`).classList.add('possible-move');
//             console.log(x,"x");
//             console.log(y, "y");
//         }
//     }
// }
// function bottomLeftDiag(x,y){
//     for( x; x >= 0 ; x){
//         document.querySelector(`.chess-block[data-x="${x--}"][data-y="${y++}"]`).classList.add('possible-move');
//     }
// }
// function bottomRightDiag(x,y){
//     for( y; y < 8; y){
//         document.querySelector(`.chess-block[data-x="${x++}"][data-y="${y++}"]`).classList.add('possible-move');
//     }
// }

//         for( y; y <= 7; y ){
//         document.querySelector(`.chess-block[data-x="${x++}"][data-y="${y++}"]`).classList.add('possible-move');
// }
