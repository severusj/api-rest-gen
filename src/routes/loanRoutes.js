const express = require('express');
const router = express.Router();
const Loan= require('../models/loanModel')

//METODO POST para insertar prestamo
router.post('/', async(req,res)=>{
    try{
        const {loan_code,client_code,amount,quotas_quantity,register_date}=req.body
        const loan= new Loan({loan_code,client_code,amount,quotas_quantity,register_date})
        await loan.save();
        res.status(201).json(loan)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//GET para obtener prestamos
router.get('/', async(req, res)=>{
    try{
        const loans= await Loan.find()
        res.json(loans)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports=router