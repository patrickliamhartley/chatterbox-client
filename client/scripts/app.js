// $(document).ready(function() {

// });

var app = {};
var dataStore = [];
var rooms = {};
var dataPulled = false;
var newRoomName = "lobby";
var killswitch = true;
// var username
var dataPull = function(data) { 
  //zero out data store so it doesnt reprint old messages
  dataStore = [];
  for (var i = 0; i < data.results.length; i ++) {
    if (data.results[i].username !== undefined && data.results[i].text !== undefined) {
      dataStore.push(data.results[i]);
    }
  }
};

app.send = function (message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    success: function (data) {
      console.log('Message Sent');
    },
    error: function (data) {
      console.log('Failed to Send');
    }
  });
};

app.fetch = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    success: function (data) {
      dataPull(data);
      if (dataPulled === false) {
        app.setRooms();
        app.popChat();
        dataPulled = true;
      }
    }
    // success: function (data) {
    //   console.log(data);
    // },
    // error: function (data) {
    //   console.log('Failed to Get');
    // }
  });
};

app.clearMessages = function () {
  $('#chats').empty();
  // $('.message').remove();  
  // $('.username').remove();
};


app.addMessage = function (message) {
  var messageObj = {
    username: name,
    text: message,
    roomname: newRoomName
  };

  this.send(messageObj);
  killswitch = true;
  // $('#chats').append('<div>' + message + '</div>');
};

app.addRoom = function (roomName) {
  $('#dropdown').append('<option>' + roomName + '</option>');

};

app.addFriend = function () {
  $('.username').on('click', function () {
    console.log('username clicked');
  });
};

app.init = function() {
  console.log('initiating');
  // clear page of old messages
  // app.clearMessages();
  app.fetch();
  app.poll();

};

app.popChat = function () { 
  app.clearMessages();
  for (var j = 15; j > 0; j--) {
    // $('#chats').append('<div class=username>a</div>');
    // $('#chats').append('<div class=message>b</div>');
    // $('.username').text(dataStore[j].username + ': ');
    // $('.message').text(dataStore[j].text);

      // document.createTextNode((dataStore[j].username + ': ' + ))).addClass("message");
    $('#chats').prepend('<div class=message><h2>' + dataStore[j].username + 
      '</h2>: ' + dataStore[j].text + '</div>'); 
  }
};

app.setRooms = function () {
  app.fetch();
  for ( var i = 0; i < dataStore.length; i ++) {
    rooms[dataStore[i].roomname] = dataStore[i].roomname;
  }
  // for (var key in rooms) {
  //   console.log("appending"+rooms[key]);
  //   $('select').append('<option value="'+ rooms[key]+ '"">rooms</option>');
  // }
  app.popRooms(rooms);
};

app.popRooms = function(obj) {
  app.addRoom("New Room");
  for (var key in obj) {
    if (obj[key] !== undefined) {
      var string = obj[key].toString();
      $('#dropdown').append('<option>' + string + '</option>');
    }  
  }
};

app.randCol = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

app.poll = function () {
  setInterval( function() {


    if (killswitch === true) {  
      app.fetch();
      app.popChat();
    }

  }, 1000);
};

app.stop = function() {
  clearInterval(app.poll);
};

app.roomChange = function ( num) {
  if ( num === 0 ) {
    newRoomName = prompt("What would you like to name your new chatroom?");
    app.addRoom(newRoomName);
  }  else {
    newRoomName = $('#dropdown').val();
  }
  $('#chats').empty();
  killswitch = false;
  dataStore.forEach(function (element){
    if ( element.roomname===newRoomName){
      $('#chats').prepend('<div class=message><h2>' + element.username + 
      '</h2>: ' + element.text + '</div>');
    }
    
  });
};



// var myname = prompt('What is your name?');
// call init every 2 seconds to update chat
$(document).ready(function() {
  // event listeners
  $('#sendChat').submit( function (e) {
    app.addMessage($('#userchat').val());
    e.preventDefault();
  }); 

  $('#dropdown').on('change', function(ev) {
    var menuNum = $('#dropdown').prop('selectedIndex');
    app.roomChange(menuNum);
  });


  $('#hack').on('click', function() {
    var rdcolor1 = app.randCol();
    var rdcolor2 = app.randCol();
    name = 'HACKER ALPHA';
    $('#userchat').val('<style> body {background-color:' + rdcolor1 + 
      '; color: ' + rdcolor2 + '} </style>BYPASSING SECURITY PROTOCOLS');
  });
  // setInterval ( function() {
  //   $('#dropdown').empty();
  //   app.setRooms();
  // }, 5000);

  // setInterval( function() {
    
  //   app.fetch();
  //   app.popChat();


  // }, 1000);


});

// debugger;

