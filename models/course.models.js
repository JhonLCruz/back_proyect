const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate")

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    descripcion: String,
    url: String,
    Price: Number,
    score: Number
})

CourseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Course", CourseSchema)