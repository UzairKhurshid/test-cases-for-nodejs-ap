require('./db/index')

const express=require('express')
const bodyParser=require('body-parser')
const app=express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router=require('./api/index')
app.use(router)

app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})

module.exports=app