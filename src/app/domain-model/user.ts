export class User {

	email: string;
	addresDevice: string;

	constructor() { }

	setUserLoggedIn() {		
		localStorage.setItem('logged', 'logged');
	}

	setLoggedOut() {
		localStorage.removeItem('logged');
	}

	isLoggedIn() {
		return localStorage.getItem('logged');
	}
}