import db from "../db/init";

class Department{
    constructor(departmentName,departmentCode)
    {
        this.departmentName=departmentName;
        this.departmentCode=departmentCode;
    }
    async save() {
        return db.collection('Department').add({
               'departmentName':this.departmentName,
               'departmentCode':this.departmentCode
        }).then(() =>{
            return new Promise((resolve,reject)=>{
                resolve(true);
            })
        }).catch(() =>{
            return new Promise((resolve,reject)=>{
                reject(true);
            })
        });
    }
} 

export default Department;