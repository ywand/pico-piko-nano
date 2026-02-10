console.log("start");


var gui;
var stat;
const NUM = 2000;
const FF = 255;
const MAX_COUNT = 10000;
const MAX_SIZE = 50;
var x = [NUM];
var y = [NUM];
var n = 0;

class Stat {
  constructor() {
    this.num = R(500, 500);
    this.size = R(1, 5);
    this.speed = 5;
    this.time = 0.5;
    this.wait = 0;
    this.r = R(0, FF);
    this.g = R(0, FF);
    this.b = R(0, FF);
    this.bw = 0;
    this.shape = R(1, 1);
    this.line = R(0, 0);
    this.col = 0;
    this.count = 0;
    this.clear = false;
    this.stop = false;
    this.reset = false;
    this.gravity = R(0, 5);
    this.RandomColSwitch = true;
    this.gravitySwitch = true;
    this.dbg = 0;
  }
}

function a1() {
  stat.num = 20;
  stat.size = 50;
  stat.speed = 5;
  stat.gravity = 50;
  stat.time = 1;
  stat.wait = 5;
  stat.r = 0;
  stat.g = 100;
  stat.b = 0;
  stat.bw = -0.2;
  stat.shape = 5;
  stat.line = 2;
  stat.clear = true;
}

function setup() {
  console.log("setup");

  stat = new Stat();
  gui = new dat.GUI();
  gui.width = windowWidth / 3;
  gui.add(stat, 'num', 1, NUM).listen();
  gui.add(stat, 'size', 1, MAX_SIZE).listen();
  gui.add(stat, 'speed', 0, 30).listen();
  gui.add(stat, 'gravity', 0, 10).step(0.1).listen();
  gui.add(stat, 'time', 0.1, 10).listen();
  gui.add(stat, 'wait', 0, 10).listen();
  gui.add(stat, 'r', 0, FF).listen();
  gui.add(stat, 'g', 0, FF).listen();
  gui.add(stat, 'b', 0, FF).listen();
  gui.add(stat, 'bw', -1.00, 1.00).step(0.01).listen();
  gui.add(stat, 'shape', 0, 7).step(1).listen();
  gui.add(stat, 'line', 0, 10).listen();
  gui.add(stat, 'col', 0, FF).listen();
  gui.add(stat, 'count', 0, MAX_COUNT).listen();
  gui.add(stat, 'RandomColSwitch').listen();
  gui.add(stat, 'gravitySwitch').listen();
  gui.add(stat, 'clear').listen();
  gui.add(stat, 'stop').listen();
  //gui.add(stat, 'reset').listen();
  //gui.add(stat, 'dbg', -1000, 1000).step(0.01).listen();
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < MAX_COUNT; i++) {
    x[i] = R(0, windowWidth);
    y[i] = R(0, windowHeight);
  }

  setupDevice();
}



function draw() {
  if (stat.stop) {
    return;
  }

  stat.count++;

  if (1 < stat.count % (stat.wait + 1)) {
    return;
  }

  stat.col += n * stat.time;

  if (stat.col > FF) {
    n = -1;
  } else if (stat.col <= 0) {
    n = 1;
  }
  if (stat.clear) {
    background(0)
  }
  anime();

}

function anime() {
  setRandomColor();
  setColor();
  clickPos(x, y);
  move(x, y);
  text("devR:" + dev.alpha + "/" + dev.beta + "/" + dev.gamma, 8, 8);
}

function checkPos(val, size, min, max) {
  if (val >= max + size) {
    return min - size;
  }
  if (val <= min - size) {
    return max + size;
  }
  return val
}

function setColor() {
  strokeWeight(stat.line);
  stroke(stat.bw * stat.r, stat.bw * stat.g, stat.bw * stat.b);
  fill(stat.r + stat.col + FF * stat.bw, stat.g + stat.col + FF * stat.bw, stat.b + stat.col + FF * stat.bw);
}

function setRandomColor() {
  let r;
  if (stat.count % 100 == 0) {
    stat.r = Math.max(0, Math.min(255, stat.r + R(-10, 10)));
  }
  if (stat.count % 100 == 0) {
    stat.g = Math.max(0, Math.min(255, stat.g + R(-10, 10)));
  }
  if (stat.count % 100 == 0) {
    stat.b = Math.max(0, Math.min(255, stat.b + R(-10, 10)));
  }
}


