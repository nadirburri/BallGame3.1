// double if statement seeing if two consectuive "jump" dispatch calls have the state.player.onGround property to true

export const reducer = (state, action) => {
    if (action.type === "JUMP"){
        if (state.player.onGround){
            state.player.bounces++
        }
        if (state.player.onGround && action.payload && !state.player.jumping){
            state.player.jumping = true
            const newPlayer = state.player
            if (state.player.bounces > state.player.jumpCooldown * 2){
                state.player.bounces = 0
                newPlayer.dy = -newPlayer.jumpPower
            }
            return {player: newPlayer}
        } else {
            state.player.jumping = false
            const newPlayer = state.player
            newPlayer.dy = 0
            return {player: newPlayer}
        }
    }
    if (action.type === "GO_RIGHT"){
        if (state.player.bounces > state.player.jumpCooldown && state.player.onGround && action.payload) {
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
    if (action.type === "GO_LEFT"){
        if (state.player.bounces > state.player.jumpCooldown && state.player.onGround && action.payload) {
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