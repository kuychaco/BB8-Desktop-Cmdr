'use strict'

const ipcRenderer = require('electron').ipcRenderer;
const $ = require('jquery');

const url = 'http://localhost:4000';

var $closeButton, $colorButton, $rollButton, $stopButton, $speedButton = undefined;
var speed = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  wireUpButtons();
});

const wireUpButtons = () => {

  $closeButton = $('#close-window');
  $colorButton = $('#color-button');
  $rollButton = $('#roll-button');
  $stopButton = $('#stop-button');
  $speedButton = $('#speed-button');

  $closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });

  $colorButton.on('click', colorButtonClick);
  $rollButton.on('click', rollButtonClick);
  $speedButton.on('click', speedButtonClick);
  $stopButton.on('click', stopButtonClick);
}

const colorButtonClick = function () {

  console.log("yo");

  // curl -v -H "Content-Type: application/json" -X POST -d
  // '{"mode":"sphero","command":"color","value": "yellow"}'
  // http://localhost:4000

  var request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      "mode": "sphero",
      "command": "color",
      "value": "blue"
    })
  });

  window.fetch(request).then(function(response) {return response.status;})
    .then(function(status) {
      console.log(status);
    });
};

const rollButtonClick = function () {
  var request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      "mode": "sphero",
      "command": "roll",
      "value": [1,speed]
    })
  });

  console.log(speed);

  window.fetch(request).then(function(response) {return response.status;}).then(function(status) {
    console.log(status);
  });
}

const speedButtonClick = function () {
  speed++;
  document.querySelector('#speed').textContent = speed;
}

const stopButtonClick = function () {
  var request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      "mode": "sphero",
      "command": "roll",
      "value": [0,0]
    })
  });

  window.fetch(request).then(function(response) {return response.status;})
    .then(function(status) {
      console.log(status);
    });
}
