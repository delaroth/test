let keysPressed = {}

const addEventListeners = (ball, paddle1, paddle2) => {
    window.addEventListener("keydown", function(e){ keysDown(e, ball, paddle1, paddle2) })
    window.addEventListener('keyup', (e) => {delete keysPressed[e.key];});
}


const keysDown = (e, ball, paddle1, paddle2) => {
    keysPressed[e.key] = true

    if (detectPaddle1Movement(paddle1, keysPressed)) {
        const direction = detectPaddleDirection(keysPressed)
        movePaddle(paddle1, direction)
    }
    
    if (detectPaddle2Movement(paddle2, keysPressed)) {
        const direction = detectPaddleDirection(keysPressed)
        movePaddle(paddle2, direction)
    }

    if (keysPressed[' ']) {
        gameStatus.started ?
        pauseGame(ball, paddle1, paddle2) : startGame(ball)
    }

 }
    

const detectPaddle1Movement = (paddle1, keysPressed) => {
    return keysPressed['w'] && paddle1.y >= 0 ||
           keysPressed['s'] && paddle1.y < app.height - paddle1.height
}


const detectPaddle2Movement = (paddle2, keysPressed) => {
    return keysPressed['ArrowUp'] && paddle2.y >= 0 ||
           keysPressed['ArrowDown'] && paddle2.y <= app.height - paddle2.height
}




const detectPaddleDirection = (keysPressed) => {
    const direction = (keysPressed['w'] && !keysPressed['s']) ||
                      (keysPressed['ArrowUp'] && !keysPressed['ArrowDown']) ? -1 : 1
    return direction
}


const movePaddle = (paddle, direction) => paddle.y += paddle.paddleSpeed*direction






