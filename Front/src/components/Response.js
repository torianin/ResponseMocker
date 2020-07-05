import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResponses, editResponse, deleteResponse } from '../actions';

class Response extends React.Component {
  copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  handleCopyClick = (id) => {
    this.copyToClipboard(this.props.response.content);
  };

  handleClick = (id) => {
    this.props.deleteResponse(this.props.response.id);
  };

  handleIsActiveClick = (id) => {
    const response = {
      path: this.props.response.path,
      content: this.props.response.content,
      isActive: !this.props.response.isActive,
      replaceDates: this.props.response.replaceDates,
    };
    this.props.editResponse(id, response);
  };

  handleReplaceDatesClick = (id) => {
    const response = {
      path: this.props.response.path,
      content: this.props.response.content,
      isActive: this.props.response.isActive,
      replaceDates: !this.props.response.replaceDates,
    };
    this.props.editResponse(id, response);
  };

  renderEdit = (id) => {
    return <Link to={`/responses/edit/${id}`} className="btn btn-info ml-1">
      Edit
    </Link> 
  };

  render() {
    let replaceDatesTag;
    if (this.props.response.replaceDates) {
      replaceDatesTag = (
        <span className="badge badge-pill badge-info ml-1">Replace dates</span>
      );
    }

    return (
      <tr className={this.props.response.isActive ? '' : 'text-muted'}>
        <td className="text-truncate" style={{ maxWidth: '700px' }}>
          {this.props.response.path}
          <br />
          {this.props.response.description ? (
            <div><small className="text-info">{this.props.response.description}</small><br /></div>
          ) : ( null )}
          {this.props.response.isActive ? (
            <span className="badge badge-pill badge-info ml-1">Active</span>
          ) : (
            <span className="badge badge-pill badge-warning ml-1">
              Disabled
            </span>
          )}
          {replaceDatesTag}
        </td>
        <td>
          {this.renderEdit(this.props.response.id)}
          {this.props.response.isActive ? (
            <button
              onClick={() => this.handleIsActiveClick(this.props.response.id)}
              type="button"
              className="btn btn-info ml-1"
            >
              Disable
            </button>
          ) : (
            <button
              onClick={() => this.handleIsActiveClick(this.props.response.id)}
              type="button"
              className="btn btn-info ml-1"
            >
              Activate
            </button>
          )}

          <button
            onClick={() => this.handleReplaceDatesClick(this.props.response.id)}
            type="button"
            className="btn btn-info ml-1"
          >
            Render dates
          </button>
          <button
            onClick={this.handleCopyClick}
            type="button"
            className="btn btn-info ml-1"
          >
            Copy
          </button>
          <button
            onClick={this.handleClick}
            type="button"
            className="btn btn-danger ml-1"
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

export default connect(mapStateToProps, {
  fetchResponses,
  editResponse,
  deleteResponse,
})(Response);
