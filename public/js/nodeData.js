const ballData = {
    id: 'ball',
	x: window.innerWidth / 2 - 10,
	y: window.innerHeight / 2 - 10,
    velocity: 0.4,
	velocity_increase:0.0001,
	direction:{x:0, y:0},
    radius: 15,
	color: 'red',
    setRandomDirection : function() {
	    let direction = {x: 0}
		while ( Math.abs(direction.x) < 0.3 || Math.abs(direction.x) > 0.8 )   {
		const radiant = randomNumberBetween(0, 2 * Math.PI)
        direction = { x: Math.cos(radiant), y: Math.sin(radiant) }
        }
		return direction
		}
		    
}

function Paddle(id, x, y) {
    this.id = id,
    this.x = x,
    this.y = y,
    this.width= window.innerHeight/70,
    this.height = window.innerHeight / 7,
    this.paddleSpeed = 0.5,
    this.color = 'black',
    this.score =0
}
const paddle1Data = new Paddle(
    'paddle-1',
    20,
    app.height / 2 - app.height / 14)

const paddle2Data = new Paddle(
    'paddle-2',
    app.width - app.height / 70 - 20,
    app.height / 2 - app.height / 14
)