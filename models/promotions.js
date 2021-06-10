const mongoose = require("mongoose")
require("mongoose-currency").loadType(mongoose)

var Currency = mongoose.Types.Currency

const PromoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency,
        min: 0,
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

module.exports = mongoose.model("Promotion", PromoSchema)