import React, { Component } from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
var store;
var currentState = {};

class App extends Component {
	constructor(props) {
		super(props);
		store = this.props.store;
		this.state = {
			counter: 0
		};
		
		store.dispatch({
			type: 'REGISTER-SUBSTORE',
			substore: 'HOMEPAGE'
		})
		
		store.dispatch({
			substore: 'HOMEPAGE',
			type: 'REGISTER-ACTION',
			action: 'INCREMENT',
			reducer: ((state) => {
				state.counter = state.counter + 1;
				return state;
			})
		})
		
		store.dispatch({
			substore: 'HOMEPAGE',
			type: 'REGISTER-ACTION',
			action: 'DECREMENT',
			reducer: ((state) => {
				state.counter = state.counter - 1;
				return state;
			})
		})
		
		store.subscribe(()=>{
			console.log('store changed', store.getState());
			currentState = this.setState(store.getState())
			
			console.log('this.state', this.state)
		})
	}
	
	
	increment(){
		store.dispatch({
			substore: 'HOMEPAGE',
			type: 'INCREMENT'
		})
	}
	
	
	decrement(){
		store.dispatch({
			substore: 'HOMEPAGE',
			type: 'DECREMENT'
		})
	}
	
  render() {
    return (
    	<div>
				<h1>
					{this.state.counter}
				</h1>
				<button onClick={this.increment}>Up</button>
				<button onClick={this.decrement}>Down</button>
      </div>
    );
  }
}




export default App;