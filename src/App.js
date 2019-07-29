import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./home/home"
import Gallery from "./gallery/gallery"
import Categories from "./gallery/categories"

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Route exact component={Home} path="/" />
            <Route exact component={Categories} path="/gallery" />
            <Route exact component={Gallery} path="/gallery/:category" />
        </BrowserRouter>
    )
}

export default App
