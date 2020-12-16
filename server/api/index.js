const express=require('express')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const multer= require('multer')
const path= require('path')
const User=require('../model/index')
const auth=require('../auth/auth')
const e = require('express')
const router=express.Router()


const fileDir=path.join(__dirname,'../../public/files')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, fileDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

/////////////////////////////////////////test Routes//////////////////////////////////////////////
router.get('/',(req,res)=>{
    console.log("working")
    res.send('working')
})

router.get('/message', function (req, res) {
    res.send('This is the message');
});

router.get('/media', function (req, res) {
var response = {
podcasts: [{
      "description": "some text",
      "id": 574,
      "title": "Why long-term value is a winning bet",
      "media": "podcast",
      "publishedDate": "2018-12-19T18:00:00.000Z",
      "isLive": true,
      "isDeleted": false,
      "link": "https://podcasts.com/574",
      "createdAt": "2018-12-20T06:30:00.618Z",
      "updatedAt": "2019-01-31T06:30:00.864Z"
   }],
total: 1
}
if (response.podcasts.length > 0) {
    res.send(response);
} else {
var errorObj = {
    httpCode: 404,
    message: 'NOT_FOUND',
    description: 'The resource referenced by request does not exists.',
    details: 'Podcast is not available'
}
res.status(404);
res.send(errorObj)
}
});


router.get('/users',async(req,res)=>{
    try {
        const users=await User.find()
        if(!users){
            return res.status(200).json({
                msg:'success',
                users:[]
            })
        }
        return res.status(200).json({
            msg:'success',
            users:users
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.get('/user/:id',async(req,res)=>{
    const userID=req.params.id
    try {
        const user=await User.findById({_id:userID})
        if(!user){
            throw new Error('user not found!')
        }
        return res.status(200).json({
            msg:'success',
            user:user
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.get('/user/:id',async(req,res)=>{
    const userID=req.params.id
    try {
        const user=await User.findById({_id:userID})
        if(!user){
            throw new Error('user not found!')
        }
        return res.status(200).json({
            msg:'success',
            user:user
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.post('/addUser',async(req,res)=>{
    try {
        console.log('1')
        const user=new User(req.body)
        await user.save()
        console.log('2')
        return res.status(200).json({
            msg:'success',
            user:user
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
}) 

router.post('/updateUser/:id',async(req,res)=>{
    const userID=req.params.id
    try {
        const user=await User.findById({_id:userID})
        if(!user){
            throw new Error('user not found!')
        }
        Object.assign(user, req.body).save((err, u) => {
            if(err) res.send(err);
            res.status(200).json({ message: 'User updated!', user: u });
        });
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.get('/deleteUser/:id',async(req,res)=>{
    const userID=req.params.id
    try {
        console.log('userID :'+userID)
        const user=await User.findByIdAndDelete({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            throw new Error('user not found!')
        }
        return res.status(200).json({
            msg:'success',
            user:user
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.get('/getToken',async(req,res)=>{
    try {
        let accessToken=await jwt.sign({name:'uzair',tokenNo:'1158'},"mySecret",{expiresIn:'9h'})
        return res.status(200).json({
            msg:'success',
            accessToken:accessToken
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

router.get('/testToken',auth,async(req,res)=>{
    try {
        let user=await User.find()
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"users not found"
            })
        }
        let tokenNo=req.tokenNo
        return res.status(200).json({
            msg:'success',
            user:user,
            tokenNo:tokenNo
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})




router.post('/multipartData',auth,upload.single('avatar'),async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                msg:'error',
                error:'file is missing'
            })
        }
        console.log(req.body.name)
        console.log(req.body.email)
        const user=new User(req.body)
        user.avatar=req.file.filename
        await user.save()

        res.status(200).json({
            msg:'success',
            user:user
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({
            msg:'error',
            error:e.message
        })
    }
})

module.exports=router