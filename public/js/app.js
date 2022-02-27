
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
		this.nodes.push(ballData, paddle1Data, paddle2Data);
	    
	    addEventListeners(this.getNode('ball'), [ this.getNode('paddle-1'), this.getNode('paddle-2')])


	  },
	  
	  onUpdate: function (dt) {
		  const ball = this.getNode('ball')
		  const paddle1 = this.getNode('paddle-1')
		  const paddle2 = this.getNode('paddle-2')
		  paddleMovements([paddle1, paddle2], dt)
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
					
				