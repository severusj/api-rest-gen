const mongoose = require('mongoose');

const paymentPlan=new mongoose.Schema({
    quotas_quantity: Number,
    register_date : String,
    amount: Number
})

const PaymentPlan=mongoose.model('PaymentPlan', paymentPlan)
module.exports=PaymentPlan