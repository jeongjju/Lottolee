const express = require('express');
const app = express();
const result = require('./routes/result');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./schemas');
require('dotenv').config({ path : "./../.env" });

app.use(cors());

connect();

app.use(bodyParser.json());

app.use('/result', result);

app.listen(3002, () => console.log('Node.js Server is running on port 3002...'));