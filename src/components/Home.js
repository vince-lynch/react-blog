import React, { Component } from 'react';
import { signInWithGoogle, logout } from '../helpers/auth'
import {registerSubstore, createSubstoreAction, dispatchSubstoreAction, Store} from '../actions';
import RecentPosts from "./RecentPosts";
var currentState = {};

class Home extends Component {
	constructor(props) {
		super(props);
		
		console.log('Store', Store);
		this.state = {
			counter: 0
		};
		
		
		Store.subscribe(()=>{
			currentState = this.setState(Store.getState())
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
									Blogging Platform
								</h1>
								<p>Register now to make your own blog or edit pages</p>
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
					
					<div>
						<RecentPosts/>
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