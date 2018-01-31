import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Store} from './actions';
import Home from './components/Home';

const Routes = () => (
	<Provider store={Store}>
		<Router>
			<Route path="/" exact
						 render={(props) => (
							 <div>
								 <Home store={Store}></Home>
							 </div>
						 )}
			/>
		</Router>
	</Provider>
)


export default Routes;
