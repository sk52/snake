import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

export function main(currentTime) {
    if (outsideGrid(getSnakeHead()) || snakeIntersection()) {
        gameOver = true;
    }
    if (gameOver) {
        if (confirm('You lost. Press OK to restart.')) {
            window.location.reload();
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Render');
    lastRenderTime = currentTime;

    update();
    draw();
}

function update() {
    updateSnake();
    updateFood();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
