const createError = require('http-errors');

const redirectIfAuth = (req, res, next) => {
    if(req?.session?.acc_no){ 
        res.redirect("/csrf/transfer")
    }else{
        next();
    }
}

module.exports = redirectIfAuth;