const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =require('cors')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')



//connect to db 
mongoose.connect(process.env.DATABASE)
.then(()=> console.log('DB connected'))
.catch(err => console.log('DB connection error',err))



//app middleware
app.use(morgan('dev'))
// app.use(cors())
// app.use(bodyParser.json())
app.use(express.json())

if((process.env.NODE_ENV == 'development')) {
    app.use(cors({ origin :`http://localhost:3000`}))
}

//middleware
 app.use('/api',authRoutes);
 app.use('/api',userRoutes);

// app.get('/api/signup',(req,res)=>{
//     res.json({
//         data:'you hit signup'
//     })
// })



const port = process.env.PORT || 8000

app.listen(port ,()=>{
    console.log(`Api is running on ${port}`)
})