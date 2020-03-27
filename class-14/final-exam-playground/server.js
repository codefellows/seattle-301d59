'use strict';

// libraries
require('dotenv').config();
require('ejs');
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const methodOverride = require('method-override');

// global variables
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());// allows everyone to access our information
app.use(express.static('./public'));// serves our static files from public
app.set('view engine', 'ejs');// ejs template
app.use(express.urlencoded({extended:true}));// body parser
app.use(methodOverride('_method')); // turn a post or get into a put or delete

// set up pg
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

// turn everything on
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })