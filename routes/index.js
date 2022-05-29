var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
var dateFormat = require('../public/javascripts/date.format.js')
var mysql = require('mysql2')
const fs = require('fs');
var crypto = require('crypto')
var fetch = require('node-fetch')

try{
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'frankwhoee',
    password: process.env.dbpass,
    database: 'sdn'
  })
  connection.connect()
}catch (e) {
  
}

connection.query('SHOW TABLES LIKE "players"', function (err, rows, fields) {
  if(rows.length <= 0){
    connection.query('CREATE TABLE players (name varchar(15), tag varchar(5), time_joined date)')
  }
})

connection.query('SHOW TABLES LIKE "visitorlog"', function (err, rows, fields) {
  if(rows.length <= 0){

    connection.query('CREATE TABLE visitorlog (iphash varchar(255), country varchar(255), region varchar(255), city varchar(255),time_visited date, PRIMARY KEY (iphash))')
  }
})

console.log('Current directory: ' + process.cwd());
/* GET home page. */
router.get('/', function (req, res, next) {
  var hash = crypto.createHash('sha256')
      .update(req.ip)
      .digest('hex');
  const today = new Date()
  const date = today.format("yyyy-mm-dd")
  fetch("http://ip-api.com/json/" + "130.44.164.73").then((resp)=> resp.json()).then((json) => {
    console.log(json)
      connection.query(
          'INSERT INTO visitorlog VALUES (?, ?, ?, ?, ?);',[hash,json.country, json.region,json.city, date],
          function(error, result, fields){
              if(error){}
            }
      )
  })
  res.render('index', {title: 'Express'});
});

router.get('/logs', function (req, res, next) {
  res.render('logs', {title: 'Express'});
});

// router.get('')

router.get('/players', function (req, res, next) {
  connection.query('SELECT * FROM players', function (err, rows, fields) {
    if (err) throw err;

    res.json(rows)
  })
});

router.get('/covercount', function (req, res, next) {
  var l = fs.readdirSync(process.cwd() + '/public/images/covers').length
  res.json(l)
});

router.get('/count', function (req, res, next) {
  connection.query('SELECT COUNT(1) FROM players', function (err, rows, fields) {
    if (err) throw err;

    res.json({"count":rows[0]['COUNT(1)']})
  })
});

router.post('/idsubmit', function (req, res, next) {
  const submittedid = req.body.riotid;
  if (submittedid.startsWith("SDN") && submittedid.includes("#")) {
    const split = submittedid.split("#");
    const name = split[0]
    const tag = split[1]
    const today = new Date()
    const date = today.format("yyyy-mm-dd")
    try {

      connection.query('SELECT COUNT(1) FROM players WHERE name=? AND tag=?', values = [name, tag], function (err, rows, fields) {
        if (err) throw err;
        if (rows[0]['COUNT(1)'] === 0) {
          connection.query(
              'INSERT INTO players VALUES (?, ?, ?);',
              [name, tag, date]
          )
          res.sendStatus(200)
        }else{
          res.sendStatus(401)
        }
      })
    } catch (e) {
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(400)
  }
});

module.exports = router;
