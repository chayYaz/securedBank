const jwt = require("jsonwebtoken");
const JSEncrypt = require("node-jsencrypt");
const express = require('express');
require('dotenv').config();
const router = express.Router();

// Initialize JSEncrypt instance with a default key size of 2048 bits
const jsEncrypt = new JSEncrypt({ default_key_size: 2048 });

router.get("/authToken/public-key", (req, res) => {
  const publicKey = jsEncrypt.getPublicKey();
  console.log(publicKey);
  res.send(publicKey);
});
function authenticateToken(req,res,next){
  const authHeader=req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[1];
  if(token==null){
    console.log("got null");
    return res.sendStatus(401);}

    const decryptedToken = jsEncrypt.decrypt(token);
  jwt.verify(decryptedToken,'df1ea1eb859f1f669b7a92453f30887a9ae59491d054d51116ae05e197b73066fbe4b57af4e603394b833e4528a351f814a93f68471a16629d15dfffeb6f860e',(err,user)=>{
  if(err) {
    console.log("got error");
    return res.sendStatus(403);}
  req.user=user;
  next()
  });
  }


  module.exports = {
    authenticateToken,
    authRouter: router,
  };