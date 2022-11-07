const createError = require('http-errors');

const checkAuth = (req, res, next) => {
    if(req?.session?.acc_no){
        next();
    }else{
        res.redirect("/csrf");
    }
}

module.exports = checkAuth;