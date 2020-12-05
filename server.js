const express=require('express');
// const mongoose=require('mongoose');
const cors=require('cors');
const path =require('path');
const config=require('config');
// const uri=config.get('ATLAS_URI');
const app=express();
app.use(express.json());
app.use(cors());
const db = require("./app/models");

db.sequelize.sync( console.log("database connected "));

const port = process.env.PORT ||  8080;
// const uri = process.env.ATLAS_URI;

// var corsOptions = {
//     origin: "http://localhost:8080"
//   };
  
//   app.use(cors(corsOptions));
  
const customerRouter = require('./Routes/api/customer');
const packageRouter = require('./Routes/api/package');
const programRouter = require('./Routes/api/program');
// const authRouter = require('./Routes/api/auth');
const ownerRouter = require('./Routes/api/owner');
const itemRouter = require('./Routes/api/item');
const invoiceRouter = require('./Routes/api/invoice');
const invoiceDecRouter = require('./Routes/api/invoicedescription');
const pro_pacRouter = require('./Routes/api/program_package');
const authRouter = require('./Routes/api/auth');
const userRouter = require('./Routes/api/userroute');
const receiptRouter = require('./Routes/api/receipt');
const debitRouter = require('./Routes/api/debitnote');
const serviceRouter = require('./Routes/api/service');
const debitDesRouter = require('./Routes/api/debitnotedescription');

app.use(express.json());
app.use(cors());
app.use('/item', itemRouter);
app.use('/customer', customerRouter);
app.use('/package', packageRouter);
app.use('/program', programRouter);
app.use('/owner', ownerRouter);
app.use('/invoice',invoiceRouter );
app.use('/description',invoiceDecRouter );
app.use('/program_package',pro_pacRouter );
app.use('/auth',authRouter );
app.use('/user',userRouter );
app.use('/receipt', receiptRouter);
app.use('/debit', debitRouter);
app.use('/service', serviceRouter);
app.use('/debit_description', debitDesRouter);

// if (process.env.NODE_ENV === 'production') {
    app.use(express.static(' client/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
    });
// }
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("database connected "))

app.listen(port, () => console.log(`server connect port ${port}`))