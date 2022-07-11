const { Response, Hash, JWT } = require("../utils/response");

function admin(req, res, next) {
    if(req.user.isAdmin === false) return Response.error(res, 403, "Access Denied", null)
}