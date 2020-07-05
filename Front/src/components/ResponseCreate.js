import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createResponse } from '../actions';

class ResponseCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <p>
          <small>Error: {error}</small>
        </p>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <label htmlFor="content">{label}</label>
        <input className="form-control" {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.createResponse(formValues);
  };

  render() {
    return (
      <div className="row p-3">
        <form
          className="w-100"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className="form-group">
            <div className="form-group">
              <Field name="path" component={this.renderInput} label="Path" />
              <Field
                name="content"
                component={this.renderInput}
                label="Content"
              />
              <Field
                name="description"
                component={this.renderInput}
                label="Description"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.path) {
    errors.path = 'Path cannot be an empty';
  }
  if (!formValues.content) {
    errors.content = 'Content cannot be an empty';
  }
  return errors;
};

const formWrapped = reduxForm({ form: 'responseCreate', validate })(
  ResponseCreate
);
export default connect(null, { createResponse })(formWrapped);
