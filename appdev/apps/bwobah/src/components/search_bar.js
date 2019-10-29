import React, {Component} from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar input-group">
        <input className="form-control" placeholder="Search" />
      </div>
    );
  }
}

export default SearchBar;
