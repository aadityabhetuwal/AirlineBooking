const csrf = require("csurf");

const csrfProt = csrf({ cookie: true });
// const csrfProt = (req, res, next) => { next(); };
module.exports = csrfProt;
