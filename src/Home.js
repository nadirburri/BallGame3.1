import { useState, useEffect } from "react";
import vector from "./ballGame4.0/functionsAndData/vector";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div class="home">
            <h1>Home</h1>
            <Link to="/ballGame">
                Play
            </Link>
        </div>

    )
}

export default Home