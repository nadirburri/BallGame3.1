import vector from "./functionsAndData/vector"
import data from "./functionsAndData/data"

let { player } = data
let { x, y, grav, bounce, friction, radius } = player

let position = vector.create(x, y)

let velocity = vector.create(0, 0)

let gravity = vector.create(0, grav)

export function PlayerPhysics(canvas, c, player, mouse) { // LOGJIKA E LËVIZJEVE TË TOPIT
    let height = canvas.height
    let width = canvas.width

    let accel = vector.create(player.dx, player.dy)

    // LËVIZJA E TOPIT
    accel.addTo(gravity)
    velocity.addTo(accel)
    position.addTo(velocity)

    if (!player.goingLeft && !player.goingRight){
        player.dx = 0
    }

    if (velocity.getX() > 0){
        velocity.setX(velocity.getX() - friction)
    } else if (velocity.getX() < 0){
        velocity.setX(velocity.getX() + friction)
    }

    if(velocity.getX() < friction && velocity.getX() > -friction && !player.goingLeft && !player.goingRight){
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

    let data = new Ball(position.getX(), position.getY(), radius, 0, Math.PI * 2, false)
    data.draw(c)
}

// VIZATOJE TOPIN PAS ÇDO RIRENDERIMI
function Ball(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius

    this.draw = function (c) {
        c.beginPath();
        c.lineWidth = 2.5;
        c.strokeStyle = 'rgba(241, 141, 54, 1)';
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'orange';
        c.fill();
        c.stroke();
        c.closePath();
    }
}