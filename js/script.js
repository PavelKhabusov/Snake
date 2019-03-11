window.addEventListener('DOMContentLoaded', () => {
	
// Переменные //
let gameBlock = document.querySelector('.game'),
	canv = document.querySelector('.game__area'),
	ctx = canv.getContext('2d'),
	score = document.querySelector('.score__points'),
	status = document.querySelector('.game__status'),
	gameStatus = {
		win: 'YOU WIN!',
		lose: 'GAME OVER!',
		proccess: 'PLAYING...'
	},
	// Игровые настройки //
	startGame = false,
	posX = posY = 10,
	gridSize = tileCount = 20,
	appleX = appleY = Math.floor(Math.random() * tileCount),
	blockX = blockY = 5,
	xVel = yVel = 0,
	trail = [],
	tail = 1,
	points = 0;

// Функции //

function game() {
	if(startGame) status.textContent = gameStatus.proccess;

	posX += xVel;
	posY += yVel;

	if(posX < 0) posX = tileCount - 1;
	if(posX > tileCount - 1) posX = 0;
	if(posY < 0) posY = tileCount - 1;
	if(posY > tileCount - 1) posY = 0;

	ctx.fillStyle = '#30373d';
	ctx.fillRect(0, 0, canv.width, canv.height);

	ctx.fillStyle = '#c1d957';
	for(let i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
		if(startGame == true) {
			if((trail[i].x == posX && trail[i].y == posY) || (trail[i].x == blockX && trail[i].y == blockY)) {
				endGame();
			}
		}
	}

	trail.push({x: posX, y: posY});

	while(trail.length > tail) {
		trail.shift();
	}

	if(appleX == posX && appleY == posY) {
		tail++;
		appleX = appleY = Math.floor(Math.random() * tileCount);
		points++;
		score.textContent = points;
	}

	ctx.fillStyle = '#d2417c';
	ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);

	ctx.fillStyle = '#c0d0df';
	ctx.fillRect(blockX * gridSize, blockY * gridSize, gridSize - 2, gridSize - 2);
	ctx.beginPath ();
ctx.arc (100, 50, 15, 0, Math.PI * 2, false);
ctx.stoke ();
}
function endGame() {
	status.textContent = gameStatus.lose;
	startGame = false;
	posX = posY = 10;
	appleX = appleY = Math.floor(Math.random() * tileCount);
	xVel = yVel = 0;
	trail = [];
	tail = 1;
	points = 0;
	score.textContent = points;
}


// Обработчики //

document.body.addEventListener('click', (e) => {
	let target = e.target;

	if(target.classList.contains('box__btn')){
		gameBlock.classList.remove('hidden');
		target.classList.add('hidden');
	}
});

document.body.addEventListener('keydown', (e) => {
	let target = e.keyCode;

	switch(target){
		case 37: 
			xVel = -1; yVel = 0;
			startGame = true;
			break;
		case 38: 
			xVel = 0; yVel = -1;
			startGame = true;
			break;
		case 39: 
			xVel = 1; yVel = 0;
			startGame = true;
			break;
		case 40: 
			xVel = 0; yVel = 1;
			startGame = true;
			break;
	}
});

setInterval(game, 1000/10);


});
