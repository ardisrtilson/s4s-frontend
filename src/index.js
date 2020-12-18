import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Selektor } from "./components/Selektor.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Selektor />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)