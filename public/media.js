$(document).ready(function(){ 
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
});

// /public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

  var messages = document.getElementById('chat');
  var form = document.getElementById('form');
  var input = document.getElementById('textBox');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        var messageObject = {
            username:user,
            message:input.value
        }
      socket.emit('chat message', messageObject);
      input.value = '';
    }
  });

  socket.on('chat message', function(data) {
    var username = data.id;
    var msg = data.message;
    var item = document.createElement('li');
    item.innerHTML = "<span style=\"color:red\">" + username + ":</span> " + msg;
    messages.appendChild(item);
  });

  window.setInterval(function() {
    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
  }, 1);
  