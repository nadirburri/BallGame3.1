// keep in mind makign it so that you can't move mid air and friction only works on ground would be very cool game :D and make it change color to red or something when in air

let jumping = false
let jumpCooldown = 5
let bounces = 0

export const reducer = (state, action) => {
    if (action.type === "JUMP"){
        if (state.player.onGround){
            bounces++
        }
        if (state.player.onGround && action.payload && !jumping){
            jumping = true
            const newPlayer = state.player
            if (bounces > jumpCooldown){
                bounces = 0
                newPlayer.dy = newPlayer.jumpPower
            }
            return {player: newPlayer}
        } else {
            jumping = false
            const newPlayer = state.player
            newPlayer.dy = 0
            return {player: newPlayer}
        }
    }
    if (action.type === "RIGHT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.goingRight = true
            newPlayer.dx = newPlayer.speed
            return {player: newPlayer}
        } else{
            const newPlayer = state.player
            newPlayer.goingRight = false
            return {player: newPlayer}
        }
    }
    if (action.type === "LEFT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.goingLeft = true
            newPlayer.dx = -newPlayer.speed
            return {player: newPlayer}
        } else{
            const newPlayer = state.player
            newPlayer.goingLeft = false
            return {player: newPlayer}
        }
    }
}