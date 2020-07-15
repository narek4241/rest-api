const express = require('express');
const bodyParser = require('body-parser');
const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/posts', postRoute);
app.use('/auth', authRoute);


mongoose.connect('mongodb+srv://tumo:tumo1234@cluster0.thjn7.mongodb.net/tumo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {console.log('connected to db');});


const PORT = 3333;
app.listen(PORT, () =>{console.log(`Node is running on port ${PORT}`);})








