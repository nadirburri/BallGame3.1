import { useState, useEffect } from "react";
import vector from "./ballGame3.1/functionsAndData/vector";
const Home = () => {

    useEffect(() => {
        let v1 = vector.create(8, 6)
        let v2 = v1.multiply(5)
        console.log(v1.getLength())
        console.log(v2.getLength())
    }, []);

    return (
        <h1>Home</h1>
    )
}

export default Home