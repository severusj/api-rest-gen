const express = require('express')
const mongoose = require('mongoose')

const app= express()
const PORT = 3001

mongoose.connect('mongodb://localhost:27017/mantenimiento-clientes').then(()=>{
    return ("Conectado a base de datos exitosamente")
}).catch((error)=>{
    console.log("Error en la conexion a base de datos", error)
    return process.exit(1)
})

app.use(express.json())

//Cliente
const clientRoutes=require('./routes/clientRoutes')
app.use('/api/clients', clientRoutes)

//Prestamos
const loanRoutes=require('./routes/loanRoutes')
app.use('/api/loans', loanRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });