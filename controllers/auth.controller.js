const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("../utils/jwt")

function register(req, res){

    const { firstName, lastName, email, password} = req.body

    if(!email)res.status(400).send({msg:"por favor escriba un email"})
    if(!password)res.status(400).send({msg:"por favor escriba un password"})

    const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        role:"user",
        active: false
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    user.password = hashPassword
    user.save((error, userStorage) => {
        if(error){
            res.status(400).send({msg : "Error al crear el usuario"} + error)
        }else{
            res.status(200).send(userStorage)
        }
    })

} 

function login(req, res){
    const { email, password } = req.body
    if(!email)res.status(400).send({msg:"por favor escriba un email"})
    if(!password)res.status(400).send({msg:"por favor escriba un password"})

    const emailLowerCase = email.toLowerCase()
    User.findOne({email : emailLowerCase}, (error, userStore) => {
        if(error){
            res.status(500).send({msg:"error del server"})
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({msg:"error del server"})
                } else if(!check){
                    res.status(400).send({msg:"usuario o contraseña incorrectos"})
                }else if(!userStore.active){
                    res.status(401).send({msg:"usuario no autorizado o no activo"})
                } else{
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }
    })
}

function refreshAccesstoken (req, res) {
    const {token} = req.body
    if(!token) res.status(400).send({msg:"error al token requerideichon"})

    const {user_id} = jwt.decoded(token)

    User.findOne({_id: user_id}, (error, userStorage) => {
        if(error){
            res.status(500).send({msg: "error del servidor"})
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage)
            })
        }
    })
}


module.exports = {
    register,
    login,
    refreshAccesstoken
}