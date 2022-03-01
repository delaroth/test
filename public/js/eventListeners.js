let keysPressed = {}
let spaceBarHeld = false

const addEventListeners = (ball, paddles) => {
    window.addEventListener("keydown", function(e){ keysDown(e, ball, paddles) })
    window.addEventListener('keyup', (e) => {
        for (let paddle of paddles) {
            if ((e.key === paddle.controls.up && !keysPressed[paddle.controls.down]) || (e.key === paddle.controls.down && !keysPressed[paddle.controls.up])) {
                paddle.moving = false
            }
            if (e.key=== ' ') spaceBarHeld = false
        }
        delete keysPressed[e.key];
    });
    // window.addEventListener('resize', function(){ adjustAppSize(ball, paddles) } );
}


const keysDown = (e, ball, paddles) => {
    keysPressed[e.key] = true
    
    for (let paddle of paddles) {
        if (checkForPaddleKeysPressed(paddle, keysPressed)) {
            paddle.direction = setPaddleDirection(paddle, keysPressed)
            paddle.moving = true
        }
    }
    
    if  (keysPressed[' '] && !spaceBarHeld) {
        gameStatus.started ?    
        pauseGame(ball, paddles) : startGame(ball)
        spaceBarHeld = true       
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



// const adjustAppSize = (ball, paddles) => {
//     app.height = window.innerHeight
//     app.width = window.innerWidth
//     ball.height = app.height / 50
//     ball.x = app.width / 2 
//     ball.y = app.height / 2  
//     console.log(paddles)
//     for (let paddle of paddles) {
//         paddle.width= window.innerHeight/70,
//         paddle.height = window.innerHeight / 7
//     }
//     paddles[0].y = app.height / 2 - app.height / 14
//     paddles[1].x = app.width - app.height / 70 - 20
//     paddles[1].y = app.height / 2 - app.height / 14
// }
















