import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './actions';
import App from './App';


const Routes = () => (
	<Provider store={store}>
		<Router>
			<Route path="/" exact
					 render={(props) => (
						 <div>
							 <App store={store}></App>
						 </div>
					 )}
			/>
		</Router>
	</Provider>
)


export default Routes;
