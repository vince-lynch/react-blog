import React, { Component } from 'react';
import { signInWithGoogle, logout } from '../helpers/auth'
import {registerSubstore, createSubstoreAction, dispatchSubstoreAction, Store} from '../actions';
var currentState = {};

class Home extends Component {
	constructor(props) {
		super(props);
		
		console.log('Store', Store);
		this.state = {
			counter: 0
		};
		
		registerSubstore('HOMEPAGE');
		// Create INCREMENT action
		createSubstoreAction(
			'HOMEPAGE',
			'INCREMENT',
			((state) => {
				state.counter = state.counter + 1;
				return state;
			})
		);
		// CREATE DECREMENT ACTION
		createSubstoreAction(
			'HOMEPAGE',
			'DECREMENT',
			((state) => {
				state.counter = state.counter - 1;
				return state;
			})
		);
		
		
		
		
		Store.subscribe(()=>{
			console.log('store changed', Store.getState());
			currentState = this.setState(Store.getState())
			
			console.log('this.state', this.state)
		})
	}
	
	register(){
		signInWithGoogle()
			.catch((error) => {
				console.log('signInWithGoogle - error', error);
			})
	}
	
	logoutBtn(){
		logout();
	}
	
	
	increment(){
		dispatchSubstoreAction(
			'HOMEPAGE',
			'INCREMENT',
			{}
		);
	}
	
	
	decrement(){
		dispatchSubstoreAction(
			'HOMEPAGE',
			'DECREMENT',
			{}
		);
	}
	
	render() {
		return (
			
			<div>
				<nav className="navbar navbar-inverse bg-primary">
				</nav>
				
				<div className="jumbotron">
					<div className="container">
						<div className="row">
							<div className="col-md-8">
								<h1>
									{this.state.counter}
								</h1>
								<button onClick={this.increment}>Up</button>
								<button onClick={this.decrement}>Down</button>
								<p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
								<p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
							</div>
							<div className="col-md-4">
								{!this.state.user
									?
									<div>
										<h2>Register Here</h2>
										<button onClick = {this.register}>Signin with Google</button>
									</div>
									:
									<div>
										<h2>{this.state.user.displayName}</h2>
										<strong>You are logged in</strong>
										<p>
											<button onClick = {this.logoutBtn}>Logout</button>
										</p>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				
				<div className="container">
					
					<div className="row">
						<div className="col-md-4">
							<h2>Heading</h2>
							<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
							<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-md-4">
							<h2>Heading</h2>
							<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
							<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-md-4">
							<h2>Heading</h2>
							<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
							<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
						</div>
					</div>
					
					<hr></hr>
					
					<footer>
						<p>&copy; Company 2015</p>
					</footer>
				</div>
			</div>
		);
	}
}




export default Home;


// WEBPACK FOOTER //
// ./src/components/Home.js