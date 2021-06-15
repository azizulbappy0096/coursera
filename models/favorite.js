const mongoose = require("mongoose")

const FavouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model("Favourite", FavouriteSchema)