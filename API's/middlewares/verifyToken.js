const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyToken=(request,response,next)=>{
    //get bearer token from req.headers
    //const bearerToken=request.headers.authorization
    const token=request.query.data
    if(token!==undefined){
        //const token=bearerToken.split(" ")[1]
        try{
            jwt.verify(token,"process.env.SECRET_KEY")
            next()
        }
        catch(err){
            next(new Error("Session expired, please login again!"))
        }
    }else{
        response.send({message:"Unauthorized access...Please login first"})
    }
} 

module.exports=verifyToken