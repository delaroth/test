let keysPressed = {}

const addEventListeners = () => {
    app.canvas.addEventListener("keydown", keysPressed)
    app.canvas.addEventListener('keyup', (e) => {
        delete keysPressed[e.key];
    });
}


const keysPressed = (e) => {
    keysPressed[e.key] = true
    if (keysPressed['w'] && paddle1.y >= 0) {
       paddle1.y -= paddle1.paddleSpeed	
    }
    else if (keysPressed['s'] && paddle1.y < app.height - paddle1.height) {
    paddle1.y += paddle1.paddleSpeed
    }
    if (keysPressed['ArrowUp']&& paddle2.y >= 0) {
    paddle2.y -= paddle2.paddleSpeed
    }
    else if (keysPressed['ArrowDown'] && paddle2.y <= app.height-paddle2.height) {
    paddle2.y += paddle2.paddleSpeed
    }

    if (keysPressed[' ']&&!gameStatus.started) {
startGame(ball)
    }
    else if (keysPressed[' ']) {
    pauseGame(ball, paddle1, paddle2)
    }
    }




