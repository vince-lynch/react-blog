import {createStore} from "redux";
import firebase from "firebase";

var initialState = {
	counter: 0,
	user: {}
}

const storeReducers = {
	// are added here dynamically from components
}



const reducers = (state = initialState, action) => {
	if(Object.keys(storeReducers).includes(action.substore)){
		if(Object.keys(storeReducers[action.substore]).includes(action.type)){
			return storeReducers[action.substore][action.type](state, action);
		} else if(action.type == 'REGISTER-ACTION') {
			console.log('[STORE] - ACTION NOT FOUND REGISTERING', action.type);
			storeReducers[action.substore][action.action] = action.reducer;
			console.log(storeReducers)
		} else if(action.type == 'LIST-GROUPS'){
			console.log('[STORE] - LIST GROUPS', storeReducers);
			return storeReducers;
		} else {
			return state;
		}
	} else if (action.type == 'REGISTER-SUBSTORE'){
		storeReducers[action.substore] = {};
		console.log('[STORE] - substore ' + action.substore + ' created');
	} else {
		console.log('[STORE] - ' + action.substore + ' substore not registered')
	}
	
}

const store = createStore(reducers);


export function registerSubstore(nameOfSubstore){
	store.dispatch({
		type: 'REGISTER-SUBSTORE',
		substore: nameOfSubstore.toUpperCase()
	})
}

export function createSubstoreAction(nameOfSubstore, nameOfAction, actionFn){
	store.dispatch({
		substore: nameOfSubstore.toUpperCase(),
		type: 'REGISTER-ACTION',
		action: nameOfAction.toUpperCase(),
		reducer: actionFn
	})
}

export function dispatchSubstoreAction(nameOfSubstore, typeOfAction, payload){
	store.dispatch({
		substore: nameOfSubstore.toUpperCase(),
		type: typeOfAction.toUpperCase(),
		payload: payload
	})
}

export const Store = store;

