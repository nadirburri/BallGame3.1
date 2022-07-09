import { useState, useEffect } from "react";

const Home = () => {

    const [shiftHeld, setShiftHeld] = useState(false);

    function downHandler({ key }) {
        if (key === 'Shift') {
            setShiftHeld(true);
            console.log("go crazy aaa")
        }
    }

    function upHandler({ key }) {
        if (key === 'Shift') {
            setShiftHeld(false);
            console.log("go stupid aaa")
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

    return (
        <h1>Home</h1>
    )
}

export default Home