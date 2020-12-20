
const gCompositeOp = [ 'source-over',
'source-in',
'source-out',
'source-atop',
'destination-over',
'destination-in',
'destination-out',
'destination-atop',
'lighter',
'copy',
'xor',
'multiply',
'screen',
'overlay',
'darken',
'lighten',
'color-dodge',
'color-burn',
'hard-light',
'soft-light',
'difference',
'exclusion',
'hue',
'saturation',
'color',
'luminosity'];

let particlesArray;

const rootColor2 = "white";
const starColor2 = "GhostWhite";
const lineColor2 = "rgba(255, 255, 255";
const connectDensity2 = 20000;
const div2 = 160;
const lineWidth2 = 1;
const push2 = 10;
const multi2 = 10;
const starDensity2 = 50000;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = window.innerWidth * 2;
canvas2.height = window.innerHeight * 2;
ctx2.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
canvas2.width = window.innerWidth * 2;
canvas2.height = window.innerHeight * 2;
init();
});

const mouse = {
x: null,
y: null,
radius: (canvas2.height/div2) * (canvas2.width/div2)
}

window.addEventListener('mousemove', function(event){
mouse.x = event.x * 2;
mouse.y = event.y * 2;
// console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

window.addEventListener('mouseout', function(){
mouse.x = undefined;
mouse.y = undefined;
});

class Particle {
constructor(x, y, directionX, directionY, size, color){
this.x = x;    
this.y = y;    
this.directionX = directionX;    
this.directionY = directionY;    
this.size = size;    
this.color = color;    
}
draw() {
ctx2.beginPath();
ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
ctx2.fillStyle = rootColor2;
ctx2.fill();
}
update() {
if(this.x > canvas2.width || this.x < 0) {
this.directionX = -this.directionX;
}
if(this.y > canvas2.height || this.y < 0) {
this.directionY = -this.directionY;
}

let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let distance = Math.sqrt(dx*dx + dy*dy);
if(distance < mouse.radius + this.size) {
if(mouse.x < this.x && this.x < 2 * canvas2.width - this.size * multi2) {
this.x += push2;
}
if(mouse.x > this.x && this.x > this.size * multi2) {
this.x -= push2;
}
if(mouse.y < this.y && this.y < 2 * canvas2.height - this.size * multi2) {
this.y += push2;
}
if(mouse.y > this.y && this.y > this.size * multi2) {
this.y -= push2;
}
}
this.x += this.directionX;
this.y += this.directionY;

this.draw();
}
}

function init() {
particlesArray = [];
let numberOfParticles = (canvas2.height * canvas2.width) / starDensity2;
for (let ii = 0; ii < numberOfParticles; ii++){
let size = (Math.random() * 5) + 1;
let x = 2 * (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
let y = 2 * (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
let directionX = (Math.random() * 5) - 2.5;
let directionY = (Math.random() * 5) - 2.5;
let color = starColor2;

particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
}
}

function connect() {
let opacity2 = 1;
for (let aa = 0; aa < particlesArray.length - 1; aa++){
for (let bb = aa + 1; bb < particlesArray.length; bb++){
let dx = particlesArray[aa].x - particlesArray[bb].x;
let dy = particlesArray[aa].y - particlesArray[bb].y;
let distance = Math.sqrt(dx*dx + dy*dy);
let connectDistance = canvas2.width * canvas2.height / connectDensity2;
if (distance < connectDistance) {
opacity2 = 1 - distance / connectDistance / 2;
ctx2.strokeStyle = lineColor2 + ", " + opacity2 + ")";
ctx2.lineWidth = lineWidth2;
ctx2.beginPath();
ctx2.moveTo(particlesArray[aa].x, particlesArray[aa].y);
ctx2.lineTo(particlesArray[bb].x, particlesArray[bb].y);
ctx2.stroke();
}
}
}
}

function animate() {
requestAnimationFrame(animate);
ctx2.clearRect(0, 0, innerWidth * 2, innerHeight * 2);

for (let ii = 0; ii < particlesArray.length; ii++){
particlesArray[ii].update();
}
connect();
}


init();
animate();

