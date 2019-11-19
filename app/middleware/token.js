let whitePath=["/login"]
let jwt=require("jsonwebtoken")
module.exports=()=>{
    return async (ctx,next)=>{
        if(whitePath.includes(ctx.path)){
            await next()
        }else{
            let token=ctx.request.headers.token
            if(!token){
                ctx.body={
                    code:-1,
                    msg:"没有权限"
                }
                return 
            }else{
                try{
                    let info=jwt.verify(token,"wangxiaoman")
                    console.log(info)
                    await next()
                }catch(e){
                    if(e.name=="TokenExpiredError")
                    {
                        ctx.body={
                            code:0,
                            msg:"权限过期"
                        }
                    }
                }
            }
        }
    }
}