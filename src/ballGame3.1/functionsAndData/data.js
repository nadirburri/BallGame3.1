let data = {}

export default data = {
    width: 0,
    height: 0,

	create: function(canvas, level) {
        if (level === 1){
            let p = Object.create(this);
		    p.x = this.canvasXRatio(canvas, 50)
		    p.y = this.canvasYRatio(canvas, 98)
            p.grav = this.canvasYRatio(canvas, 0.058)
            p.speed = this.canvasXRatio(canvas, 0.045)
            p.jumpPower = this.canvasYRatio(canvas, 1.73)
            p.radius = this.canvasYRatio(canvas, 3.46)
            console.log(p.radius)
		    return p;
        }
		if (level === 2){
            let obj = Object.create(this);
		    obj.setX(canvas.width/4);
		    obj.setY(canvas.height/4);
		    return obj;
        }
	},

    canvasXRatio: function(canvas, value) {
        return canvas.width * (value/100)
    },

    canvasYRatio: function(canvas, value) {
        return canvas.height * (value/100)
    },

	// setX: function(value) {
	// 	this.x = value;
	// },

	// setY: function(value) {
	// 	this.y = value;
	// },

    getPlayer: function() {
        return({
            x: this.x,
            y: this.y,
            dx: 0,
            dy: 0,
            grav: this.grav,
            speed: this.speed,
            jumpPower: this.jumpPower,
            bounce: -0.6,
            friction: this.speed / 5,
            radius: this.radius,
            color: "",
            borderColor: "",
            onGround: false,
            goingRight: false,
            goingLeft: false,
            jumping: false,
            jumpCooldown: 5,
            bounces: 6,
        })
    },
    // setPlayer: function({x, y, dx, dy, grav, speed, jumpPower, bounce, friction, radius, color, onGround, goingRight, goingLeft}) {
    //         this.x = x
    //         this.y = y
    //         this.dx = dx
    //         this.dy = dy
    //         this.grav = grav
    //         this.speed = speed
    //         this.jumpPower = jumpPower
    //         this.bounce = bounce
    //         this.friction = friction
    //         this.radius = radius
    //         this.color = color
    //         this.onGround = onGround
    //         this.goingRight = goingRight
    //         this.goingLeft = goingLeft
    // },
    circle: {
        x: 750,
        y: 600,
        color: "black",
    }
}