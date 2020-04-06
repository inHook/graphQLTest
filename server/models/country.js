const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
    name: String,
    updated_at: String,
    today: {
        deaths: Number,
        confirmed: Number,
    },
    latest_data: {
        deaths: Number,
        confirmed: Number,
    },
    calculated: {
        death_rate: Number,
    },
});

module.exports = mongoose.model("Country", countrySchema);
