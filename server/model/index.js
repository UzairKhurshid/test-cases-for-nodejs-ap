const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    phone:{
        type:String
    },
    avatar:{
        type:String
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User