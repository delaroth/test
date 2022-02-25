
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

		drawScore(this.context, this.getNode('paddle-2').score, this.getNode('paddle-1').score, this.width/2, 30)
		
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
			
			
			let keysPressed = {}
			window.addEventListener("keydown", function (e) {
				
				const paddle1 = app.getNode('paddle-1')
				const paddle2 = app.getNode('paddle-2')
				const ball = app.getNode('ball')	
				
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
	
	if (keysPressed[' ']&&!gameStatus.started) {
		startGame(ball)
	}
	else if (keysPressed[' ']) {
		pauseGame(ball, paddle1, paddle2)
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
		  
		  checkForWin(ball, paddle1, paddle2)
		  checkForImpact(ball, paddle1, paddle2)
		  ballMovement(ball, dt)
		},
		
	pause: function(){pauseGame(this.getNode('ball'), this.getNode('paddle-1'), this.getNode('paddle-2'))},
	
	reset: function () { resetGame(this.getNode('ball'), this.getNode('paddle-1'), this.getNode('paddle-2')) }

};

					
					window.onload = function(){
						app.init();
};
					
				