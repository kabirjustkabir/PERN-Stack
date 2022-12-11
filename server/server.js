require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


// routes middleware
app.use('/api/v1',require('./routes'))


const port = process.env.PORT || 5001

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})