import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/bootstrap.css';
import './assets/css/index.css';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();