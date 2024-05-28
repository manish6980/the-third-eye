const exp=require("express")
const userApp=exp.Router()
require("dotenv").config()

const expressAsyncHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifyToken=require("./middlewares/verifyToken")

const multerObj=require('./middlewares/cloudinaryconfig')

userApp.use(exp.json())


userApp.get('/get-users', expressAsyncHandler(async (request, response) => {
    try {
      console.log("Before fetching users");
      const userCollectionObj = request.app.get("userCollectionObj");
      let dbRes = await userCollectionObj.find().toArray();
      console.log("After fetching users", dbRes);
      response.status(200).send({ message: "List of Users", payload: dbRes });
    } catch (error) {
      console.error('Error fetching users:', error);
      response.status(500).send({ message: "Internal Server Error" });
    }
  }));
  
// get user by username
userApp.get('/get-user/:username',verifyToken,expressAsyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    let userName=request.params.username
    let dbRes= await userCollectionObj.findOne({username:userName})
    if(dbRes!=null){
        delete dbRes.password
        response.status(200).send({meassage:`User with username - ${userName}:`,payload:dbRes})
    }else{
        response.send({message:"User doesn't exist"})
    }
}))


// userApp.post('/user-signup',expressAsyncHandler(async(request,response)=>{
//     const userCollectionObj=request.app.get("userCollectionObj")
//     console.log(request)
//     const newUser=JSON.parse(request.body.user)
    
//     let userOfDb=await userCollectionObj.findOne({username:newUser.username})
//     // response.status(201).send({message:"User Created"})
//     if(userOfDb!=null){
//         response.status(200).send({message:"User already existed"})
//     }else{
//         //add cdn link of cloudinary image
//         // newUser.image=request.file.path
//         let hashedPassword= await bcryptjs.hash(newUser.password,5) 
//         newUser.password=hashedPassword
//         newUser.latitude=0
//         newUser.longitude=0
//         newUser.accuracy=0
//         await userCollectionObj.insertOne(newUser) 
//         response.status(201).send({message:"User created"})
//     } 
// })) 

// update user 
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
    let modifiedUser=request.body
    let userName=modifiedUser.username
    let dbRes1= await userCollectionObj.findOne({username:userName})
    if(dbRes1!=null){
    await userCollectionObj.updateOne({username:{$eq:modifiedUser.username}},{$set:{...modifiedUser}})
    response.status(200).send({meassage:`User with username - ${modifiedUser.username} updated`})
    }
    else{
        response.send({message:`User with username ${modifiedUser.username} doesn't exist`})
    }
}))

// delete user
userApp.delete('/delete-user/:username',expressAsyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    let userName=request.params.username
    let dbRes=await userCollectionObj.deleteOne({username:userName})
    if(dbRes!=null){
        response.status(200).send({meassage:`User with username - ${userName} deleted`})
    }else{
        response.send({message:"User doesn't exist"})
    }
})) 

userApp.post('/user-signup',multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    const newUser=JSON.parse(request.body.user)
    let userOfDb= await userCollectionObj.findOne({username:newUser.username})
    if(userOfDb!=null){
        response.status(200).send({message:"User already existed"})
    }else{
        //add cdn link of cloudinary image
        newUser.image=request.file.path
        let hashedPassword= await bcryptjs.hash(newUser.password,5) 
        newUser.password=hashedPassword
        newUser.latitude=0
        newUser.longitude=0
        newUser.accuracy=0
        await userCollectionObj.insertOne(newUser) 
        response.status(201).send({message:"User created"})
    } 
}))

userApp.post('/user-login',expressAsyncHandler(async(request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    const userCredObj=request.body
    let userOfDb= await userCollectionObj.findOne({username:userCredObj.username})
    if(userOfDb!==null){
        let isEq=await bcryptjs.compare(userCredObj.password,userOfDb.password)
        if(isEq!==false){
            let jwtToken=jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:"2 days"})
            delete userOfDb.password
            response.status(200).send({message:"Success",token:jwtToken,user:userOfDb})
        }else{
            response.send({message:"Invalid password"})
        }
    }else{
        response.send({message:"Invalid username"})
    }
}))

userApp.post('/update-location', async(req, res) => {
    //console.log("in update location")
    //console.log(req)
    const userCollectionObj=req.app.get("userCollectionObj")
    const userCredObj=req.body
    //console.log(userCredObj.longitude)
    let userOfDb= await userCollectionObj.findOne({username:userCredObj.username})
    if(userOfDb!=null){
        await userCollectionObj.updateOne({username:userCredObj.username},{$set:{latitude:userCredObj.latitude}})
        await userCollectionObj.updateOne({username:userCredObj.username},{$set:{longitude:userCredObj.longitude}})
        await userCollectionObj.updateOne({username:userCredObj.username},{$set:{accuracy:userCredObj.accuracy}})
    }
    else{
        res.send({message:"Invalid"})
    }
  });


//private route
userApp.get("/test",verifyToken,(request,response)=>{
    response.send({message:"reply from private route"})
})

module.exports=userApp;