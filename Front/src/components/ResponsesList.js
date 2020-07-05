import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'lodash';
import Response from './Response';
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
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {this.props.responses.map((response) => {
            return <Response key={response.id} id={response.id} />;
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.renderResponses()}</div>;
  }
}

const mapStateToProps = (state) => {
  const responsesList = Object.values(state.responses);
  return {
    responses: _.orderBy(
      responsesList,
      [(response) => response.createdAt],
      ['desc']
    ),
  };
};

export default connect(mapStateToProps, { fetchResponses })(ResponsesList);
