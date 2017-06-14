var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/Bell-ding.mp3');

var t = 1500;
var interval;
var work = 1500;
var rest = 300;
var storedTime = 1500;
var status = document.getElementById('status');
var stop = false;
var pause = false;
var restTimer = false;

function changeTime(x, type) {
 var y;
 if (type === 'rest') {rest = eval(rest + x + 60); y = rest;} 
 if (type === 'work') {work = eval(work + x + 60); y = work;}
 if (y > 0) {
  document.getElementById(type).innerHTML = y / 60;
 } else if (y <= 0) {
  if (rest < 60) {rest = 60;}
  if (work < 60) {work = 60;}
 }
}

function pauseBtn() {
 clearInterval(interval); 
 pause = !pause;
 stop = false;
 if (pause) {
  document.getElementById('pause').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  storedTime = t;
  }
 else {
  document.getElementById('pause').innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  timer(storedTime);
 }
}

function timer(time) {
 var time = new Date().getTime() + (time * 1000);
 interval = setInterval(function() {
  var now = new Date().getTime();
  t = Math.ceil((time - now) / 1000);
  var min = Math.floor(t / 60);
  var sec = t % 60;
  if (min < 10) {min = "0" + min;} // 2 digits min
  if (sec < 10) {sec = "0" + sec;} // 2 digits sec
  if (t <= 0 || stop === true) { // end timer
   min = "00"; 
   sec = "00";
   clearInterval(interval);
   if (!stop) {
   restTimer = !restTimer;
   pomodoro();
   }
  }
  if (!stop) {
  document.getElementById('timer').innerHTML = min + ":" + sec;
  } else {
   document.getElementById("timer").innerHTML = '<a href="#" onclick="pomodoro();"><i class="fa fa-play" aria-hidden="true"></i></a>';
  }
 }, 1000);
}

function pomodoro() {
 audio.play();
 stop = false;
 var x = work;
 
 if (!restTimer) {
  document.getElementById('status').innerHTML = "Get To It!";
  // document.body.classList.remove("color-rest");
  // document.body.classList.toggle("color-work");
 }
 if (restTimer) {
  document.getElementById('status').innerHTML = 'Take a Break <i class="fa fa-coffee" aria-hidden="true"></i>';
  // document.body.classList.remove("color-work");
  // document.body.classList.toggle("color-rest");
  x = rest;
 }
 timer(x);
}