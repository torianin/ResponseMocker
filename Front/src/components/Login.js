import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, signIn, signOut } from '../actions';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <p>
          <small>Error: {error}</small>
        </p>
      );
    }
  }

  renderInput = ({ input, label, meta, type }) => {
    return (
      <div>
        <label htmlFor="content">{label}</label>
        <input className="form-control" type={type} {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.login(formValues);
  };

  render() {
    if (this.props.isSignedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="row p-3">
          <form
            className="w-100"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="form-group">
              <div className="form-group">
                <Field
                  name="login"
                  component={this.renderInput}
                  label="Login"
                  type="text"
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  label="Password"
                  type="password"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      );
    }
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.login) {
    errors.path = 'Login cannot be an empty';
  }
  if (!formValues.password) {
    errors.content = 'Password cannot be an empty';
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

const formWrapped = reduxForm({ form: 'login', validate })(Login);
export default connect(mapStateToProps, { login, signOut })(formWrapped);
