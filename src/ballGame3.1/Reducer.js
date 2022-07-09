export const reducer = (state, action) => {
    if (action.type === "JUMP"){
        if (!state.player.onGround){
            // PËR TA PARANDALUAR KËRCIMIN NË AJËR
            return {...state}
        } else {
            const newPlayer = state.player
            newPlayer.dy = 17.5
            return {player: newPlayer}
        }
    }
    if (action.type === "GO_RIGHT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.dx = newPlayer.dx + newPlayer.speedingUp
            return {player: newPlayer}
        } else{
            const newPlayer = state.player
            if(newPlayer.dx > 0){
                newPlayer.dx = newPlayer.dx - newPlayer.slowingDown
            }
            return {player: newPlayer}
        }
    }
    if (action.type === "GO_LEFT"){
        if (action.payload) {
            const newPlayer = state.player
            newPlayer.dx = newPlayer.dx - newPlayer.speedingUp
            return {player: newPlayer}
        } else{
            const newPlayer = state.player
            if(newPlayer.dx < 0){
                newPlayer.dx = newPlayer.dx + newPlayer.slowingDown
            }
            return {player: newPlayer}
        }
    }
}