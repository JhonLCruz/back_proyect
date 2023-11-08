const mongoose = require("mongoose");
const app = require("./app.js")
const {DB_USER, DB_HOST, DB_PASSWORD, API_VERSION, IP_SERVER} = require("./constants");

const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (error) => {
        if (error) throw error
        app.listen(PORT, () => {
            console.log("#################")
            console.log("# API REST MERN #")
            console.log("#################")
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
        })
    }
)

