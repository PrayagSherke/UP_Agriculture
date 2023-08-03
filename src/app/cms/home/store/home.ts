export class Home {
    email: string = ''
    password: string = ''
}

export class HomeResponse {
    
    constructor(private token: string) { }

    get userToken() {
        return this.token
    }
}