import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";
class PostsNew extends Component {
  // {...field.input} =>
  // onChange={field.input.onChange}
  // onFocus={field.input.onFocus}
  // onBlur={field.input.onBlur}
  renderField(field) {
    const {
      meta: { submitFailed, error }
    } = field;
    const formGroupClassName = `form-group ${
      submitFailed && error ? "has-danger" : ""
    }`;
    return (
      <div className={formGroupClassName}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{submitFailed ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    //this === component
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Post Title" name="title" component={this.renderField} />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // validate the inputs from `values`
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  withRouter(
    connect(
      null,
      { createPost }
    )(PostsNew)
  )
);
