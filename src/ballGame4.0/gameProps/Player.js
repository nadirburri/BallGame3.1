import vector from "../functionsAndData/vector"

let position = vector.create(0, 0)
let velocity = vector.create(0, 0)
let currentLevel = 0

export function PlayerPhysics(canvas, c, player, circles, level) { // LOGJIKA E LËVIZJEVE TË TOPIT
    let { x, y, dx, dy, grav, bounce, friction, radius, lineWidth, onGround, goingRight, goingLeft, bounces, jumpCooldown } = player

    let height = canvas.height
    let width = canvas.width

    radius += lineWidth / 2
    let cradius = circles.radius + circles.lineWidth / 2

    let gravity = vector.create(0, grav)
    let accel = vector.create(dx, dy)


    if (!(currentLevel === level)) {
        currentLevel = level
        position = vector.create(0, 0)
        velocity = vector.create(0, 0)
        position.setX(x)
        position.setY(y)
    }

    // LËVIZJA E TOPIT
    accel.addTo(gravity)
    velocity.addTo(accel)
    position.addTo(velocity)

    let distanceBetweenCircles = Math.pow((position.getX() - circles.x), 2) + Math.pow((position.getY() - circles.y), 2)

    if (distanceBetweenCircles < Math.pow(radius + cradius, 2)){
        let distanceVector = vector.create((position.getX() - circles.x), (position.getY() - circles.y))
        let distance = distanceVector.getLength()
        let angle = distanceVector.getAngle()
        let distanceToMove = radius + cradius - distance
        position.setX(position.getX() + Math.cos(angle) * distanceToMove)
        position.setY(position.getY() + Math.sin(angle) * distanceToMove)

        // let tangentVector = vector.create(-(circles.y - position.getY()), (circles.x - position.getX()))
        // tangentVector.setLength(1)
        // let length = vector.getDotProduct(velocity, tangentVector)
        // tangentVector.multiply(length)
        // let tangentVelocity = velocity.subtract(tangentVector)
        // velocity.setX(velocity.getX() + tangentVelocity.getX())
        // velocity.setY(velocity.getY() + tangentVelocity.getY())
        // velocity.setX(velocity.getX() * bounce)
        // velocity.setY(velocity.getY() * bounce)


        // circle2.Velocity.X += velocityComponentPerpendicularToTangent.X;
        // circle2.Velocity.Y += velocityComponentPerpendicularToTangent.Y;
        // tangentVector.Y = -( circle2.X - circle1.X );
        // tangentVector.X = circle2.Y - circle1.Y;
    }

    if (!goingLeft && !goingRight) {
        player.dx = 0
    }

    if (velocity.getX() > 0) {
        if (onGround) {
            velocity.setX(velocity.getX() - friction)
        } else {
            velocity.setX(velocity.getX() - friction * 0.75)
        }
    } else if (velocity.getX() < 0) {
        if (onGround) {
            velocity.setX(velocity.getX() + friction)
        } else {
            velocity.setX(velocity.getX() + friction * 0.75)
        }
    }

    if (velocity.getX() < friction && velocity.getX() > -friction && !goingLeft && !goingRight) {
        velocity.setX(0)
    }

    if (position.getY() + radius + 2.5 > height) {
        position.setY(height - radius - 2.5)
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

    if (bounces > jumpCooldown) {
        player.color = "orange"
        player.borderColor = "rgb(241, 141, 54)"
    } else {
        player.color = "rgb(122, 0, 0)"
        player.borderColor = "rgb(75, 0, 0)"
    }

    let data = new Ball(position.getX(), position.getY(), player.radius, player.lineWidth, player.color, player.borderColor)
    data.draw(c)
}

// VIZATOJE TOPIN PAS ÇDO RIRENDERIMI
function Ball(x, y, radius, lineWidth, color, borderColor) {
    this.x = x
    this.y = y
    this.radius = radius
    this.lineWidth = lineWidth
    this.color = color
    this.borderColor = borderColor

    this.draw = function (c) {
        c.beginPath();
        c.lineWidth = lineWidth;
        c.strokeStyle = borderColor;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}