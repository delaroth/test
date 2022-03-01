
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
	onInit: function () {
		this.nodes.push(ballData, paddle1Data, paddle2Data);
	    
		addEventListeners(this.getNode('ball'), [this.getNode('paddle-1'), this.getNode('paddle-2')], this.canvas)


	},
	  
	onUpdate: function (dt) {  
		const ball = this.getNode('ball')
		const paddle1 = this.getNode('paddle-1')
		const paddle2 = this.getNode('paddle-2')
		drawGameText(this.context, paddle1, paddle2, gameStatus)
		paddleMovements([paddle1, paddle2], dt)
		checkForWin(ball, paddle1, paddle2)
		ballMovement(ball, dt)
		handleImpacts(ball, [paddle1, paddle2])
	},
		
	pause: function(){pauseGame(this.getNode('ball'), this.getNode('paddle-1'), this.getNode('paddle-2'))},
	
	reset: function () { resetGame(this.getNode('ball'), this.getNode('paddle-1'), this.getNode('paddle-2')) },
	drawText : function (context, x, y, fontSize, font, content) { drawText(context, x, y, fontSize, font, content)}

};

					
window.onload = function () {
	app.init();
};

window.onresize = function () {
	 adjustAppSize(app.getNode('ball'), [app.getNode('paddle-1'), app.getNode('paddle-2')], app.canvas) 
}

					
				