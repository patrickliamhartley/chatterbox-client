$(document).ready(function() {

});

var app = {};
var dataStore = [];
var dataPull = function(data) { 
  for (var i = 0; i < 10; i ++) {
    dataStore.push(data.results[i]);
  }
};



app.init = function() {
  console.log(this);
  this.fetch();
  for (var j = 0; j < dataStore.length ; j ++) {
    $('#chats').append('<div>' + dataStore[j].username + '</div>');
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
};

app.addMessage = function (message) {
  $('#chats').append('<div>' + message + '</div>');
};

app.addRoom = function (roomName) {
  $('#roomSelect').append('<div>roomName</div>');

};

app.addFriend = function () {
  $('.username').on('click', function () {
    console.log('username clicked');

  });
};

