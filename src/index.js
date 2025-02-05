let rootEl = document.getElementById('root');
let score = document.getElementById('score');
let restartButton = document.getElementById('restart-button')

let gameOverText = document.getElementById('game-over-text');

score.innerText = "Score: 0"

const width = 16;
const height = 16;

const gap = 1;

const numOfCells = width * height;

let cellWidth = 28;
let cellHeight = 28;
let cellColor = 'rgb(10,80,80)'

let cells = Array(numOfCells);

let cell = document.createElement('div');

cell.classList.add('cell');
cell.style = `
    width: ${cellWidth}px;
    height: ${cellHeight}px;
    background-color: ${cellColor};`

rootEl.appendChild(cell);

let inner = rootEl.innerHTML;
let htmlString = '';

rootEl.innerHTML = '';


for(let i = 0; i < numOfCells; i++) {
    htmlString += inner;

}


rootEl.innerHTML = htmlString

rootEl.style = `
    display: grid;
    grid-template-columns: repeat(${width}, 1fr);
    gap: ${gap}px;
    grid-auto-rows: minmax(${gap}px, auto);
`

//begin game

let playerX = 4;
let playerY = 4;

let playerLength = 1;

let playerDirX = 1;
let playerDirY = 0;


let foodX = randomInt(width);
let foodY = randomInt(height);

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
}

let segmentIndexes = [];

let gameOver = false;

function loop() {
    //rootEl.innerHTML = htmlString

    if(playerX < 0) {
        playerX = width - 1;
    }
    if(playerX > width - 1) {
        playerX = 0;
    }

    if(playerY < 0) {
        playerY = height - 1;
    }
    if(playerY > height - 1) {
        playerY = 0;
    }

    let playerIndex = playerY * width + playerX;

    let foodIndex = foodY * width + foodX;
    
    if(playerIndex === foodIndex) {
        foodX = randomInt(width);
        foodY = randomInt(height);

        playerLength++;
        score.innerText = "Score: " + (playerLength - 1);
    }

    rootEl.children[foodIndex].style.backgroundColor = "red";
    rootEl.children[playerIndex].style.backgroundColor = "#aaa";
    rootEl.children[playerIndex].active = true;

    if(keys.up === true) {
        playerDirY = -1;
        playerDirX = 0;
    }

    if(keys.down === true) {
        playerDirY = 1;
        playerDirX = 0;
    }

    if(keys.left === true) {
        playerDirY = 0;
        playerDirX = -1;
    }

    if(keys.right === true) {
        playerDirY = 0;
        playerDirX = 1;
    }

    let playerNextIndex = (playerY + playerDirY) * width + (playerX + playerDirX);

    if(rootEl.children[playerNextIndex].active == true) {
        gameOver = true;
        console.log('game over')
        restartButton.style.display = "block";
        gameOverText.style.display = "block";
    }

    

    if(!gameOver) {
        playerX += playerDirX;
        playerY += playerDirY;
        segmentIndexes.push(playerIndex)
        rootEl.children[segmentIndexes[segmentIndexes.length - playerLength - 1]].style.backgroundColor = cellColor;
        rootEl.children[segmentIndexes[segmentIndexes.length - playerLength - 1]].active = false;
    }
    

    //console.log(segmentIndexes)
}
    


restartButton.addEventListener('click', (e) => {
    rootEl.innerHTML = htmlString;
    gameOver = false;
    gameOverText.style.display = "none";
    playerX = 4;
    playerY = 4;

    playerLength = 1;

    playerDirX = 1;
    playerDirY = 0;


    foodX = randomInt(width);
    foodY = randomInt(height);



    segmentIndexes = [];
    playerNextIndex = 0;
    restartButton.style.display = "none";
    score.innerText = "Score: 0";

    gameOver = false;
})

document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        keys.up = true
    }

    if(e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        keys.down = true
    }

    if(e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.left = true
    }

    if(e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.right = true
    }
});


document.addEventListener('keyup', (e) => {
    if(e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        keys.up = false
    }

    if(e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        keys.down = false
    }

    if(e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.left = false
    }

    if(e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.right = false
    }
})

setInterval(loop, 100);



function randomInt(max) {
    return Math.floor(Math.random() * max);
}



/*
//number each cell
for(let i = 0; i < rootEl.children.length; i++) {
    rootEl.children[i].innerText = i + 1;

}
*/