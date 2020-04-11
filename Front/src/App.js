import React from "react";
import ReactDom from "react-dom";
import Dashboard from "./Dashboard"

const App = () => {
    return (
        <Dashboard />
    )
};

ReactDom.render(<App/>, document.getElementById("root"));