import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { ref, firebaseAuth } from '../config/firebase'
import {registerSubstore, createSubstoreAction, dispatchSubstoreAction, Store} from '../actions';

export function auth (email, pw) {
	return firebaseAuth().createUserWithEmailAndPassword(email, pw)
		.then(saveUser)
}

export function signInWithGoogle() {
	const provider = new firebaseAuth.GoogleAuthProvider();
	return firebaseAuth().signInWithRedirect(provider)
}

export function logout () {
	return firebaseAuth().signOut()
}

export function login (email, pw) {
	return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
	return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
	return ref.child(`users/${user.uid}/info`)
		.set({
			email: user.email,
			uid: user.uid,
			photoURL: user.photoURL
		})
		.then(() => user)
}




firebaseAuth().onAuthStateChanged((user)=>{
	if(_.isObject(user)){
		console.log('lOGGED-IN: ', user);
		
		registerSubstore('USER');
		createSubstoreAction(
			'USER',
			'UPDATE_USER',
			((state, action) => {
				state.user = action.payload.user;
				return state;
			})
		);
		dispatchSubstoreAction(
			'USER',
			'UPDATE_USER',
			{
				user: user
			}
		);
		
	} else {
		console.log('LOGGED OUT');
		dispatchSubstoreAction(
			'USER',
			'UPDATE_USER',
			{}
		);
	}
});



// WEBPACK FOOTER //
// ./src/helpers/auth.js