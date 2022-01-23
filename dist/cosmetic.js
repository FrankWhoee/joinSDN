"use strict";

var _countUp = require("./countUp.js");

var selected = [];

for (var i = 1; i <= 8; i++) {
  var r = Math.floor(Math.random() * 20);

  while (selected.includes(r)) {
    r = Math.floor(Math.random() * 20);
  }

  selected.push(r);
  console.log("cim" + i);
  document.getElementById("cim" + i).src = "images/covers/" + r + ".jpg";
}

function changeRandomPicture() {
  var i = Math.floor(Math.random() * 8) + 1;
  var el = document.getElementById("cim" + i);
  var curr = parseInt(el.src.split("/")[5].split(".")[0]);
  selected.splice(selected.indexOf(curr), 1);
  var r = Math.floor(Math.random() * 20);

  while (selected.includes(r)) {
    r = Math.floor(Math.random() * 20);
  }

  selected.push(r);
  var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  });
  tl.add({
    targets: [el],
    opacity: 0,
    complete: function complete(anim) {
      el.src = "images/covers/" + r + ".jpg";
    }
  }).add({
    targets: [el],
    opacity: 1
  });
} // setInterval(changeRandomPicture, Math.random() * 1000);
// setInterval(changeRandomPicture, Math.random() * 1000);


function countStart() {
  fetch("/count").then(function (response) {
    return response.json();
  }).then(function (data) {
    var pcount = new _countUp.CountUp('playercount', data.count);
    pcount.start();
  });
}

function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}

function countMF() {
  sleep(1000).then(function () {
    document.getElementById("mfnum").innerHTML = 2;
    sleep(1000).then(function () {
      document.getElementById("mfnum").innerHTML = 1;
      sleep(1000).then(function () {
        var tl = anime.timeline({});
        tl.add({
          targets: '.mf',
          opacity: 0,
          complete: function complete() {
            document.getElementById("joinsdnbutton").style.display = "inline";
          }
        }).add({
          targets: '.mfbutton',
          opacity: 1
        });
      });
    });
  });
}

ScrollReveal().reveal('#playercount', {
  beforeReveal: countStart
});
ScrollReveal().reveal('.rankicons', {
  distance: '100px'
});
ScrollReveal().reveal('#mfnum', {
  beforeReveal: countMF
});

function updatePlayerCount() {
  fetch("/count").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("playercount").innerHTML = data.count;
  });
}

$('#idinput').ajaxForm({
  url: '/idsubmit',
  // or whatever
  dataType: 'json',
  error: function error(response) {
    if (response.status === 200) {
      document.getElementById("inputsuccess").innerHTML = "Success! You've been added.";
      document.getElementById("inputerror").innerHTML = "";
      refreshAndRender();
      updatePlayerCount();
    } else if (response.status === 401) {
      document.getElementById("inputsuccess").innerHTML = "";
      document.getElementById("inputerror").innerHTML = "There's already someone with the same name and tag!";
    } else {
      document.getElementById("inputsuccess").innerHTML = "";

      if (document.getElementById("riotid").innerText === "") {
        document.getElementById("inputerror").innerHTML = "Can't be empty!";
      } else if (!document.getElementById("riotid").value.startsWith("SDN") && !document.getElementById("riotid").value.includes("#")) {
        document.getElementById("inputerror").innerHTML = "Your name must start with SDN and you are missing the tag!";
      } else if (!document.getElementById("riotid").value.includes("#")) {
        document.getElementById("inputerror").innerHTML = "You are missing the tag!";
      } else if (!document.getElementById("riotid").value.startsWith("SDN")) {
        document.getElementById("inputerror").innerHTML = "Your name must start with SDN!";
      } else {
        document.getElementById("inputerror").innerHTML = "Server error. Report to errors@joinSDN.com";
      }
    }
  }
});
//# sourceMappingURL=cosmetic.js.map