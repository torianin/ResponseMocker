import React from 'react';
import { connect } from 'react-redux';
import { fetchResponses, deleteResponse } from '../actions';

class Response extends React.Component {
  handleClick = (id) => {
    this.props.deleteResponse(this.props.response.id);
  };

  render() {
    return (
      <tr>
        <td className="text-truncate" style={{ maxWidth: '300px' }}>
          {this.props.response.path}
        </td>
        <td className="text-truncate" style={{ maxWidth: '500px' }}>
          {this.props.response.content}
        </td>
        <td>
          <button
            onClick={this.handleClick}
            type="button"
            className="btn btn-danger"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    response: state.responses[ownProps.id],
  };
};

export default connect(mapStateToProps, { fetchResponses, deleteResponse })(
  Response
);
