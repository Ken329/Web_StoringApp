const {response} = require('express')
const mysql = require('mysql')
let instance = null;
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'storingapp'
});

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log('db ' + connection.state)
    }
})
class dbService{
    static getDbServiceInstance(){
        return instance ? instance : new dbService()
    }
    async submitData(first, last, age, kg, height){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO `user`(`id`, `first_name`, `last_name`, `age`, `kg`, `height`) VALUES (?,?,?,?,?,?)"
    
                connection.query(query, [null, first, last, age, kg, height], (err, result)=>{
                    if(err) throw err   
                    resolve(result.affectedRows);
                })
            })
            return response === 1 ? true : false
        }catch(error){
            console.log(error)
            return false
        }
    }
    async getInfoData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from user"

                connection.query(query,  (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
            return
        }
    }
}
module.exports = dbService;