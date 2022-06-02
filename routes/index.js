var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
var dateFormat = require('../public/javascripts/date.format.js')
var mysql = require('mysql2')
const fs = require('fs');
var crypto = require('crypto')
var fetch = require('node-fetch')

API_ENDPOINT = 'https://discord.com/api/v10'
CLIENT_ID = process.env.client_id
CLIENT_SECRET = process.env.client_secret

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
  fetch("http://ip-api.com/json/" + req.ip).then((resp)=> resp.json()).then((json) => {
      connection.query(
          'INSERT INTO visitorlog VALUES (?, ?, ?, ?, ?);',[hash,json.country, json.region,json.city, date],
          function(error, result, fields){
              if(error){console.log("Repeat IP")}
            }
      )
  })
  res.render('index', {title: 'Express'});
});

router.get('/logs', function (req, res, next) {
  console.log(req.cookies)
  console.log(req.query)
  if(req.cookies && "discord_id" in req.cookies){
    console.log("first branch")
    res.render('logs', {title: 'Express'});
  }else if(Object.keys(req.query).length <= 0){
    console.log("second branch")
    res.render('logslogin', {title: 'Express'});
  }else{
    console.log("third branch")
    data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: "https://joinsdn.com/logs"
    }
    console.log(JSON.stringify(data))
    headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    fetch(API_ENDPOINT + "/oauth2/token", {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(data)
    }).then(resp => resp.json()).then(json => {
      console.log(json)
      res.render("logs")
    });

  }

});

router.get('/logsapi', function(req,res,next){
  connection.query(
      'SELECT * FROM visitorlog',
      function(error, result, fields){
        if(error){}
        res.json(result)
      }
  )
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
