import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchPosts, deletePost } from "../actions";

class PostsIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  onDeleteClick(id) {
    return () => {
      this.props.deletePost(id, () => {
        // this.props.fetchPosts();
      });
    };
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="post-list-item list-group-item " key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <a
            className="pull-xs-right"
            href="#"
            onClick={this.onDeleteClick(post.id).bind(this)}
          >
            x
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, deletePost }
  )(PostsIndex)
);
