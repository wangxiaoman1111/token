'use strict';

const Controller = require('egg').Controller;
const jwt=require("jsonwebtoken")
class UserController extends Controller {
  async login() {
    const {ctx} = this;
    console.log(ctx.request.body)
    let {
      username,
      password
    } = ctx.request.body
    console.log(username,password)
    let data = await ctx.service.user.login(username, password)
    //     let flag = data.some(item => {
    //       console.log(item)
    //   return item.username == username && item.password == password
    // })
    console.log(data)
    if(data.length!=0)
    {
      let token=jwt.sign({...data},"wangxiaoman",{expiresIn:120})
      ctx.body={
        code:0,
        msg:'登录成功',
        token:token
      }
    }else{
      ctx.bodu={
        code:0,
        msg:"登录失败"
      }
    }
   
    // if (data.length) {
    //   ctx.body = {
    //     code: 1,
        
    //   }
    // } else {
    //   ctx.body = {
    //     code: 0,
        
    //   }
    // }

  }
  async list(){
    let {ctx}=this
    let data=await this.service.user.list()
    ctx.body=data
  }
}

module.exports = UserController;