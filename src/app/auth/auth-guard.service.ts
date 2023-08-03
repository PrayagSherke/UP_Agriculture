import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	constructor(
		public auth: AuthService,
		public router: Router,
		private snackBar: MatSnackBar
	) {}

	canActivate(): boolean {
		if (!this.auth.isAuthenticated()) {
			this.snackBar.open('Kindly Login To Continue', 'X', {
				duration: 2000,
				panelClass: ['red-snackbar'],
			});
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}
}
