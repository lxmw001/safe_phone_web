import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../domain-model/user';

@Component({
	selector: 'app-set-mac-device',
	templateUrl: './set-mac-device.component.html',
	styleUrls: ['./set-mac-device.component.css'],
  	providers: [User]
})
export class SetMacDeviceComponent implements OnInit {

	macAddress: string = '';
	alreadyAssociated: boolean = false;

	suscriptionList: any;


	constructor(public af: AngularFireDatabase, private user:User) { }

	ngOnInit() {
		this.verifyAssignedMacAddresToCurrentUser(null);
	}

	verifyAssignedMacAddresToCurrentUser(successCallback) {
		let userIdList = this.getUserIdList();
		this.suscriptionList = userIdList.subscribe(idsList => {
			idsList.forEach(item => {
				if(item.$key === this.user.getUserId()) {
					this.macAddress = item.$value;
					this.user.setMacAddresDevice(this.macAddress).subscribe(() => {
				    	successCallback();
				    });
					this.alreadyAssociated = true;
				}
			});
			this.unsuscribeListIdUsers();
		});
	}

	setMacAddress() {
		this.verifyIfMacAddressExists();
	}

	verifyIfMacAddressExists() {
		let usersUIDList = this.getUserIdList();
		this.suscriptionList = usersUIDList.subscribe(userList => {
			let macAddressAsignedToUser = false;
			userList.forEach(item => {
				if(item.$value === this.macAddress || item.$key === this.user.getUserId()) {
					macAddressAsignedToUser = true;
				}
			});

			this.unsuscribeListIdUsers();
			if(macAddressAsignedToUser) {
				console.log('la direccion ya esta agregada a otro usuario o el usuario ya tiene una direccion asignada');
			} else {
				// this.findMacAddresOnDeviceData();
				// asignarle el macaddres al usuario
				console.log('asignando macaddres al usuario');
				usersUIDList.set(this.user.getUserId(), this.macAddress);
				this.user.setMacAddresDevice(this.macAddress);
				this.alreadyAssociated = true;
			}
		});
	}

	getUserIdList() {
		return this.af.list('/serverData/', { preserveSnapshot: false });
	}

	unsuscribeListIdUsers() {
		this.suscriptionList.unsubscribe();
	}

	findMacAddresOnDeviceData() {
		let macAddressObject = this.af.object('/deviceData/' + this.macAddress, { preserveSnapshot: false });
		macAddressObject.subscribe(snapshot => {
			if(snapshot.$value === null) {//no existen datos de este usuario
				// presentar error
				console.log('no existe la direccion ingresada');
			} else {
				// agregar la direccion al usuario

			}
		});
	}

}
