import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {this.props.history.push('/')});
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (<div>Loading Post...</div>);
    }

    return (
      <div>
        <Link
          className="btn btn-primary"
          to="/"
        >
          Back
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories} </h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost })(PostsShow));
