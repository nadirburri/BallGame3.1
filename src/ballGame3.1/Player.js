let board = {
    h: 0,
    w: 0
}

export function PlayerPhysics(canvas, c, player, mouse){ // LOGJIKA E LËVIZJEVE TË TOPIT
    let data = new Ball(player.x, player.y, player.radius, 0, Math.PI*2, false)
    data.draw(c)
    
    // MADHËSITË E CANVASIT
    board.h = canvas.height
    board.w = canvas.width

    // LËVIZJA E TOPIT
    player.x += player.dx
    player.y += player.dy

    // GRAVITETI
    if(player.y + player.radius > board.h){
        player.y = board.h - (player.radius-0.5);
        player.dy = player.dy*-0.6; // BOUNCE
        player.onGround = true;
    }
    else{
        player.dy += board.h*0.000275;
        player.onGround = false;
    }

    // PARANDALIMI I DALJES NGA KUFIRET
    if(player.x + player.radius > canvas.width){ // MOS DIL DJATHTAS
        player.x = canvas.width - player.radius;
        player.dx = player.dx*-0.6;
    }
    if(player.x - player.radius < 0){ // MOS DIL MAJTAS
        player.x = player.radius;
        player.dx = player.dx*-0.6;
    }
    if(player.y - player.radius < 0){ // MOS DIL NALT
        player.y = player.radius;
        player.dy = -player.dy;
    }

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
function Ball(x, y, radius){
    this.x = x
    this.y = y
    this.radius = radius
    
    this.draw = function(c){
        c.beginPath();
        c.lineWidth = 2.5;
        c.strokeStyle = 'rgba(241, 141, 54, 1)';
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = 'orange';
        c.fill();
        c.stroke();
        c.closePath();
    }
}