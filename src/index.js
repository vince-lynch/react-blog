import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/bootstrap.css';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();