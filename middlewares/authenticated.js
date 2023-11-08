const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
if(!req.headers.authorization){
    res.status(403).send({msg:"no tiene headers papu"})
}
const token = req.headers.authorization.replace
("Bearer ", "")

try {
    const payload = jwt.decode(token)
    const { exp } = payload
    const currentData = new Date().getTime()

    if(exp <=  currentData){
        return res.status(200).send({msg:"el token ha espirado"})
    }
    req.user = payload
    next()

} catch(error){
    return res.status(400).send({msg:"token no valideichon"})
}

}

module.exports ={
    asureAuth,
}