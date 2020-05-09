import React from "react";
import ResponsesList from "./ResponsesList"
import { connect } from 'react-redux';
import { fetchResponses } from '../actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { responses: [], path: "", content: "" }
    }

    componentDidMount() {
        this.props.fetchResponses();
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
        fetch('http://127.0.0.1:8080/responses', requestOptions)
        .then(
            result => {
                this.props.fetchResponses();
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
                    <ResponsesList />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { responses: state.responses };
};

export default connect(mapStateToProps, { fetchResponses })(Dashboard);