const mongoose = require('mongoose');

const clientSchema=new mongoose.Schema({
    dpi: String,
    name: String,
    birthday: String,
    address: String,
    phone_number: Number,
    marital_status: String,
    register_date: String
})

const Client=mongoose.model('Client', clientSchema)
module.exports=Client