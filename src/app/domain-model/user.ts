export class User {

	id: string;
	email: string;
	macAddresDevice: string;

	constructor() { }

	setUserLoggedIn() {
		localStorage.setItem('logged', 'logged');
	}

	setLoggedOut() {
		localStorage.removeItem('logged');
	}

	isLoggedIn() {
		return !!localStorage.getItem('logged');
	}

	setUserId(userId: string) {
		localStorage.setItem('userId', userId);
	}

	getUserId() {
		return localStorage.getItem('userId');
	}

	setMacAddresDevice(macAddress: string) {
		localStorage.setItem('macAddress', macAddress);
	}

	getMacAddresDevice() {
		return localStorage.getItem('macAddress');
	}
}