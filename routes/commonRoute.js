const express = require('express');
const route = express.Router();

route.get('/',(req,res)=>{
    res.render('common/login',{title:''});
});
module.exports = route;