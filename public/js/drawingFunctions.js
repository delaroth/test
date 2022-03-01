function drawText(context, x, y, fontSize, font, content) {
    context.font = `${fontSize}px ${font}`;
    context.textBaseline = "middle"
    context.textAlign = "center"
    context.fillText(`${content}`, x, y)
}

function drawScore(context, player1Score, player2Score) {
    const content = `${player2Score}|${player1Score}`
    const font = 'Ariel'
    const fontSize = app.height / 17 <= app.width / 10 ? app.height / 17 : app.width / 8
    const x = app.width / 2
    const y = app.height / 25
    drawText(context, x, y, `${fontSize}`, font, content)
}

function drawPlayerNames(context, player1, player2) {

    const content1 = `${player1.name}`
    const content2 = `${player2.name}`
    const font = 'Ariel'
    const fontSize = app.height / 25 <= app.width / 10 ? app.height / 25 : app.width / 10
    const x1 = app.width / 4
    const y = app.height / 25
    const x2 = app.width * 3 / 4 

    drawText(context, x1, y, `${fontSize}`, font, content1)
    drawText(context, x2, y, `${fontSize}`, font, content2)
}



function drawGameInstructions(context, gameStatus) {
    let instructions = [
        '"SpaceBar" to start game',
        'player 1 controls: \u0057 \u0053',
        'player 2 controls: \u2191 \u2193']
        if (gameStatus.paused) {
            instructions[0] = 'Press "SpaceBar" to continue'
        }
        else if (gameStatus.started) {
            instructions[0] = ['Press "SpaceBar" to pause game']
        }
    const font = 'Ariel'
    let lineSpacing = app.height / 25
    fontSize = app.height / 40
    if (app.height / 25 >= app.width / 15) {
        fontSize = app.width / 15
        lineSpacing = app.width / 10
    }
        const x = app.width / 2
        let y = app.height - (app.height / 25)
        for (let instruction of instructions.reverse()) {
            drawText(context, x, y, `${fontSize}`, font, instruction)
            y -= lineSpacing
    } 
}

function drawGameText(context, player1, player2, gameStatus){
    drawPlayerNames(context, player1, player2)
    drawScore(context, player1.score, player2.score)
    drawGameInstructions(context, gameStatus)
}

function drawBall(ball, context) {
    context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	context.fillStyle = '#13a8a4';
	context.fill()
}


function drawPaddle(paddle, context) {
    context.fillStyle = paddle.color;
	context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}