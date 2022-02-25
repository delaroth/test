function Ball(id, x, y, velocity, velocity_increase, direction,radius,color) {
            this.id=id,
			this.x=x,
			this.y=y,
		    this.velocity=velocity,
			this.velocity_increase = velocity_increase,
			this.direction=direction,
			this.radius= radius,
			this.color= 'red',
			this.setRandomDirection = () => {
                    let direction = { x: 0 }
                    while (Math.abs(direction.x) < 0.3 || Math.abs(direction.x) > 0.8) {
                        const radiant = randomNumberBetween(0, 2 * Math.PI)
                        direction = { x: Math.cos(radiant), y: Math.sin(radiant) }
                    }
                    return direction
                }
		    
        }