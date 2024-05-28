const exp=require("express")
const proApp=exp.Router()

proApp.get('/get-products',(request,response)=>{
    response.send({message:"All Products"})
})

proApp.post('/create-product',(request,response)=>{
    response.send({message:"New Product created"})
})

proApp.delete('/delete-product',(request,response)=>{
    response.send({message:"Product deleted"})
}) 

module.exports=proApp