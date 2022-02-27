let keysPressed = {}

const addEventListeners = (ball, paddles) => {
    window.addEventListener("keydown", function(e){ keysDown(e, ball, paddles) })
    window.addEventListener('keyup', (e) => {
        for (let paddle of paddles) {
            if ((e.key === paddle.controls.up && !keysPressed[paddle.controls.down]) || (e.key === paddle.controls.down && !keysPressed[paddle.controls.up])) {
                console.log('stop moving')
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
            paddle.direction = setPaddleDirection(paddle, keysPressed)
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


const setPaddleDirection = (paddle, keysPressed) => {
    if (keysPressed[paddle.controls.up]&&!keysPressed[paddle.controls.down]) return 'up'
    else if (keysPressed[paddle.controls.down] && !keysPressed[paddle.controls.up]) return 'down'
    else return null
}

const hitTop = (node) => node.y <= 0

const hitBottom = (node) => node.y >= app.height - node.height















