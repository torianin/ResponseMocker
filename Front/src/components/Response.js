import React from 'react';
import { connect } from 'react-redux';
import { fetchResponses } from '../actions';

class Response extends React.Component {
  render() {
    const { response } = this.props;

    return (
      <tr>
        <td className="text-truncate" style={{ maxWidth: '300px' }}>
          {response.path}
        </td>
        <td className="text-truncate" style={{ maxWidth: '500px' }}>
          {response.content}
        </td>
        <td>
          <button type="button" className="btn btn-danger">
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    response: state.responses.find((response) => response.id === ownProps.id),
  };
};

export default connect(mapStateToProps, { fetchResponses })(Response);
