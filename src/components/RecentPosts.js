import React, { Component } from 'react';
import { signInWithGoogle, logout } from '../helpers/auth'
import {registerSubstore, createSubstoreAction, dispatchSubstoreAction, Store} from '../actions';
import {fireBase} from "../config/firebase";
import {Link} from 'react-router-dom'
var currentState = {};


function getRecentPostsFromFirebase(){
	return new Promise((resolve, reject) =>{
		fireBase.database().ref('/pages/')
			.once('value')
			.then((snapshot) => {
				const postsObj = snapshot.val();
				let postsArr = [];
				Object.keys(postsObj).forEach((key)=>{
					const thePost = postsObj[key];
					thePost.id = key;
					postsArr.push(thePost);
				})
				resolve(postsArr);
			})
	})
}


class RecentPosts extends Component {
	constructor(props) {
		super(props);
		
		this.createUrlChange = this.createUrlChange.bind(this);

		this.state = {
			posts: []
		};
	}
	
	componentDidMount() {
		getRecentPostsFromFirebase()
			.then((posts)=>{
				this.setState({
					posts: posts,
					newUrl: ''
				});
		})
	}
	
	createUrlChange(event) {
		let newUrl = event.target.value.trim();
		this.setState({newUrl});
	}
	
	
	
	render() {
		console.log('this.state.posts', this.state.posts)
		return (
				<div className="container">
					<h5>Recent Posts</h5>
					<ul>
						{
							this.state.posts.map( post =>
								<li key={post.id}>
									<strong>title:</strong> {post.title}
									<p>
										<Link to={`/${post.id}`}>
											<button className="btn-primary">View</button>
										</Link>
										<Link to={`/${post.id}/edit`}>
											<button className="btn-warning">Edit</button>
										</Link>
									</p>
								</li>
							)
						}
					</ul>
					<p></p>
					<div>
						<h5>Create a new page</h5>
						<input type="text"
									 ref={ el => this.inputEl = el }
									 value={this.state.newUrl}
									 onChange={this.createUrlChange}/>
						<Link to={`/${this.state.newUrl}/edit`}>
							<button className="btn-success">Create</button>
						</Link>
						
					</div>
				</div>
		);
	}
}


export default RecentPosts;
