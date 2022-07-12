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

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        let dpr = window.devicePixelRatio || 1
        let rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        const context = canvas.getContext('2d')
        context.scale(dpr, dpr)
        contextRef.current = context
    }, [])

    const fps = 60
    const secondsPerFrame = (1000 / 60) * (60 / fps) - (1000 / 60) * 0.5;
    let lastFrameTime = 0
    useEffect(() => {
        const render = (time) => {
            if (time - lastFrameTime < secondsPerFrame) {
                requestAnimationFrame(render);
                return
            }
            lastFrameTime = time

            const canvas = canvasRef.current
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height)

            let { player } = data

            PlayerPhysics(canvas, contextRef.current, player, mouse)
            dispatch({ type: "LEFT", payload: leftHeld })
            dispatch({ type: "RIGHT", payload: rightHeld })
            dispatch({ type: "JUMP", payload: upHeld })

            requestAnimationFrame(render)
        }
        render(lastFrameTime) // RIRENDEROHU MENIHER
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