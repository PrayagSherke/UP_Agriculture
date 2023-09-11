export class Login {
    email: string = ''
    password: string = ''
}

export class LoginResponse {
    
    constructor(private token: string) { }

    get userToken() {
        return this.token
    }
}