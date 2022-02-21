

var app = {
	//initial variables
	canvas  : null,
	context : null,

	//resizing
	width   : window.innerWidth,
	height  : window.innerHeight,

	//nodes
	nodes   : [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate : 0,

	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.height = this.height
		this.canvas.width = this.width
		this.render();
		this.onInit();
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

			this.context.fillStyle = node.color;
			this.context.fillRect(node.x, node.y, node.width, node.height);
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
			{
			id : 'ball',
			x  : window.innerWidth/2,
			y: window.innerHeight/2,
			vx: 1,
			vy: 1,
			width  : 10,
			height : 10,
			color  : 'red',
			
		    },
		    {
			id : 'paddle-1',
			x  : 20,
			y: window.innerHeight/2-100,
			vx: 1,
			vy: 1,
			width  : 20,
			height : 200,
			color: 'black'
			
			},
			{
			id : 'paddle-2',
		    x : window.innerWidth-40,
			y : window.innerHeight/2-100,
			vx : 1,
			vy : 1,
			width : 20,
			height : 200,
			color  : 'black'	
			});
	  },
	
	onUpdate : function(time){
		this.ballMovement(this.getNode('ball'))
	},

	ballMovement: function(ball) {
		ball.x += ball.vx
		ball.y += ball.vy
	},


};

window.addEventListener("keydown", function (e) {
	console.log(e.key)
	switch(e.key) {
		case 'ArrowUp':
			app.getNode('paddle-2').y-=10
		  break;
		case 'ArrowDown':
			app.getNode('paddle-2').y+=10
			break;
		case '':
			
		default:
		  // code block
	  }

})

window.onload = function(){
	app.init();
};