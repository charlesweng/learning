import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import './styles/bootstrap.min.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
