export class User {
    _id?: string;
    login?: string;
    email?: string; 
    password?: string; 
    role?: number;

    constructor(login:string, email:string, role:number) {
        this.email = email;
        this.login = login;
        this.role = role;
    }
    
}