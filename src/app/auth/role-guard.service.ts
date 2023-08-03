import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate,
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { AppGlobals } from '../global/app.global';

@Injectable({
	providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
	constructor(private snackBar: MatSnackBar, 
		//public appGlobals: AppGlobals
		) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		let roles: any = route.data['roles'] as Array<string>;
		let permission: any = sessionStorage.getItem('permissionsName');
		let permissionArray = permission.split(',');
		if (
			permissionArray != null &&
			permissionArray != undefined &&
			permissionArray.length > 0
		) {
			let roleExists: boolean = false;
			for (let i = 0; i < roles.length; i++) {
				let role = roles[i];
				let found: boolean = false;
				permissionArray.filter((e:any) => {
					if (e == role) {
						found = true;
						return;
					}
				});

				if (found) {
					roleExists = true;
					break;
				}
			}
			if (roleExists == false) {
				this.snackBar.open('Permission Denied', 'X', {
					duration: 2000,
					panelClass: ['red-snackbar'],
				});
			}
			return roleExists;
		}
		return false;
	}
}
