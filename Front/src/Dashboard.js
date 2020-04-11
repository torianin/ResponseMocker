import React from "react";
import Response from "./Response"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { responses: [], path: "", content: "" }
    }

    componentDidMount() {
        this.requestResponces()
    }

    async createResponce() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                path: this.state.path,
                content: this.state.content
            })
        };
        fetch('/responses', requestOptions)
        .then(
            result => {
                this.requestResponces()
            },
            error => {
                console.log(error);
            }
        );
    }

    async requestResponces() {
        let url = "/responses"
        fetch(url)
        .then(res => res.json())
        .then(
            result => {
                let responses = result
                console.log(responses)
                this.setState({responses: responses})
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        return(
            <div className="container">
                <div className="row p-3">
                    <form className="w-100" 
                        onSubmit={ e => {
                        e.preventDefault();
                        this.createResponce();
                    }}
                    >
                        <div className="form-group">
                            <label htmlFor="content">Path</label>
                            <input 
                                className="form-control" 
                                id="path" 
                                value={this.state.path}
                                onChange={e => this.setState({path: e.target.value})}
                            />
                            <label htmlFor="content">Content</label>
                            <input 
                                className="form-control" 
                                id="content" 
                                value={this.state.content}
                                onChange={e => this.setState({content: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    {!this.state.responses.length ? (
                            <div className="row p-3">
                                <h3>No responses</h3>
                            </div>
                        ) : (
                            this.state.responses.map(response => {
                                return <Response key={response.id} path={response.path} content={response.content} />;
                            })
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;