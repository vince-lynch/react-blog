import React, { Component } from 'react';
import {fireBase} from '../config/firebase'
// Require Editor JS files.
import RichTextEditor from 'react-rte';

var pageId;


function getPageFromFirebase(pageId){
	return new Promise((resolve, reject) =>{
		fireBase.database().ref('/pages/' + pageId)
			.once('value')
			.then((snapshot) => {
				console.log('thenREACHED', snapshot.val())
				if(snapshot.val() === null){
					//create new post
					const newPost = {
						title: pageId,
						content: '',
						desc: '',
						authorId: 123
					}
					fireBase.database().ref('/pages/').child(pageId).set(newPost);
					resolve(newPost)
				} else {
					resolve(snapshot.val());
				}
			})
	})
}

function updatePageContent(content, page){
	page.content = content;
	fireBase.database().ref('/pages/' + pageId).update(page).then(()=>{
		console.log('firebase page updated')
	});
}

function updatePageTitle(title, page){
	page.title = title;
	fireBase.database().ref('/pages/' + pageId).update(page).then(()=>{
		console.log('firebase page updated')
	});
}



class EditPage extends Component {
	constructor(props) {
		super(props);
		console.log('this.props', this.props);
		
		this.handleTitleChange = this.handleTitleChange.bind(this);
		
		this.state = {
			page: {
				title: ''
			},
			value: RichTextEditor.createEmptyValue()
		}
	}
	
	onChange = (value) => {
		this.setState({value});
		if (this.props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			this.props.onChange(
				value.toString('html')
			);
		}
		updatePageContent(value.toString('html'), this.state.page)
	};
	
	handleTitleChange(event) {
		const page = this.state.page;
		page.title = event.target.value;
		this.setState({page});
		updatePageTitle(page.title, page)
	}
	
	componentDidMount() {
		pageId = this.props.passedProps.match.params.pageId;
		getPageFromFirebase(pageId)
			.then((page)=>{
				console.log('got page', page);
				if(page.hasOwnProperty('content')){
					RichTextEditor.stateFromHTML = page.content;
				} else {
					RichTextEditor.stateFromHTML = '<span>Content goes here</span>';
				}
				
				this.setState({
					page,
					value: RichTextEditor.createValueFromString(RichTextEditor.stateFromHTML, 'html')
				})
			})
		
	}
	
	
	
	render() {
			return (
				<div>
					<input type="text"
								 className="page-titlebar"
								 ref={ el => this.inputEl = el }
								 value={this.state.page.title}
								 onChange={this.handleTitleChange}
								 placeholder="Title"/>
					<RichTextEditor
						value={this.state.value}
						onChange={this.onChange}
					/>
				</div>
			)
	}
}


export default EditPage;
