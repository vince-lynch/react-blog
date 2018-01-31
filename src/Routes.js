import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Store} from './actions';
import Home from './components/Home';
import Page from './components/Page';
import EditPage from './components/EditPage';

const Routes = () => (
		<Router>
			<div>
				<Route path="/" exact
							 render={(props) => (
								 <div>
									 <Home></Home>
								 </div>
							 )}
				/>
				<Route path="/:pageId" exact
							 render={(props) => (
								 <div>
									 <Page passedProps={props}></Page>
								 </div>
							 )}
				/>
				<Route path="/:pageId/edit" exact
							 render={(props) => (
								 <div>
									 <EditPage passedProps={props}></EditPage>
								 </div>
							 )}
				/>
			</div>
		</Router>
)


export default Routes;
