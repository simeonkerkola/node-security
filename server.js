const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var winston = require('winston');
const path =require('path')

const bodyParser = require('body-parser');
const app = express()
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

const page=path.join(__dirname, 'client/index.html')
const script=path.join(__dirname, 'client/script.js')
const style=path.join(__dirname, 'client/style.css')
app.get('/', (req, res) => res.sendFile(page))
app.get('/script.js', (req, res) => res.sendFile(script))
app.get('/style.css', (req, res) => res.sendFile(style))

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app http://localhost:3000 !'))
