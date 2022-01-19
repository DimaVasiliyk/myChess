let chess = [
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
];

function draw(){
    const table = document.querySelector('#table');

    for(let i = 0; i < chess.length; i++){
        let arr = chess[i];
        const row = document.createElement('div');
        row.classList.add("chess-row")
        for(let j = 0 ; j < arr.length; j++) {
            row.innerHTML +=`<div class='chess-block' data-x="${j}" data-y="${i}"></div>`;
        }
        table.appendChild(row);
    }
    document.querySelectorAll('.chess-block').forEach(function(element){
        element.onclick = horse;
    })
}
draw();


let turn = 1;

let bufferCord = null;

function changePosition (y, x, value, ){
    if (!bufferCord) {
        if (!value) {
            return;
        }
        if (!(turn == value)) {
            alert('no you turn')
            return;
        }
        bufferCord = {
            x,
            y,
            value
        }
    } else {

        if (value == 1 || value === -1) {
            alert('this cell not empty')
            return;
        }

        if (checkDirection(bufferCord.x, bufferCord.y, x, y)) {
            ArrBoard[bufferCord.y][bufferCord.x] = 0;
            ArrBoard[y][x] = bufferCord.value;
            turn *= -1;
            drawBoard(ArrBoard)

        }
        bufferCord = null;
    }
};

function checkDirection (x1, y1, x2, y2){

    if (((x1 - x2) == 1 || (x1 - x2) == -1) && ((y1 - y2) == 0)) {
        return true
    }
    if (((y1 - y2) == 1 || (y1 - y2) == -1) && ((x1 - x2) == 0)) {
        return true
    }
    return false

};








