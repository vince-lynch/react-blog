import firebase from 'firebase'


var config = {
	apiKey: "AIzaSyBO1av7JmzMQXmfTo8N3uuzH_n4ZqrAUFw",
	authDomain: "react-blog-75a68.firebaseapp.com",
	databaseURL: "https://react-blog-75a68.firebaseio.com",
	projectId: "react-blog-75a68",
	storageBucket: "",
	messagingSenderId: "168243295352"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const fireBase = firebase;


// WEBPACK FOOTER //
// ./src/config/firebase.js