
'use strict';

if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
  var mustard = 'cut';
}

var canvas          = document.getElementById('dots');
var context         = canvas.getContext('2d');
var maxVelocity     = 10;
var particlesArray  = [];
var particlesIds    = [];
var particlesOrigin = {
  x: 0,
  y: 0
};

var Particle = function () {
  this.id        = Math.random().toString(36).substr(2, 5);
  this.alpha     = random(0.75, 1);
  this.rgb       = randomColor();
  this.size      = Math.round(random(50));
  this.half      = Math.round(this.size / 2);
  this.colorStop = this.size / 40;

  this.colorStop = 1;

  this.position = {
    x: particlesOrigin.x - this.half,
    y: particlesOrigin.y - this.half
  };

  this.velocity = {
    x: random(0, maxVelocity) - (maxVelocity / 2),
    y: random(0, maxVelocity) - (maxVelocity / 2)
  };
};

Particle.prototype.updateValues = function () {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

Particle.prototype.draw = function () {
  var rgb = this.rgb.r + ', ' + this.rgb.g + ', ' + this.rgb.b;

  if (this.colorStop < 1) {
    var radgrad = context.createRadialGradient(this.position.x + this.half, this.position.y + this.half, 0, this.position.x + this.half, this.position.y + this.half, this.half);

    radgrad.addColorStop(0,              'rgba(' + rgb + ', ' + this.alpha + ')');
    radgrad.addColorStop(this.colorStop, 'rgba(' + rgb + ', ' + this.alpha + ')');
    radgrad.addColorStop(1,              'rgba(' + rgb + ', 0)');

    context.fillStyle = radgrad;
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  } else {
    context.fillStyle = 'rgba(' + rgb + ', ' + this.alpha + ')';
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.half, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
  }
};

Particle.prototype.withinCanvasBounds = function () {
  var result = true;

  if (this.position.x < -this.size) {
    result = false;
  } else if (this.position.x > canvas.width + this.size) {
    result = false;
  }

  if (this.position.y < -this.size) {
    result = false;
  } else if (this.position.y > canvas.height + this.size) {
    result = false;
  }

  return result;
};

function addParticle() {
  var particle = new Particle();

  particlesArray.unshift(particle);
  particlesIds.unshift(particle.id);
}

function animationLoop() {
  window.requestAnimationFrame(animationLoop);

  var particle;
  var particlesToDelete = [];

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0, n = particlesArray.length; i < n; i += 1) {
    particle = particlesArray[i];

    if (particle.withinCanvasBounds()) {
      particle.updateValues();
      particle.draw();
    } else {
      particlesToDelete.push(particle.id);
    }
  }

  destroyParticlesOutsideCanvasBounds(particlesToDelete);

  addParticle();
}

function destroyParticlesOutsideCanvasBounds(particlesToDelete) {
  for (var i = 0, n = particlesToDelete.length; i < n; i += 1) {
    var id       = particlesToDelete[i];
    var index    = particlesIds.indexOf(id);
    var particle = particlesArray[index];

    if (particle) {
      particlesArray.splice(index, 1);
      particlesIds.splice(index, 1);
    }
  }
}

function random(min, max) {
  if (min === undefined) {
    min = 0;
    max = 1;
  } else if (max === undefined) {
    max = min;
    min = 0;
  }

  return (Math.random() * (max - min)) + min;
}

function randomColor() {
  return {
    r: randomInteger(0, 200),
    g: randomInteger(0, 200),
    b: randomInteger(0, 200)
  };
}

function randomInteger(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function updateParticlesOrigin(event) {
  event.preventDefault();

  particlesOrigin.x = event.pageX;
  particlesOrigin.y = event.pageY;
}

canvas.width  = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var devicePixelRatio  = window.devicePixelRatio || 1;
var backingStoreRatio = context.webkitBackingStorePixelRatio || context.backingStorePixelRatio || 1;
var ratio             = devicePixelRatio / backingStoreRatio;

if (devicePixelRatio !== backingStoreRatio) {
  var oldWidth  = canvas.width;
  var oldHeight = canvas.height;

  canvas.width  = oldWidth * ratio;
  canvas.height = oldHeight * ratio;

  canvas.style.width  = oldWidth + 'px';
  canvas.style.height = oldHeight + 'px';

  context.scale(ratio, ratio);
}

document.addEventListener('mousemove', updateParticlesOrigin);

animationLoop();
