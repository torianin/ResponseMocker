import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { login, signIn, signOut } from "../actions";
import { Redirect } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <p>
          <small>Error: {error}</small>
        </p>
      );
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.path = "Login cannot be an empty";
    }
    if (!values.password) {
      errors.content = "Password cannot be an empty";
    }
    return errors;
  };

  const renderInput = ({ input, label, meta, type }) => {
    return (
      <div>
        <label htmlFor="content">{label}</label>
        <input className="form-control" type={type} {...input} />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  if (isSignedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="row p-3">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className="w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-group">
                  <Field
                    name="login"
                    component={renderInput}
                    label="Login"
                    type="text"
                  />
                  <Field
                    name="password"
                    component={renderInput}
                    label="Password"
                    type="password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Login;
