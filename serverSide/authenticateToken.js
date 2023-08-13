const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[1];
  if(token==null){
    console.log("got null");
    return res.sendStatus(401);}
  jwt.verify(token,'df1ea1eb859f1f669b7a92453f30887a9ae59491d054d51116ae05e197b73066fbe4b57af4e603394b833e4528a351f814a93f68471a16629d15dfffeb6f860e',(err,user)=>{
  if(err) {
    console.log("got error in line 48");
    return res.sendStatus(403);}
  req.user=user;
  next()
  });
  }


  module.exports = {
    authenticateToken
  };