let chess = [
  [-2, -3, -4, -5, -6, -4, -3, -2],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [2, 3, 4, 5, 6, 4, 3, 2],
];

let turn = 1;
let bufferCord = null;
let availableMoves = [];
let firstclick = [];

draw(chess);

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
        arr[j] === 2 ? `white-rook` : ``
      } ${arr[j] === -2 ? `black-rook` : ``} ${
        arr[j] === 3 ? `white-knight ` : ``
      } ${arr[j] === -3 ? `black-knight ` : ``} ${
        arr[j] === 4 ? `white-bishop ` : ``
      } ${arr[j] === -4 ? `black-bishop ` : ``}  ${
        arr[j] === 5 ? `white-queen` : ``
      } ${arr[j] === -5 ? `black-queen` : ``} ${
        arr[j] === 6 ? `white-king` : ``
      } ${
        arr[j] === -6 ? `black-king` : ``
      }" data-x="${j}" data-y="${i}" onclick="changePosition(${j},${i},${
        arr[j]
      })"></div>`;
    }
    table.appendChild(row);
  }
}

function highlightingMove(arr) {
  for (let i = 0; i < arr.length; i++) {
    let point = arr[i];
    document
      .querySelector(`.chess-block[data-x="${point.x}"][data-y="${point.y}"]`)
      .classList.toggle("possible-move");
  }
}

function changePosition(x, y, value) {
  if (availableMoves.length) {
    availableMoves.filter((e) => {
      if (e.x == x && e.y == y) {
        moveFigure(firstclick, { x, y }, availableMoves);
        availableMoves = [];
        turn *= -1;
        draw(chess);
      }
    });
    availableMoves = [];
    draw(chess);
  }
  if (!value) {
    return;
  }
  if (!(Math.sign(turn) == Math.sign(value))) {
    alert("no you turn");
    return;
  }
  firstclick = { x, y };
  if (value) {
    document
      .querySelector(`.chess-block[data-x="${x}"][data-y="${y}"]`)
      .classList.toggle("active");
  }

  switch (Math.abs(value)) {
    case 1:
      availableMoves = [...Pawn(x, y)];
      break;

    case 2:
      availableMoves = [
        ...bottom(x, y),
        ...up(x, y),
        ...right(x, y),
        ...left(x, y),
      ];
      break;

    case 3:
      availableMoves = [...horse(x, y)];
      break;

    case 4:
      availableMoves = [
        ...topLeftDiag(x, y),
        ...topRightDiag(x, y),
        ...bottomLeftDiag(x, y),
        ...bottomRightDiag(x, y),
      ];
      break;

    case 5:
      availableMoves = [
        ...bottom(x, y),
        ...up(x, y),
        ...right(x, y),
        ...left(x, y),
        ...topLeftDiag(x, y),
        ...topRightDiag(x, y),
        ...bottomLeftDiag(x, y),
        ...bottomRightDiag(x, y),
      ];
      break;

    case 6:
      availableMoves = [
        ...bottomKing(x, y),
        ...upKing(x, y),
        ...rightKing(x, y),
        ...leftKing(x, y),
        ...topLeftDiagKing(x, y),
        ...topRightDiagKing(x, y),
        ...bottomLeftDiagKing(x, y),
        ...bottomRightDiagKing(x, y),
      ];
      break;
  }
  highlightingMove(availableMoves);
}

//! Ходи Ферзь тура слон
function getVector(x, y, dx, dy) {
  let arrMoves = [];
  y += dy;
  x += dx;
  while (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
    let value = chess[y][x];
    if (Math.sign(turn) !== Math.sign(value)) {
      arrMoves.push({ x, y });
      if (value !== 0) {
        break;
      }
    } else {
      break;
    }
    y += dy;
    x += dx;
  }
  return arrMoves;
}

function up(x, y) {
  return getVector(x, y, 0, -1);
}
function right(x, y) {
  return getVector(x, y, 1, 0);
}
function left(x, y) {
  return getVector(x, y, -1, 0);
}
function bottom(x, y) {
  return getVector(x, y, 0, 1);
}
function topLeftDiag(x, y) {
  return getVector(x, y, -1, -1);
}
function topRightDiag(x, y) {
  return getVector(x, y, 1, -1);
}
function bottomLeftDiag(x, y) {
  return getVector(x, y, -1, 1);
}
function bottomRightDiag(x, y) {
  return getVector(x, y, 1, 1);
}

function moveFigure(firstclick, secondclick, moves) {
  if (moves.find((m) => m.x === secondclick.x && m.y === secondclick.y)) {
    chess[secondclick.y][secondclick.x] = chess[firstclick.y][firstclick.x];
    chess[firstclick.y][firstclick.x] = 0;
    draw(chess);
  }
}
//*

//! Ходи Коня
function horse(a, b) {
  let arrMoves = [];

  const dxs = [-2, -1, 1, 2];
  const dys = [-2, -1, 1, 2];

  for (const dx of dxs) {
    for (const dy of dys) {
      if (Math.abs(dx) !== Math.abs(dy)) {
        const nx = a + dx;
        const ny = b + dy;
        if (ny >= 0 && ny <= 7 && nx >= 0 && nx <= 7) {
          let value = chess[ny][nx];
          if (Math.sign(turn) !== Math.sign(value)) {
            x = nx;
            y = ny;
            arrMoves.push({ x, y });
          }
        }
      }
    }
  }
  return arrMoves;
}
//*

//! Ходи Короля

function getVectorKing(x, y, dx, dy) {
  let arrMoves = [];
  y += dy;
  x += dx;
  while (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
    let value = chess[y][x];
    if (Math.sign(turn) !== Math.sign(value)) {
      arrMoves.push({ x, y });
      if (value !== 0) {
        break;
      }
    } else {
      break;
    }
    y += dy;
    x += dx;
    break;
  }
  return arrMoves;
}
function upKing(x, y) {
  return getVectorKing(x, y, 0, -1);
}
function rightKing(x, y) {
  return getVectorKing(x, y, 1, 0);
}
function leftKing(x, y) {
  return getVectorKing(x, y, -1, 0);
}
function bottomKing(x, y) {
  return getVectorKing(x, y, 0, 1);
}
function topLeftDiagKing(x, y) {
  return getVectorKing(x, y, -1, -1);
}
function topRightDiagKing(x, y) {
  return getVectorKing(x, y, 1, -1);
}
function bottomLeftDiagKing(x, y) {
  return getVectorKing(x, y, -1, 1);
}
function bottomRightDiagKing(x, y) {
  return getVectorKing(x, y, 1, 1);
}
//*

// Ходи Пешок
function getVectorPawn(x, y) {
  const posiblesX = [-1, 0, 1];

  let py = y - turn;

  let arrMoves = [];

  for (px of posiblesX) {
    if (px === 0) {
      if (chess[py][x]) {
        continue;
      }

      let startPositionY = ( (7 + turn) / 2) + 2 * turn;
      if (startPositionY === y) {
        arrMoves.push({ x, y: y - 2 * turn });
      }
    }else{
		if (!chess[py][x+px]) {
			continue;
		  }
	}

	const move = { x: x + px, y: py }
    arrMoves.push(move);
  }
  console.log(arrMoves)

  return arrMoves;
}

function Pawn(x, y) {

  return getVectorPawn(x, y);
}
//*
