var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
var dateFormat = require('../public/javascripts/date.format.js')
var mysql = require('mysql2')
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

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/players', function (req, res, next) {
  connection.query('SELECT * FROM players', function (err, rows, fields) {
    if (err) throw err;

    res.json(rows)
  })
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
