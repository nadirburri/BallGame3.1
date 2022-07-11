import vector from "./functionsAndData/vector"
import data from "./functionsAndData/data"

let { player } = data
let { x, y, dx, dy, grav, speed, bounce, friction, radius } = player

let position = vector.create(x, y)

let velocity = vector.create(0, 0)

let gravity = vector.create(0, grav)

export function PlayerPhysics(canvas, c, player, mouse) { // LOGJIKA E LËVIZJEVE TË TOPIT
    let height = canvas.height
    let width = canvas.width

    dx = player.dx
    dy = player.dy

    let accel = vector.create(dx, dy)

    // LËVIZJA E TOPIT
    accel.addTo(gravity)
    velocity.addTo(accel)
    position.addTo(velocity)

    if (velocity.getX() > 0){
        velocity.setX(velocity.getX() - friction)
    } else if (velocity.getX() < 0){
        velocity.setX(velocity.getX() + friction)
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

    // // LËVIZJA E TOPIT
    // player.x += player.dx
    // player.y += player.dy

    // // GRAVITETI
    // if(player.y + player.radius > board.h){
    //     player.y = board.h - (player.radius-0.5);
    //     player.dy = player.dy*-0.6; // BOUNCE
    //     player.onGround = true;
    // }
    // else{
    //     player.dy += board.h*0.001;
    //     player.onGround = false;
    // }

    // // PARANDALIMI I DALJES NGA KUFIRET
    // if(player.x + player.radius > canvas.width){ // MOS DIL DJATHTAS
    //     player.x = canvas.width - player.radius;
    //     player.dx = player.dx*-0.6;
    // }
    // if(player.x - player.radius < 0){ // MOS DIL MAJTAS
    //     player.x = player.radius;
    //     player.dx = player.dx*-0.6;
    // }
    // if(player.y - player.radius < 0){ // MOS DIL NALT
    //     player.y = player.radius;
    //     player.dy = -player.dy;
    // }

    // NDJEKE KURSORIN
    // if(mouse.x > player.x + player.radius){
    //     player.dx += player.speedingUp;
    // }
    // else if(mouse.x < player.x - player.radius){
    //     player.dx -= player.speedingUp;
    // }
    // else{
    //     if(player.dx > player.speedingUp){
    //         player.dx -= player.slowingDown;
    //     }
    //     else if(player.dx < -player.speedingUp){
    //         player.dx += player.slowingDown;
    //     }
    //     else{
    //         player.dx = 0;
    //     }
    // };
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