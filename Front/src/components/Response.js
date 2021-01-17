import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResponses, editResponse } from '../actions';

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
    return <Link to={`/responses/edit/${id}`} className="btn btn-info ml-1 btn-sm">
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

    let createdAt = new Date(this.props.response.createdAt)
    let createdAtString = moment(createdAt).format('DD/MM/YYYY')
    return (
      <div className={this.props.response.isActive ? 'row' : 'row text-muted'}>
        <div className="text-truncate col-8">
          {this.props.response.path}
          <br />
          {this.props.response.description ? (
            <div><small className="text-info">{this.props.response.description}</small><br /></div>
          ) : ( null )}
          <span className="badge badge-pill badge-info ml-1">
              📅 {createdAtString}
          </span>
          {this.props.response.isActive ? (
            <span className="badge badge-pill badge-info ml-1">Active</span>
          ) : (
            <span className="badge badge-pill badge-warning ml-1">
              Disabled
            </span>
          )}
          {replaceDatesTag}
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            {this.renderEdit(this.props.response.id)}
            {this.props.response.isActive ? (
              <button
                onClick={() => this.handleIsActiveClick(this.props.response.id)}
                type="button"
                className="btn btn-info ml-1 btn-sm"
              >
                Disable
              </button>
            ) : (
              <button
                onClick={() => this.handleIsActiveClick(this.props.response.id)}
                type="button"
                className="btn btn-info ml-1 btn-sm"
              >
                Activate
              </button>
            )}
            <button
              onClick={() => this.handleReplaceDatesClick(this.props.response.id)}
              type="button"
              className="btn btn-info ml-1 btn-sm"
            >
              Render dates
            </button>
            <button
              onClick={this.handleCopyClick}
              type="button"
              className="btn btn-info ml-1 btn-sm"
            >
              Copy
            </button>
        </div>
      </div>
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
})(Response);
