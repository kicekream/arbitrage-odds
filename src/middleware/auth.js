const jwt = require("jsonwebtoken");
const { Response, Hash, JWT } = require("../utils/response");


function auth(req, res, next) {
    const token = req.header("authorization");
    if(!token) return Response.error(res, 401, "Access Denied, no token provided", null)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch(error) {
        Response.error(res, 400, "Invalid Token Provided", null)
    }
}

module.exports = {auth};