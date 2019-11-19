'use strict';
const Service=require("egg").Service


class UserService extends Service {
  async login(username,password) {
    let data=await this.app.mysql.get("login",{username,password})
    console.log(username,password)
    return data
}
async list(){
    let data=await this.app.mysql.query("select * from login")
    return data
}
}

module.exports = UserService;