function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case 32:
      stat.stop = rbool(stat.stop);
      break;
    case 37:
      stat.size /= 2;
      if (stat.size < 1) {
        stat.size = 1;
      }
      break;
    case 38:
      stat.num *= 2;
      if (stat.num >= NUM) {
        stat.num = NUM;
      }
      break;
    case 39:
      stat.size *= 2;
      if (stat.size > MAX_SIZE) {
        stat.size = MAX_SIZE;
      }
      break;
    case 40:
      stat.num /= 2;
      if (stat.num <= 1) {
        stat.num = 1;
      }
      break;
    case 83:
      stat.shape += 1;
      if (stat.shape > 7) {
        stat.shape = 0;
      }
      break;
    case 67:
      stat.clear = rbool(stat.clear);
      break;
    case 27:
      gui.closed = rbool(gui.closed);
      break;
    case 66:
      stat.b = R(0, FF);
      break;
    case 82:
      stat.r = R(0, FF);
      break;
    case 71:
      stat.g = R(0, FF);
      break;
    case 76:
      if (stat.line > 0) {
        stat.line = 0;
      } else {
        stat.line = 1;
      }
      break;
    case 80:
      stat.speed = R(1, 30);
      break;
    case 87:
      stat.bw = R(0, 10) / 10 - 0.5;
      break;
    case 84:
      stat.time = R(0, 10);
      break;
    case 86:
      if (stat.gravity > 0) {
        stat.gravity = 0;
      } else {
        stat.gravity = 9.8;
      }
      break;
  }
}

function move(lsx, lsy) {
  for (let i = 0; i < stat.num; i++) {
    lsx[i] += R(-stat.speed, stat.speed);
    lsy[i] += R(-stat.speed, stat.speed);
    if (stat.gravitySwitch == true && 0 < stat.gravity) {
      lsy[i] += stat.gravity;
    }
    lsx[i] = checkPos(lsx[i], stat.size, 0, windowWidth);
    lsy[i] = checkPos(lsy[i], stat.size, 0, windowHeight);
    dShape(stat.shape, lsx[i], lsy[i], stat.size, stat.size);
  }
}

function dShape(n, x, y, w, h) {
  stat.d = parseInt(stat.count / 100) % 5;
  switch (n) {
    case 1:
      ellipse(x + w / 2, y + h / 2, w, h);
      break;
    case 2:
      stat.dbg = stat.r % stat.col;
      strokeWeight(stat.line + 1);
      stroke(FF * stat.bw + stat.r + stat.col, FF * stat.bw + stat.g + stat.col, FF * stat.bw + stat.b + stat.col);
      line(x, y, x + w, y + h);
      break;
    case 3:
      triangle(x, y, x + w, y, x + w / 2, y + h);
      break;
    case 4:
      rect(x, y, w, h);
      break;
    case 5:
      textSize(w);
      text(R(0, 1), x - w / 2, y - h / 2);
      break;
    case 6:
      textSize(w);
      text("p5.js", x + w / 2, y + h / 2);
      break;
    default:
      dShape(parseInt(stat.count / 2000) % 5 + 1, x, y, w, h);
      break;
  }
}

function clickPos(lsx, lsy) {
  for (let i = 0; i < stat.num; i++) {
    if (mouseIsPressed) {
      if (lsx[i] + stat.size / 2 < mouseX) {
        lsx[i] += stat.speed;
      } else {
        lsx[i] -= stat.speed;
      }
      if (lsy[i] + stat.size / 2 < mouseY) {
        lsy[i] += stat.speed;
      } else {
        lsy[i] -= stat.speed;
      }
    }
  }
}

function R(min, max) {
  return min + round(random(abs(max - min)));
}

function rbool(bool) {
  if (bool) {
    return false;
  }
  return true;
}

function setupDevice() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    // iOS Safari
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", onOrientation);
        }
      })
      .catch(console.error);
  } else {
    // Android / PC
    window.addEventListener("deviceorientation", onOrientation);
  }
  dev = new DeviceData();
}

class DeviceData {
  constructor() {
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
  }
}

function onOrientation(event) {
  const { alpha, beta, gamma } = event;
  if (alpha == null || beta == null || gamma == null) {
    dev.alpha = 0.0;
    dev.beta = 0.0;
    dev.gamma = 0.0;
  } else {
    dev.alpha = Math.floo(alpha * 10);
    dev.beta = Math.floo(beta);
    dev.gamma = Math.floo(gamma);
  }
  console.log(dev);
}
