const mongoose = require('mongoose');

// Define the News Schema
const newsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        default: '',
    },
    link: {
        type: String, 
        required: true,
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('News', newsSchema);
