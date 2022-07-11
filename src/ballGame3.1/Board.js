import React, { useEffect, useRef, useState, useReducer } from "react";
import { reducer } from "./Reducer";
import { PlayerPhysics } from "./Player";
import data from "./functionsAndData/data"

const defaultState = {
    player: {},
}

let mouse = {
    x: 0,
    y: 0
}

export default function Board() {
    const canvasRef = useRef(null)

    const [pause, setPause] = useState(false);

    const [state, dispatch] = useReducer(reducer, defaultState)
    state.player = data.player

    // MERRI KORDINATAT E KURSORIT
    const move = ({ nativeEvent }) => {
        mouse.x = nativeEvent.x
        mouse.y = nativeEvent.y - 68 // -68 PËR SHKAK TË NAVBARIT
    }

    let rightHeld = false
    let leftHeld = false
    let upHeld = false

    function downHandler({ key }) {
        if (key === 'ArrowRight') {
            rightHeld = true
        }
        if (key === 'ArrowLeft') {
            leftHeld = true
        }
        if (key === 'ArrowUp') {
            upHeld = true
            dispatch({ type: "JUMP", payload: upHeld })
        }
    }

    function upHandler({ key }) {
        if (key === 'ArrowRight') {
            rightHeld = false
        }
        if (key === 'ArrowLeft') {
            leftHeld = false
        }
        if (key === 'ArrowUp') {
            upHeld = false
            dispatch({ type: "JUMP", payload: upHeld })
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current

            let dpr = window.devicePixelRatio || 1;
            let rect = canvas.getBoundingClientRect()

            canvas.width = Math.round (dpr * rect.right) - Math.round (dpr * rect.left);
            canvas.height = Math.round (dpr * rect.bottom) - Math.round (dpr * rect.top)

            const c = canvas.getContext('2d')
            c.scale(dpr,dpr)

            c.clearRect(0, 0, canvas.width, canvas.height)

            let { player } = data

            PlayerPhysics(canvas, c, player, mouse)
            dispatch({ type: "LEFT", payload: leftHeld })
            dispatch({ type: "RIGHT", payload: rightHeld })

            requestAnimationFrame(render)
        }
        render() // RIRENDEROHU MENIHER
    }, [])

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            height={window.innerHeight - 71.5} // -71.5 PËR SHKAK TË NAVBARIT
            width={window.innerWidth}
            onMouseMove={move}
            onMouseEnter={() => setPause(false)}
            onMouseLeave={() => setPause(true)} />
    )
}