// $(document).ready(function() {

// });

var app = {};
var dataStore = [];
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
    roomname: "lobby"
  };

  this.send(messageObj);
  // $('#chats').append('<div>' + message + '</div>');
};

app.addRoom = function (roomName) {
  $('#roomSelect').append('<div>roomName</div>');

};

app.addFriend = function () {
  $('.username').on('click', function () {
    console.log('username clicked');
  });
};

app.init = function() {
  
  // clear page of old messages
  this.clearMessages();

  this.fetch();
  
  

  for (var j = 15 ; j > 0; j--) {
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
  // $('#dropdown').empty();
  var rooms = {};
  app.fetch();
  for ( var i = 0; i < dataStore.length; i ++) {
    rooms[dataStore[i].roomname] = dataStore[i].roomname;

  }
 
  // for (var key in rooms) {
  //   console.log("appending"+rooms[key]);
  //   $('select').append('<option value="'+ rooms[key]+ '"">rooms</option>');
  // }
  this.popRooms(rooms);
};

app.popRooms = function(obj) {

  for (var key in obj) {

    if (obj[key] !==undefined) {
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


// var myname = prompt('What is your name?');
// call init every 2 seconds to update chat
$(document).ready(function() {

  $('#sendChat').submit( function (e) {


  

    app.addMessage($('#userchat').val());
    e.preventDefault();
  });  
  $('#hack').on('click', function() {
    var rdcolor1 = app.randCol();
    var rdcolor2 = app.randCol();
    name = "HACKER ALPHA";
    $('#userchat').val("<style> body {background-color:" + rdcolor1 + 
      "; color: " + rdcolor2 + "} </style>" + "BYPASSING SECURITY PROTOCOLS");



  });

  setInterval ( function() {
    $('#dropdown').empty();
    app.setRooms();
  }, 7000);
  setInterval( function() {
    

    app.init();


  }, 1000);
});

// debugger;

