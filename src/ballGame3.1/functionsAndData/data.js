let data = {}

export default data = {
	create: function(canvas, level) {
        let propData = Object.create(this);

        // PLAYER DATA (p)
        propData.pgrav = this.canvasYRatio(canvas, 0.058)
        propData.pspeed = this.canvasXRatio(canvas, 0.045)
        propData.pjumpPower = this.canvasYRatio(canvas, 1.73)
        propData.pradius = this.canvasYRatio(canvas, 3.46)
        propData.plineWidth = this.canvasYRatio(canvas, 0.3)

        // CIRCLE DATA (c)
        propData.cradius = this.canvasYRatio(canvas, 3.46)
        propData.clineWidth = this.canvasYRatio(canvas, 0.3)

        if (level === 1){
		    propData.px = this.canvasXRatio(canvas, 50)
		    propData.py = this.canvasYRatio(canvas, 98)

            propData.cx = this.canvasXRatio(canvas, 25)
		    propData.cy = this.canvasYRatio(canvas, 80)

		    return propData;
        }
		if (level === 2){
		    propData.px = this.canvasXRatio(canvas, 50)
		    propData.py = this.canvasYRatio(canvas, 50)

            propData.cx = this.canvasXRatio(canvas, 75)
		    propData.cy = this.canvasYRatio(canvas, 80)

		    return propData;
        }
	},

    canvasXRatio: function(canvas, value) {
        return canvas.width * (value/100)
    },

    canvasYRatio: function(canvas, value) {
        return canvas.height * (value/100)
    },

    getPlayer: function() {
        return({
            x: this.px,
            y: this.py,
            dx: 0,
            dy: 0,
            grav: this.pgrav,
            speed: this.pspeed,
            jumpPower: this.pjumpPower,
            bounce: -0.6,
            friction: this.pspeed / 5,
            radius: this.pradius,
            lineWidth: this.plineWidth,
            color: "",
            borderColor: "",
            onGround: false,
            goingRight: false,
            goingLeft: false,
            jumping: false,
            jumpCooldown: 5,
            bounces: 0,
        })
    },

    getCircle: function() {
        return({
            x: this.cx,
            y: this.cy,
            radius: this.cradius,
            lineWidth: this.clineWidth,
            color: "black",
            borderColor: "white",
        })
        
    }
}