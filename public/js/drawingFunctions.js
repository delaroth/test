function drawScore(context, score) {
    context.font = "30px Arial";
    context.textBaseline = "middle"
    context.textAlign = "center"
    context.fillText(`${this.score.player2}|${this.score.player1}`, this.width/2, 30)
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