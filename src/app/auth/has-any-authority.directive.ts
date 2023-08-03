import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Directive({
	selector: '[hasAnyAuthority]',
})
export class HasAnyAuthorityDirective {
	private jwtHelper: JwtHelperService = new JwtHelperService();
	private authorities: string[];
	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {}

	@Input()
	set hasAnyAuthority(value: string | string[]) {
		this.authorities =
			typeof value === 'string' ? [<string>value] : <string[]>value;
		this.updateView();
		// Get notified each time authentication state changes.
	}
	private updateView(): void {
		this.hasAnyAuthorityDirect(this.authorities).subscribe((authorized) => {
			this.viewContainerRef.clear();
			if (authorized) {
				this.viewContainerRef.createEmbeddedView(this.templateRef);
			}
		});
	}
	hasAnyAuthorityDirect(authorities: string[]): Observable<boolean> {
		let roleExists: boolean = false;
		let permission: any = sessionStorage.getItem('permissionsName');
		let permissionArray = permission.split(',');
		if (
			permission != null &&
			permission != undefined &&
			permission.length > 0
		) {
			for (let i = 0; i < authorities.length; i++) {
				let role = authorities[i];
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
		}

		return of(roleExists);
	}
}
