// document.addEventListener("DOMContentLoaded", function(event) {
// });

const zenButton = document.getElementById('zen-button');
// const rollButton = document.getElementById('roll-button');
// const Button = document.getElementById('stop-button');

// curl -v -H "Content-Type: application/json" -X POST -d
// '{"mode":"sphero","command":"color","value": "yellow"}'
// http://localhost:3000

zenButton.addEventListener('click', function (event) {
  const url = 'http://localhost:3000';

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

  window.fetch(request).then(function(response) {return response.status;}).then(function(status) {
    console.log(status);
  });
})
