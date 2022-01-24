#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('joinsdn:server');
const http = require('http');
const https = require('https');
const fs = require('fs');

const certbasepath = '/etc/letsencrypt/live/joinsdn.com/'
const privkeypath = 'privkey.pem'
const certpath = 'cert.pem'
const chainpath = 'chain.pem'
var certsExist = fs.existsSync(certbasepath + privkeypath) && fs.existsSync(certbasepath + certpath) && fs.existsSync(certbasepath + chainpath);

let privateKey = null;
let certificate = null;
let ca = null;

if(!certsExist){
  console.log("No certifications found. HTTPS server will not start. Port 443 will not be used.")
}else{
  privateKey = fs.readFileSync(certbasepath + privkeypath, 'utf8');
  certificate = fs.readFileSync(certbasepath + certpath, 'utf8');
  ca = fs.readFileSync(certbasepath + chainpath, 'utf8');
}




const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
 * Create HTTP server.
 */

const httpServer = http.createServer(app);
let httpsServer = null;
if (certsExist){
  httpsServer = https.createServer(credentials, app);
}


/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(port);
httpServer.on('error', onError);
// httpServer.on('listening', onListening);
if(certsExist){
  httpsServer.listen(443);
  httpsServer.on('error', onError);
}
// httpsServer.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
