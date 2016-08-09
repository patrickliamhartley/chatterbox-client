// $(document).ready(function() {

// });

var app = {};
var dataStore = [];
// var username
var dataPull = function(data) { 
  //zero out data store so it doesnt reprint old messages
  dataStore = [];
  for (var i = 0; i < 100; i ++) {
    if (data.results[i].username !== undefined || data.results[i].text !== undefined) {
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
  $('.message').empty();
};


app.addMessage = function (message) {
  var messageObj = {
    username: myname,
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
  //clear page of old messages
  this.clearMessages();

  this.fetch();
  var rooms = {};

  
  $('select').empty();
  for (var j = 0; j < 20; j ++) {
    $('#chats').append('<div class=message><h2>' + dataStore[j].username + 
      '</h2>: ' + dataStore[j].text + '</div>');
    rooms[dataStore[j]] = dataStore[j].roomname;
  }

  for (var key in rooms) {
    $('select').append('<option value="rooms[key]">' + rooms[key] + '</option>');

  }



};

$('form').submit( function (event) {
  app.addMessage($("input").val());

});  

var myname = prompt('What is your name?');
//call init every 2 seconds to update chat
$(document).ready(function() {
 
   
  
  setInterval( function() {
    

    app.init();


  }, 2000);
});

// debugger;

