'use strict'

const ipcRenderer = require('electron').ipcRenderer;
const $ = require('jquery');

const url = 'http://localhost:4000';

var $colorButton, $colorRedButton, $stopButton, $discoButton,
    $0Button, $90Button, $180Button, $270Button = undefined;

var currentHeading = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  wireUpButtons();
});

const wireUpButtons = () => {

  $colorButton = $('#color-button');
  $colorRedButton = $('#color-red-button');
  $stopButton = $('#stop-button');
  $discoButton = $('#disco-button');
  $0Button = $('#0-button');
  $90Button = $('#90-button');
  $180Button = $('#180-button');
  $270Button = $('#270-button');

  $colorButton.on('click', function() {
    colorButtonClick("blue");
  });

  $colorRedButton.on('click', function() {
    colorButtonClick("red");
  });

  $discoButton.on('click', discoButtonClick);

  $0Button.on('click', _0ButtonClick);
  $90Button.on('click', _90ButtonClick);
  $180Button.on('click', _180ButtonClick);
  $270Button.on('click', _270ButtonClick);
  $stopButton.on('click', stopButtonClick);
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
      "value": color
    })
  });

  askBB8(request);
};

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

const stopButtonClick = function () {
  var request = createRollRequest(0, currentHeading);
  askBB8(request);
}

const _0ButtonClick = function () {
  currentHeading = 0;
  var request = createRollRequest(2, currentHeading);
  askBB8(request);
}

const _90ButtonClick = function () {
  currentHeading = 90;
  var request = createRollRequest(2, currentHeading);
  askBB8(request);
}

const _180ButtonClick = function () {
  currentHeading = 180;
  var request = createRollRequest(2, currentHeading);
  askBB8(request);
}

const _270ButtonClick = function () {
  currentHeading = 270;
  var request = createRollRequest(2, currentHeading);
  askBB8(request);
}

function createRollRequest(speed, heading) {
  var request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      "mode": "sphero",
      "command": "roll",
      "value": [speed, heading]
    })
  });

  return request
}

function askBB8(request) {
  window.fetch(request).then(function(response) {return response.status;})
    .then(function(status) {
      console.log(status);
    });
}
