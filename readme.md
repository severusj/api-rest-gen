Run the project: node src/server.js

#Client schema:
const clientSchema=new mongoose.Schema({
    dpi: String,
    name: String,
    birthday: String,
    address: String,
    phone_number: Number,
    marital_status: String,
    register_date: String
})

#Loan schema:
const loanSchema=new mongoose.Schema({
    loan_code: String,
    client_code: String,
    amount: Number,
    quotas_quantity: Number,
    register_date: String
})

