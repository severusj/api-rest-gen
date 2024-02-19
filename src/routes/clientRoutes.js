const express = require('express');
const router = express.Router();
const Client= require('../models/clientModel')

router.post('/', async(req,res)=>{
    try{
        const {dpi, name,birthday,address,phone_number,marital_status,register_date}=req.body
        const client= new Client({dpi, name,birthday,address,phone_number,marital_status,register_date})
        await client.save();
        return {
            code: res.statusCode(200),
            message: res.statusMessage("OPERATION_SUCCESSFUL")
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports=router