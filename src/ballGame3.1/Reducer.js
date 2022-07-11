export const reducer = (state, action) => {
    if (action.type === "JUMP"){
        if (state.player.onGround && action.payload){
            const newPlayer = state.player
            newPlayer.dy = 30
            return {player: newPlayer}
        } else {
            const newPlayer = state.player
            newPlayer.dy = 0
            return {player: newPlayer}
        }
    }
    if (action.type === "RIGHT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.goingRight = true
            newPlayer.dx = 1
            return {player: newPlayer}
        } else if (!state.player.goingLeft){
            const newPlayer = state.player
            newPlayer.dx = 0
            return {player: newPlayer}
        } else {
            const newPlayer = state.player
            return {player: newPlayer}
        }
    }
    if (action.type === "LEFT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.goingLeft = true
            newPlayer.dx = -1
            return {player: newPlayer}
        } else{
            const newPlayer = state.player
            newPlayer.dx = 0
            return {...state}
        }
    }
}