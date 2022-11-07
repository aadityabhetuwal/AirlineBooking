const allowAuth = (req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

module.exports = allowAuth;