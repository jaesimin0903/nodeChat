var socket = io()

//접속 되었을때 실행
socket.on('connect', function(){
    var name = prompt('Welcome', '')
    
    if(!name){
        name = 'Annonymous'
    }
    add_div(name)
    socket.emit('newUser', name)
})

socket.on('update', function(data){
    var chat = document.getElementById('chat')
    var userBox = document.getElementById('user')

    var message = document.createElement('div')
    var node = document.createTextNode(`${data.name} : ${data.message}`)
    
    var user = document.createElement('div')
    var userNode = document.createTextNode(`${data.name}`)
    var className = ''
    
    switch(data.type) {
        case 'message':
          className = 'other'
          break
    
        case 'connect':
          className = 'connect'
          break
    
        case 'disconnect':
          className = 'disconnect'
          break
      }
      
      message.classList.add(className)
      message.appendChild(node)
      chat.appendChild(message)

      user.appendChild(userNode)
      userBox.appendChild(user)
      console.log(user)
      
})

//전송 함수

function send(){
    var message = document.getElementById('test').value
    
    document.getElementById('test').value=''

    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode( my_name + ':' + message )
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    socket.emit('message' ,{type : 'message', message : message})
    $('#send').attr('disabled', true)
}

var my_name = '';
function add_div(name){
    var div = document.createElement('div');
    my_name = name;
    div.innerHTML = name;
    document.getElementById('name').appendChild(div);
}

const ableSend =  $('#test').val();
console.log(ableSend);

$(function(){
    if($(this).val().trim() == ''){
        $('#send').attr('disabled', true)
    }
    else {
        $('#send').attr('disabled', false)
    }
    $(document).on('keyup', '#test', function(){
        if($(this).val().trim() == ''){
            $('#send').attr('disabled', true)
        }
        else {
            $('#send').attr('disabled', false)
        }
    })
    $('#test').focus(function (e) { 
        e.preventDefault();
        $('#send').css('background-color', 'yellow');
    });
    $('#test').blur(function (e) { 
        e.preventDefault();
        $('#send').css('background-color', 'rgb(214,214,214)');
    });
    $(document).on('keypress', function(e){
        if($('#test').val().trim() != ''){
            if(e.which == 13) {
                send();
                $("#chat").scrollTop($(document).height());
            }
        }
    })
})



//console.log($('#send').is(":disabled"))
