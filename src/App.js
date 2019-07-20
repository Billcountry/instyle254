import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./home/home"

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Route exact component={Home} path="/" />
        </BrowserRouter>
    )
}

export default App
