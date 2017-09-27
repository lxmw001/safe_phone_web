import { Component } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  providers: [AsyncLocalStorage]
})

export class User {

	id: string;
	email: string;
	macAddresDevice: string;

	public constructor(protected storage: AsyncLocalStorage) {}

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
		return this.storage.setItem('macAddress', macAddress);
	}

	getMacAddresDevice() {
		return this.storage.getItem('macAddress');
	}
}