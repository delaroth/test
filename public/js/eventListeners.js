let keysPressed = {}

const addEventListeners = (ball, paddle1, paddle2) => {
    window.addEventListener("keydown", function(e){ keysDown(e, ball, paddle1, paddle2) })
    window.addEventListener('keyup', (e) => {
        if (e.key == 'w' || e.key == 's') paddle1.moving = false
        if (e.key == 'ArrowUp' || e.key == 'ArrowDown') paddle2.moving = false
        delete keysPressed[e.key];
    });
}


const keysDown = (e, ball, paddle1, paddle2) => {
    keysPressed[e.key] = true
    

    if (detectPaddle1Movement(paddle1, keysPressed)) {
        paddle1.direction = detectPaddleDirection(keysPressed)
        paddle1.moving = true
    }
    
    if (detectPaddle2Movement(paddle2, keysPressed)) {
        paddle2.direction = detectPaddleDirection(keysPressed)
        paddle2.moving = true
    }

    if (keysPressed[' ']) {
        gameStatus.started ?
        pauseGame(ball, paddle1, paddle2) : startGame(ball)
    }

}
 
// const detectPaddleMovement = (paddle, keysPressed) => {
//     paddle.moving = false
//     switch (paddle.id) {
//         case 'paddle-1':
//             console.log(paddle.id)
//             return keysPressed['w'] && paddle.y >= 0 ||
//                    keysPressed['s'] && paddle.y < app.height - paddle.height
//             break;
//         case 'paddle-2':
//             return keysPressed['w'] && paddle.y >= 0 ||
//                    keysPressed['s'] && paddle.y < app.height - paddle.height
//             break;
        
//         default:
//     }
// }    
    

const detectPaddle1Movement = (paddle1, keysPressed) => {
    paddle1.moving = false
    return keysPressed['w'] && paddle1.y >= 0 ||
           keysPressed['s'] && paddle1.y < app.height - paddle1.height
}



const detectPaddle2Movement = (paddle2, keysPressed) => {
    paddle2.moving = false
    return (keysPressed['ArrowUp'] && paddle2.y >= 0) ||
           (keysPressed['ArrowDown'] && paddle2.y <= app.height - paddle2.height)
}




const detectPaddleDirection = (keysPressed) => {
    const direction = (keysPressed['w'] && !keysPressed['s']) ||
                      (keysPressed['ArrowUp'] && !keysPressed['ArrowDown']) ? -1 : 1
    return direction
}









