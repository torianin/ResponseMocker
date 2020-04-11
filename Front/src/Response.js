import React from "react";

const Response = props => {
    const {path, content} = props;
    return(
        <div className="card mt-3 w-100">
            <div className="card-body">
                <h5 className="card-title">{path}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    )
}

export default Response;