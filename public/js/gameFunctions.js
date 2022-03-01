const gameStatus = {
    started: false,
    paused: false
}

let prePauseVelocity



const paddleMovements = (paddles, dt) => {
    for (let paddle of paddles) {
        if (paddle.moving && gameStatus.started) {
            switch (paddle.direction) {
                case 'up':
                    if (!paddle.hitTop()){
                        paddle.y -= paddle.paddleSpeed * dt
                    }
                    break;
                case 'down':
                    if (!paddle.hitBottom()) {
                        paddle.y += paddle.paddleSpeed * dt
                    }
                    break;
        
            }
        }
    }
}



const ballMovement = function (ball, dt) {
        if (dt < 100) {
           ball.x += ball.direction.x * ball.velocity * dt
           ball.y += ball.direction.y * ball.velocity * dt
           if(ball.velocity) ball.velocity += ball.velocity_increase
        }
    }
    
    
const checkForWin = function (ball, paddle1, paddle2){
        if (ball.x < 20 || ball.x > window.innerWidth - 20) {
        addPointToWinner(ball, paddle1, paddle2)
        resetBall(ball)
        console.log('player1: ' + paddle1.score, '| player2: ' + paddle2.score)
    }
}

const addPointToWinner = (ball, paddle1, paddle2) => {
    ball.x<20?paddle1.score++:paddle2.score++
}
    

const resetBall = (ball) => {
    ball.x = window.innerWidth / 2 - 10,
    ball.y = window.innerHeight / 2 - 10,
    ball.direction = ball.setRandomDirection()
    ball.velocity = 0.5
}


const handleImpacts = (ball, paddles) => {
    ballHitWall(ball)
    for (let paddle of paddles) {
    ballHitPaddle(ball, paddle)
    }
        
}
    
    
    // makes the ball bounce off the top and bottom
const ballHitWall = (ball) => {
    const ballRect = ball.rect()
    if (ballRect.top <= 0 || ballRect.bottom>=app.height) {
            ball.direction.y *= -1
    }
}

    // make ball bou1nce off paddles
const ballHitPaddle = (ball, paddle) => {
    if (isCollision(ball.rect(), paddle.rect())) {   
        if (ball.y <= paddle.y) {
            ball.direction.y = Math.abs(ball.direction.y) * -1.1
        }
        else if (ball.y >= paddle.y + paddle.height) {
            ball.direction.y = Math.abs(ball.direction.y)*1.1
        } else  ball.direction.x *= -1
    }
}

const isCollision = (rect1, rect2) => {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    ) 
        
}
  
    
   
            
const startGame = (ball) => { 
    if (!gameStatus.started) {
        ball.direction = ball.setRandomDirection()
        gameStatus.started = true
    }
}
    
const pauseGame = (ball, paddles) => {
    if (!gameStatus.paused) {
        prePauseVelocity = ball.velocity
        ball.velocity = 0
        for(let paddle of paddles) paddle.paddleSpeed = 0
        gameStatus.paused=true
    }
    else {
        ball.velocity = prePauseVelocity
        for(let paddle of paddles) paddle.paddleSpeed = paddle.defaultPaddleSpeed
        gameStatus.paused=false
    }
}
    

const resetGame = (ball, player1, player2) => {
    gameStatus.started = false
    gameStatus.paused = false
    ball.x = app.width / 2,
    ball.y = app.height / 2,
    ball.direction = { x: 0, y: 0 }  
    player1.score = 0
    player2.score = 0
    }  


const randomNumberBetween = (min, max) => Math.random() * (max - min) + min
        