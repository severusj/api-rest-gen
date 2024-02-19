const mongoose = require('mongoose');

const loanSchema=new mongoose.Schema({
    loan_code: String,
    client_code: String,
    amount: Number,
    quotas_quantity: Number,
    register_date: String
})

const Loan=mongoose.model('Loan', loanSchema)
module.exports=Loan