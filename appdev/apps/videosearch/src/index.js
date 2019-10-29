import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//TODO:: https://stackoverflow.com/questions/49108136/importing-env-variable-react-front-end
const API_KEY = 'AIzaSyBKHe5zIoS5mwdKvAnR1gQRFuRDRPiUCQ0';

// Create a new component. This component should produce some html.
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Diablo 3');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      //{ videos } => { videos : videos } ES6
      this.setState({
        videos: videos,
        selectedVideo: (videos && videos.length > 0) ? videos[0] : null
       });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>

        <SearchBar onSearchTermChange={videoSearch} />

        <VideoDetail video={this.state.selectedVideo} />

        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />

      </div>
    );
  }

}

// Take this component's HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));




// No JSX
// const App = function() {
//   return React.createElement('div', null, 'Hi!');
// }
//
// ReactDOM.render(React.createElement(App, null), document.querySelector('.container'));
