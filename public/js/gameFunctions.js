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
                    if (!hitTop(paddle)){
                        paddle.y -= paddle.paddleSpeed * dt
                    }
                    break;
                case 'down':
                    if (!hitBottom(paddle)) {
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
    },
    
    
    checkForWin = function (ball, paddle1, paddle2){
        if (ball.x < 20 || ball.x > window.innerWidth - 20) {
        addPointToWinner(ball, paddle1, paddle2)
        resetBall(ball)
        console.log('player1: ' + paddle1.score, '| player2: ' + paddle2.score)
    }
    },


    addPointToWinner = (ball, paddle1, paddle2) => {
    ball.x<20?paddle1.score++:paddle2.score++
    },  
    

resetBall = (ball) => {
    ball.x = window.innerWidth / 2 - 10,
    ball.y = window.innerHeight / 2 - 10,
    ball.direction = ball.setRandomDirection()
    ball.velocity=0.4
    },


    checkForImpact = (ball, paddle1, paddle2) => {
        wallImpact(ball)
        paddle1Impact(ball, paddle1)
        paddle2Impact(ball, paddle2)
    },
    
    
        // makes the ball bounce off the top and bottom
wallImpact = (ball) => {
    if (ball.y-ball.radius <= 0 || ball.y+ball.radius >= window.innerHeight) {
        ball.direction.y*=-1
        }
    },

    // make ball bounce off paddle1
    paddle1Impact = (ball, paddle1) => {
        if (ball.x - ball.radius <= paddle1.x + paddle1.width / 2 &&
       (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height)) {
            ball.direction.x*=-1
        }
    },
        // make ball bounce off paddle2
paddle2Impact = (ball, paddle2) => {
    if (
        ball.x >= paddle2.x - paddle2.width / 2 &&
        ball.y - ball.radius > paddle2.y &&
        ball.y + ball.radius < paddle2.y + paddle2.height
        ) {
            ball.direction.x *= -1
          }
    },
            
    startGame = (ball) => { 
        if (!gameStatus.started) {
            ball.direction = ball.setRandomDirection()
            gameStatus.started = true
        }
    },
    
    pauseGame = (ball, paddles) => {
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
        },
    
    resetGame = (ball, player1, player2) => {
        gameStatus.started = false
        gameStatus.paused = false
        ball.x = app.width / 2,
        ball.y = app.height / 2,
        ball.direction = { x: 0, y: 0 }  
        player1.score = 0
        player2.score = 0
    },   


    randomNumberBetween = (min, max) => Math.random() * (max - min) + min
        