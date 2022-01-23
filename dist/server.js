#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var app = require('./app');

var debug = require('debug')('joinsdn:server');

var http = require('http');

var https = require('https');

var fs = require('fs');

var privateKey = fs.readFileSync('/etc/letsencrypt/live/joinsdn.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/joinsdn.com/cert.pem', 'utf8');
var ca = fs.readFileSync('/etc/letsencrypt/live/joinsdn.com/chain.pem', 'utf8');
var credentials = {
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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(port);
httpServer.on('error', onError); // httpServer.on('listening', onListening);

httpsServer.listen(443);
httpsServer.on('error', onError); // httpsServer.on('listening', onListening);

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

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

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
//# sourceMappingURL=server.js.map