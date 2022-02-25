
let app = {
	//initial variables
	canvas  : null,
	context : null,

	//resizing
	width : window.innerWidth,
	height: window.innerHeight,

	//nodes
	nodes   : [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate: 0,

	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.height = this.height
		this.canvas.width = this.width
		this.onInit();
		this.render();
	},
	render : function(){
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear  : function(){
		this.context.clearRect(0, 0, this.width, this.height);
	},
	update : function(){
	    let dt = Date.now() - this.lastUpdate;

		this.onUpdate(dt);
		this.context.font = "30px Arial";
		this.context.textBaseline = "middle"
		this.context.textAlign = "center"
		this.context.fillText(`${this.getNode('paddle-2').score}|${this.getNode('paddle-1').score}`, this.width/2, 30)

		for(let index in this.nodes){
			let node = this.nodes[index];
			if (node.id == "ball") {
				drawBall(node, this.context)
			}
			else {
				drawPaddle(node, this.context)
			}
		}
		this.lastUpdate = Date.now();
		this.timestamp+=dt;
	},
	getNode : function(id){
		for(let index in this.nodes){
			let node = this.nodes[index];

			if(node.id == id){
				return node;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},

	//events
	onInit : function(){
		this.nodes.push(
			ballData,
		    paddle1Data,
			paddle2Data);
		
		this.getNode('ball').direction = this.getNode('ball').setRandomDirection()
		


	let keysPressed = {}
    window.addEventListener("keydown", function (e) {
	
	const paddle1 = app.getNode('paddle-1')
	const paddle2 = app.getNode('paddle-2')
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
})
					

document.addEventListener('keyup', (e) => {
	delete keysPressed[e.key];
 });

		
	  },
	  
	  onUpdate: function (dt) {
		const ball = this.getNode('ball')
		const paddle1 = this.getNode('paddle-1')
		const paddle2 = this.getNode('paddle-2')
		ball.velocity+=ball.velocity_increase
		this.checkForWin(ball, paddle1, paddle2)
		this.checkForImpact(ball, paddle1, paddle2)
		this.ballMovement(ball, dt)
		  
	
		
	},
	
	ballMovement: function (ball, dt) {
		if (dt < 100) {
			ball.x += ball.direction.x * ball.velocity * dt
			ball.y += ball.direction.y * ball.velocity * dt
		}
	},
	checkForWin: function (ball, paddle1, paddle2){
		if (ball.x < 20) {
			paddle1.score++
			this.resetBall(ball)
			console.log('player1:'+ paddle1.score)
		}
		if (ball.x > this.width-20) {
			paddle2.score++
			this.resetBall(ball)
			console.log('player2:'+ paddle2.score)
		}
		
	},
	resetBall: function (ball) {
		ball.x = window.innerWidth / 2 - 10,
		ball.y = window.innerHeight / 2 - 10,
		ball.direction = ball.setRandomDirection()
		ball.velocity=0.4
	},
	checkForImpact: function(ball, paddle1, paddle2) {
		// make the ball bounce off the top and bottom
	  if (ball.y-ball.radius <= 0 || ball.y+ball.radius >= this.height) {
		  ball.direction.y*=-1
	  }
        // make ball bounce off paddle1
  
      if (ball.x-ball.radius <= paddle1.x+paddle1.width/2 && (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height)) {
	  ball.direction.x*=-1
      }
  
       // make ball bounce off paddle to
      if (ball.x >= paddle2.x - paddle2.width/2 && (ball.y-ball.radius > paddle2.y && ball.y+ball.radius < paddle2.y + paddle2.height)) {
	      ball.direction.x *= -1
	     // console.log(ball.y, paddle2.y)
  }}
};





randomNumberBetween = (min, max) => Math.random() * (max - min) + min
					
					window.onload = function(){
						app.init();
};
					
				