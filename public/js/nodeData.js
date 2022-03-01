const ballData = {
    id : 'ball',
	x : window.innerWidth / 2 ,
	y : window.innerHeight / 2 ,
    velocity : 0.5,
	velocity_increase : 0.0001,
	direction : {x:0, y:0},
    radius : app.height / 50,
    height : this.radius*2,
	color : 'red',
    setRandomDirection : function() {
	    let direction = {x: 0}
		while ( Math.abs(direction.x) < 0.3 || Math.abs(direction.x) > 0.8 )   {
		const radiant = randomNumberBetween(0, 2 * Math.PI)
        direction = { x: Math.cos(radiant), y: Math.sin(radiant) }
        }
		return direction
    },
    rect : function () {
        const rect = {
            left : this.x - this.radius,
            right : this.x + this.radius,
            top : this.y - this.radius,
            bottom : this.y + this.radius
        }
        return rect
    }
		    
}

function Paddle(id, name, x, y, moveUp, moveDown) {
    this.name = name
    this.id = id,
    this.x = x,
    this.y = y,
    this.width= window.innerHeight/70,
    this.height = window.innerHeight / 7,    
    this.defaultPaddleSpeed = 0.5,
    this.paddleSpeed = this.defaultPaddleSpeed
    this.color = 'black',
    this.score = 0
    this.controls = {
        up : moveUp,
        down : moveDown
    },
    this.hitTop = () => this.y <= 0,
    this.hitBottom = () => this.y >= app.height - this.height,
    this.rect = function () {
        const rect = {
            left : this.x,
            right : this.x + this.width,
            top : this.y,
            bottom : this.y + this.height 
        }
            return rect
        }
    
    
}
const paddle1Data = new Paddle(
    'paddle-1',
    'player 1',
    20,
    app.height / 2 - app.height / 14,
    'w',
    's'
    
)
     
    

const paddle2Data = new Paddle(
    'paddle-2',
    'player 2',
    app.width - app.height / 70 - 20,
    app.height / 2 - app.height / 14,
    'ArrowUp',
    'ArrowDown'
)