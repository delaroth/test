let keysPressed = {}

const addEventListeners = (ball, paddles) => {
    window.addEventListener("keydown", function(e){ keysDown(e, ball, paddles) })
    window.addEventListener('keyup', (e) => {
        for (let paddle of paddles) {
            if (e.key === paddle.controls.up || e.key === paddle.controls.down) {
                paddle.moving = false
            }
        }
        delete keysPressed[e.key];
    });
}


const keysDown = (e, ball, paddles) => {
    keysPressed[e.key] = true
    
    for (let paddle of paddles) {
        if (checkForPaddleKeysPressed(paddle, keysPressed)) {
            paddle.direction = detectPaddleDirection(paddle, keysPressed)
            paddle.moving = true
        }
    }
    
    if  (keysPressed[' ']) {
        gameStatus.started ?
        pauseGame(ball, paddles) : startGame(ball)
    }

}

const checkForPaddleKeysPressed = (paddle, keysPressed) => {
    return keysPressed[paddle.controls.up] || keysPressed[paddle.controls.down]
}
const detectPaddleDirection = (paddle, keysPressed) => {
    const desiredDirection = returnDesiredPaddleDirection(paddle, keysPressed)
    if (desiredDirection == 'up' && !hitTop(paddle)) direction = -1
    else if (desiredDirection == 'down' && !hitBottom(paddle)) direction = 1
    else direction = 0
    return direction
}

const returnDesiredPaddleDirection = (paddle, keysPressed) => {
    if (keysPressed[paddle.controls.up]&&!keysPressed[paddle.controls.down]) return 'up'
    else if (keysPressed[paddle.controls.down] && !keysPressed[paddle.controls.up]) return 'down'
    else return false
}

const hitTop = (node) => node.y <= 0

const hitBottom = (node) => node.y >= app.height - node.height













