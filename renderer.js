'use strict'

const ipcRenderer = require('electron').ipcRenderer;
const $ = require('jquery');

const url = 'http://localhost:4000';

var $closeButton, $colorButton, $rollButton, $stopButton,
    $speedButton, $discoButton = undefined;
var speed = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  wireUpButtons();
});

const wireUpButtons = () => {

  $closeButton = $('#close-window');
  $colorButton = $('#color-button');
//  $colorRedButton = $('#color-red-button');
  $rollButton = $('#roll-button');
  $stopButton = $('#stop-button');
  $speedButton = $('#speed-button');
  $discoButton = $('#disco-button');

  $closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });

  $colorButton.on('click', function() {
    colorButtonClick("blue");
  });

  //$colorRedButton.on('click', colorButtonClick("red"));
  $rollButton.on('click', rollButtonClick);
  $speedButton.on('click', speedButtonClick);
  $stopButton.on('click', stopButtonClick);
  $discoButton.on('click', discoButtonClick);
}

function colorButtonClick(color) {

  console.log("color changed to " + color);

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

  askBB8(request);
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

  askBB8(request);
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

  askBB8(request);
}

const discoButtonClick = function () {
  console.log("disco party!");

  var request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      "mode": "custom",
      "command": "disco"
    })
  });

  askBB8(request);
}

function askBB8(request) {
  window.fetch(request).then(function(response) {return response.status;})
    .then(function(status) {
      console.log(status);
    });
}
