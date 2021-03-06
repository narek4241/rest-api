const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postRoute);
app.use('/auth', authRoute);

// mongoDB /account/ login=tumo-mail,pass=Students1234!, /user/ login=tumo,pass=tumo1234
mongoose.connect('mongodb+srv://tumo:tumo1234@cluster0.thjn7.mongodb.net/tumo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {console.log('connected to db');});


const port = process.env.PORT || 3333;
app.listen(port, () =>{console.log(`Node is running on port ${port}`);})








