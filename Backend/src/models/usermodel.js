import db from "../db/init";
class User {
    constructor(Name,username,password){
        this.Name=Name;
        this.username=username;
        this.password=password;
    }
}
export default User;