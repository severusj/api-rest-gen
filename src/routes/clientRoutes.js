const express = require('express');
const router = express.Router();
const Client= require('../models/clientModel')

//METODO POST para insertar cliente
router.post('/', async(req,res)=>{
    try{
        const {dpi, name,birthday,address,phone_number,marital_status,register_date}=req.body
        const client= new Client({dpi, name,birthday,address,phone_number,marital_status,register_date})
        await client.save();
        res.status(201).json(client)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//GET para obtener cliente
router.get('/', async(req, res)=>{
    try{
        const clients= await Client.find()
        res.json(clients)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//PUT para actualizar cliente
router.put('/:id', async(req, res)=>{
    try{
       const {id}=req.params
       const {dpi, name,birthday,address,phone_number,marital_status,register_date}=req.body
       const updatedClient= await Client.findByIdAndUpdate(id,{dpi, name,birthday,address,phone_number,marital_status,register_date}, {new: true})
       res.json(updatedClient)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports=router