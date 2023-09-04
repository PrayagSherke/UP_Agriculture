import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../shared/services/common.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private jwtHelper: JwtHelperService = new JwtHelperService();
	constructor(private commonService: CommonService) { }

	public isAuthenticated(): boolean {
		const token = this.commonService.getTokenHeader()
		if (token.Authorization == "Bearer null") {
			return false;
			//return !this.jwtHelper.isTokenExpired(token); //TODO
		}
		else if (token != null && token != undefined) {
			return true;
		}
		else {
			return false;
		}
	}
}
