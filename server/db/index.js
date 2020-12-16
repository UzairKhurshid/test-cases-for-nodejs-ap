const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/testCaseApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log('connected to database')
}).catch(()=>{
    console.log('error connecting database')
})