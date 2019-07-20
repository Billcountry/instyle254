import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { setUp } from "firebase-orient"
import "materialize-css/dist/css/materialize.min.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
setUp({
    appID: "instyle254",
    apiKey: "AIzaSyBvGlDZWJTjKE7oz6HfVfPrGBFybJ07M_8",
    google: true,
})

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
