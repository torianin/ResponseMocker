import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { createResponse } from "../actions";

function ResponseCreate(props) {
  const dispatch = useDispatch();

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
    if (!values.path) {
      errors.path = "Path cannot be an empty";
    }
    if (!values.content) {
      errors.content = "Content cannot be an empty";
    }
    return errors;
  };

  const renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <label htmlFor="content">{label}</label>
        <input className="form-control" {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (values) => {
    dispatch(createResponse(values));
  };

  return (
    <div className="row p-3">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <Field name="path" component={renderInput} label="Path" />
                <Field name="content" component={renderInput} label="Content" />
                <Field
                  name="description"
                  component={renderInput}
                  label="Description"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
}

export default ResponseCreate;
