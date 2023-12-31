const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    careers: [{ type: mongoose.Schema.ObjectId, ref: 'Careers' }],
    type: [String],
    local: String,
    web: String,
    address: String,
    phone: String,
    email: String
});

module.exports = mongoose.model(databaseConfig.col_items, schema);