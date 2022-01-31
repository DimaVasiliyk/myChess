 function horse(x,y){
    if(+ x + 2 < 8 && + y + 1 < 8 ){
        document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y+1}"]`).classList.add('active');
    }   
    if(+ x + 2 < 8 && + y - 1 >= 0){
        document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y-1}"]`).classList.add('active');
    }
    if(+ x - 2 >= 0 && + y + 1 < 8){
        document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y+1}"]`).classList.add('active');
    }
    if(+ x - 2 >= 0 && + y - 1 >= 0){
        document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y-1}"]`).classList.add('active');
    }
    if(+ x + 1 < 8 && + y + 2 < 8){
        document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y+2}"]`).classList.add('active');
    }
    if(+ x - 1 >= 0 && + y + 2 < 8){
        document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y+2}"]`).classList.add('active');
    }
    if(+ x - 1  >= 0 && + y - 2  >= 0){
        document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y-2}"]`).classList.add('active');
    }
    if(+x+1 < 8 && +y-2 >= 0){
        document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y-2}"]`).classList.add('active');
    }
}

export {horse}