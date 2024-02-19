const express = require('express');
const router = express.Router();
const Loan= require('../models/loanModel')

//METODO POST para insertar prestamo
router.post('/', async (req, res) => {
    try {
        const { client_code } = req.body;

        const loan = await Loan.findOne({ client_code });

        if (!loan) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        const quota_amount = (loan.amount / loan.quotas_quantity) * 0.3;

        // Calcular las fechas de pago para cada cuota
        const amortization_table = [];
        let remaining_amount = loan.amount;
        for (let i = 1; i <= loan.quotas_quantity; i++) {
            const payment_date = new Date(loan.register_date);
            payment_date.setMonth(payment_date.getMonth() + i);

            const quota = {
                quota_number: i,
                payment_date,
                amount: quota_amount.toFixed(2)
            };

            amortization_table.push(quota);
            remaining_amount -= quota_amount;
        }

        // Devolver la tabla de amortización
        res.status(200).json(amortization_table);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router