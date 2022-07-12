import vector from "./functionsAndData/vector"
import data from "./functionsAndData/data"

let position = vector.create(0, 0)

let velocity = vector.create(0, 0)

let currentLevel = 1

export function PlayerPhysics(canvas, c, player, level) { // LOGJIKA E LËVIZJEVE TË TOPIT
    let { x, y, dx, dy, grav, bounce, friction, radius, color, borderColor, onGround, goingRight, goingLeft, bounces, jumpCooldown } = player
    let height = canvas.height
    let width = canvas.width

    if (currentLevel === level){
        currentLevel++
        position.setX(x)
        position.setY(y)
    }

    let gravity = vector.create(0, grav)
    let accel = vector.create(dx, dy)

    // LËVIZJA E TOPIT
    accel.addTo(gravity)
    velocity.addTo(accel)
    position.addTo(velocity)

    if (!goingLeft && !goingRight){
        player.dx = 0
    }

    if (velocity.getX() > 0){
        if(onGround){
            velocity.setX(velocity.getX() - friction)
        } else {
            velocity.setX(velocity.getX() - friction*0.75)
        }
    } else if (velocity.getX() < 0){
        if(onGround){
            velocity.setX(velocity.getX() + friction)
        } else {
            velocity.setX(velocity.getX() + friction*0.75)
        }
    }

    if(velocity.getX() < friction && velocity.getX() > -friction && !goingLeft && !goingRight){
        velocity.setX(0)
    }

    if (position.getY() + radius > height) {
        position.setY(height - radius)
        velocity.setY(velocity.getY() * bounce)
        player.onGround = true
    } else {
        player.onGround = false
    }

    if (position.getX() + radius > width) {
        position.setX(width - radius)
        velocity.setX(velocity.getX() * bounce)
    }

    if (position.getX() - radius < 0) {
        position.setX(radius)
        velocity.setX(velocity.getX() * bounce)
    }

    if (bounces > jumpCooldown){
        player.color = "orange"
        player.borderColor = "rgb(241, 141, 54)"
    } else{
        player.color = "rgb(122, 0, 0)"
        player.borderColor = "rgb(75, 0, 0)"
    }

    let data = new Ball(position.getX(), position.getY(), radius, color, borderColor)
    data.draw(c)
}

// VIZATOJE TOPIN PAS ÇDO RIRENDERIMI
function Ball(x, y, radius, color, borderColor) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.borderColor = borderColor

    this.draw = function (c) {
        c.beginPath();
        c.lineWidth = 2.5;
        c.strokeStyle = borderColor;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}