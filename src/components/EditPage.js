import React, { Component } from 'react';
import {fireBase} from '../config/firebase'
var currentState = {};

function getPageFromFirebase(pageId){
	return new Promise((resolve, reject) =>{
		fireBase.database().ref('/pages/' + pageId)
			.once('value')
			.then((snapshot) => {
				resolve(snapshot.val());
			})
	})
}



class EditPage extends Component {
	constructor(props) {
		super(props);
		console.log('this.props', this.props);
		this.state = {
			page: {}
		}
	}
	
	stateUpdated(){
		console.log('State updated', this.state)
	}
	
	componentDidMount() {
		getPageFromFirebase(this.props.passedProps.match.params.pageId)
			.then((page)=>{
				this.setState({
					page
				})
			})
		
		console.log('!!!! -  this.state', this.state)
	}
	
	
	render() {
		console.log('!!!! -  this.state', this.state)
		if(this.state.page.hasOwnProperty('title')){
			const {page} = this.state;
			return (
				<div>
					<span>[Editing]</span>
					<h1>{page.title}</h1>
					<div>
						{page.content}
					</div>
				</div>
			)
		} else {
			return <strong>Still loading...</strong>
		}
	}
}


export default EditPage;
