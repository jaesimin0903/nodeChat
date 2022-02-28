const fs = require('fs');
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

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
// method Get : location '/'
app.get('/', function(request,response){
    fs.readFile('./static/index.html',function(err,data){
        if(err){
            throw err;
        }else{
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})

io.sockets.on('connection', function(socket){
    
    socket.on('newUser', function(name){
        console.log(name + ' was connected');

        socket.name = name
        
        io.sockets.emit('update', {type : 'connect', name:'SERVER', message: name + 'was connected'})
    })

    socket.on('message', function(data){
        data.name = socket.name
        console.log(data.name)
        console.log(data)
        socket.broadcast.emit('update', data)
    })


    socket.on('disconnect', function(){
        console.log(socket.name + 'Disconnected')

        socket.broadcast.emit('update', {type : 'disconnect', name:"SERVER", message : socket.name + 'Disconnected'})
    })
})
// listen server to port 8080
server.listen(8080, function(){
    console.log('run server');
})
