import React, { Component } from 'react';
import {fireBase} from '../config/firebase'
import renderHTML from 'react-render-html';

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



class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: {}
		}
	}
	
	
	componentDidMount() {
		getPageFromFirebase(this.props.passedProps.match.params.pageId)
			.then((page)=>{
				this.setState({
					page
				})
			})
	}
	
	
	render() {
			if(this.state.page.hasOwnProperty('title')){
			  const {page} = this.state;
				return (
					<div>
						<h1>{page.title}</h1>
						<div>
							{renderHTML(page.content)}
						</div>
					</div>
					)
			} else {
			  return <strong>Still loading...</strong>
			}
	}
}




export default Page;


// WEBPACK FOOTER //
// ./src/components/Home.js