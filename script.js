let chess = [
//   [-2, -3, -4, -5, -6, -4, -3, -2],
//   [-1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1],
//   [2, 3, 4, 5, 6, 4, 3, 2],
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


function figures(x, y, value){
	switch(value) {
		case 1 || -1:
			alert( 'Маловато' );
			break;
	  
		case 2 || -2:
			alert( 'Маловато' );
			break;
	  
		case 3 || -3:
			alert( 'Маловато' );
			break;
				
		case 4 || -4:
			alert( 'Маловато' );
			break;
			
		case 5 || -5:
			alert( 'Маловато' );
			break;
			
		case 6 || -6:
			alert( 'Маловато' );
			break;




	  }
}



function changePosition(x, y, value) {
	if(value == 1 || value == -1){
		
	}
	if(value == 2 || value == -2){
		
	}
	if(value == 3 || value == -3){
		
	}
	if(value == 4 || value == -4){
		
	}
	if(value == 5 || value == -5){
		
	}
	if(value == 6 || value == -6){
		
	}


  if (availableMoves.length){
		availableMoves.filter(e =>{
			if(e.x == x && e.y == y){
				moveFigure(firstclick, { x, y }, availableMoves);
				availableMoves = [];
				turn *= -1;
				draw(chess);
			}
		})
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
}

function getVector(x, y, dx, dy) {
  let arrMoves = [];
  y += dy;
  x += dx;
  while (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
    let value = chess[y][x];
    if (Math.sign(turn) !== Math.sign(value)) {
      arrMoves.push({ x, y });
      document
        .querySelector(`.chess-block[data-x="${x}"][data-y="${y}"]`)
        .classList.toggle("possible-move");
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
