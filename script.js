let chess = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, -5, 0, 0, 0, 0],
	// [ -1, -1, -1, -1, -1, -1, -1, -1],
	[0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 5, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	// [ 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 1, 0, 0, 0, 0, 0, 0],
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
					arr[j] === 5 ? `white-queen` : ``
				} ${
					arr[j] === -5 ? `black-queen` : ``
				}" data-x="${j}" data-y="${i}" onclick="changePosition(${i},${j},${
					arr[j]
				})"></div>`;
			}
		table.appendChild(row);
	}
}




function changePosition(y, x, value) {
	if (availableMoves.length) {
		moveFigure({ x, y , value}, availableMoves);
		availableMoves= [];
		turn *= -1;
		;
		return;
	}
	if (!value) {
		return;
	}
	if (!(Math.sign(turn) == Math.sign(value))) {
		alert('no you turn')
		return;
	}
	firstclick = {x,y,value};
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
		// console.log(chess[firstclick.y][firstclick.x],'tut');
	chess[firstclick.y][firstclick.x] = 0
		// console.log(chess[firstclick.y][firstclick.x]);
}

function getVector(x, y, dx, dy) {
	let arrMoves = [];
	while (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
		document
		.querySelector(`.chess-block[data-x="${x}"][data-y="${y}"]`)
		.classList.toggle("possible-move");
		y += dy;
		x += dx;
		arrMoves.push({ x, y });
	}
	return arrMoves;
}


function barriersFigure(availableMoves){
let checkMoves = availableMoves.value
	if(checkMoves == 0){
		console.log(1);
		return availableMoves;
	}
	return availableMoves;
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


function moveFigure(firstclick, moves) {
	if (moves.find((m) => m.x === firstclick.x && m.y === firstclick.y)) {
		// if(){
		console.log(firstclick.value);
		// }
		chess[firstclick.y][firstclick.x] = 5;
		draw(chess);
	}
}
