const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post("/login/", (req, res) => {
    console.log(req.body);
    res.send(`
    Name - ${req.body.name},
    LastNme - ${req.body.lastname}
    `)
})


app.get("/posts/:id", (req, res) => {
    const r = req.params.id
    res.send(`<h1>PostId ${r}</h1>`)
})

app.get("/home", (req, res) => {
    const r = req.params.home
    res.send(`<h1>Home</h1>`)

})

app.listen(3333, () => {
    console.log('Node is running')
})