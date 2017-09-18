const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config.js');

// this object will hold info about active
// users currently on the site
const visitorsData = {};

app.set('port', (process.env.Port || 5000));


app.use(express.static(path.join(__dirname, 'public/')));

// serve the index.html page when someone visits any of the following endpoints:
//    1. /
//    2. /about
//    3. /contact
app.get(/\/(about|contact)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// serve up the dashboard when someone visits /dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

io.on('connection', (socket) => {

  socket.on('visitor-data', (data) => {
    visitorData[socket.id] = data;
  })




  // a user has visited our page - add them to the visitorsData object
  socket.on('disconnect', () => {
    // a user has left our page - remove them from the visitorsData object
    delete visitorsData[socket.id];
  });
});

http.listen(app.get('port'), function() {
  console.log('listening on *:' + app.get('port'));
});
