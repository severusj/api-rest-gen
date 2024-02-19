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

// METODO POST para generar tabla de amortizacion
router.post('/amortization-table', async (req, res) => {
    try {
        const { loan_code } = req.body;

        // Buscar el préstamo por el código
        const loan = await Loan.findOne({ loan_code });

        if (!loan) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        const { amount, quotas_quantity, register_date } = loan;

        // Calcular la cuota
        const quota = (amount / quotas_quantity) * (3 / 100);

        // Calcular la fecha de pago para cada cuota
        const paymentDates = [];
        let currentDate = new Date(register_date);
        for (let i = 1; i <= quotas_quantity; i++) {
            const paymentDate = new Date(currentDate);
            paymentDate.setMonth(paymentDate.getMonth() + i);
            paymentDates.push(paymentDate.toISOString().split('T')[0]);
        }

        // Construir la tabla de amortización
        const amortizationTable = [];
        for (let i = 0; i < quotas_quantity; i++) {
            amortizationTable.push({
                "No. de cuota": i + 1,
                "Fecha de pago": paymentDates[i],
                "Monto": quota
            });
        }

        res.status(200).json(amortizationTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router