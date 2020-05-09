import React from "react";
import Response from "./Response"
import { connect } from 'react-redux';
import { fetchResponses } from '../actions';

class ResponsesList extends React.Component {

    componentDidMount() {
        this.props.fetchResponses();
    }

    renderResponses() {
        return !this.props.responses.length ? (
            <div className="row p-3">
                <h3>No responses</h3>
            </div>
        ) : (
            <table className="table mt-3 w-100 text-truncate table-hover">
                <thead>
                    <tr>
                    <th scope="col">Path</th>
                    <th scope="col">Content</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {                            
                    this.props.responses.map(response => {
                        return <Response key={response.id} id={response.id} />;
                    })
                }
            </tbody>
            </table>
        )
    }

    render() {
        return <div>{this.renderResponses()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { responses: state.responses };
};

export default connect(mapStateToProps, { fetchResponses })(ResponsesList);
