import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { setUp } from "firebase-orient"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import {GOOGLE_AUTH} from "./secrets"
setUp({
    appID: GOOGLE_AUTH.APP_ID,
    apiKey: GOOGLE_AUTH.API_KEY,
    google: true,
})

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
