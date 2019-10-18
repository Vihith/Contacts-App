const mongoose=require('mongoose')

mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/contact',{useNewUrlParser:true})
.then(()=>{
    console.log('connected to DB')
})
.catch((err)=>{
    console.log('error while connecting to DB',err)
})

module.exports=mongoose