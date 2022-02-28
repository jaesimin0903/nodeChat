// express module
const express = require('express');
// socket module
const socket = require('socket.io');
// html module
const http = require('http');
// express
const app = express();
// create express server 
const server = http.createServer(app);
// socket binding
const io = socket(server);

// method Get : location '/'
app.get('/', function(request,response){
    console.log('user enter the location /');
    response.send('Hello, Express server!');
})
// listen server to port 8080
server.listen(8080, function(){
    console.log('run server');
})