import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { editResponse, deleteResponse } from "../actions";
import { useParams } from "react-router-dom";
import _ from "lodash";
import history from "../history";

function ResponseEdit(props) {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const { responses, response } = useSelector((state) => ({
    response: state.responses[slug],
  }));

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

  const renderCheckbox = ({ input, label, meta, disabled }) => {
    return (
      <div>
        <label htmlFor="content">{label}</label>
        <input className="form-control" {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (values) => {
    dispatch(editResponse(slug, values));
    history.push("/");
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteResponse(slug));
    history.push("/");
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
                <Field
                  name="path"
                  component={renderInput}
                  label="Path"
                  initialValue={response.path}
                />
                <Field
                  name="content"
                  component={renderInput}
                  label="Content"
                  initialValue={response.content}
                />
                <Field
                  name="description"
                  component={renderInput}
                  label="Description"
                  initialValue={response.description}
                />
                <label>
                  <Field
                    name="isActive"
                    component="input"
                    type="checkbox"
                    initialValue={response.isActive}
                  />
                  Active
                </label>
                <label>
                  <Field
                    name="replaceDates"
                    component="input"
                    type="checkbox"
                    initialValue={response.replaceDates}
                  />
                  Render dates
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              type="button"
              className="btn btn-danger ml-1"
            >
              Remove
            </button>
          </form>
        )}
      />
    </div>
  );
}

export default ResponseEdit;
