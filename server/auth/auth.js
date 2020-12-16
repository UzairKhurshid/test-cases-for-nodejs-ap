const jwt=require('jsonwebtoken')
module.exports = async(req,res,next)=>{
    const authHeader=req.get('Authorization')
    if(!authHeader){
        req.isAuth=false
        return res.status(401).send('Not Authorized') 
    }
    const token=authHeader.split(' ')[1];
    if(!token || token === ''){
        req.isAuth=false
        return  res.status(401).send('Not Authorized')
    }
    let decodedToken
    try{
        decodedToken=await jwt.verify(token,"mySecret")
    }catch(e){
        req.isAuth=false
        return res.status(401).send('Not Authorized')
    }
    if(!decodedToken){
        req.isAuth=false
        return res.status(401).send('Not Authorized')
    }
    req.isAuth=true
    req.name=decodedToken.name
    req.tokenNo=decodedToken.tokenNo
    next()
}