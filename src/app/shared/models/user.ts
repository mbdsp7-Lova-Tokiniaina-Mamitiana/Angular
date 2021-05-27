export class User {
    _id?: string;
    login?: string;
    email?: string;
    password?: string;
    role?: string;

    constructor(login: string, email: string, role: string) {
        this.email = email;
        this.login = login;
        this.role = role;
    }
}
