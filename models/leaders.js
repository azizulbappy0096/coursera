const mongoose = require("mongoose")

const LeaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        // human name shouldn't be unique
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Leader", LeaderSchema)