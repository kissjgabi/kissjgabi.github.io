
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

const canvas4 = document.getElementById('canvas4');
var ctx4 = canvas4.getContext('2d');

canvas4.width = window.innerWidth;
canvas4.height = window.innerHeight;
ctx4.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;
    init();
});

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

let particleArray;
const numberOfParticles4 = 100;
const maxSize4 = 20;
const speed4 = 0.5;

function Particle(x, y, directionX, directionY, size, color, shape){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.shape = shape;
}

Particle.prototype.draw = function() {
    ctx4.fillStyle = this.color;
    if(this.shape < 0.5){
        ctx4.beginPath();
        ctx4.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx4.fill();
    } else {
        ctx4.fillRect(this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size);
    }
}

Particle.prototype.update = function(){
    this.x += this.directionX;
    if(this.x + this.size > canvas4.width || this.x - this.size < 0){
        this.directionX = -this.directionX;
        this.x += this.directionX;
    }
    this.y += this.directionY;
    if(this.y + this.size > canvas4.height || this.y - this.size < 0){
        this.directionY = -this.directionY;
        this.y += this.directionY;
    }
    this.draw();
}

function init(){
    particleArray = [];
    for(let ii = 0; ii < numberOfParticles4; ii++){
        let size = maxSize4 * Math.random() +1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let directionX = Math.random() * 2 * speed4 - speed4;
        let directionY = Math.random() * 2 * speed4 - speed4;
        let red = Math.round(256 * (Math.random()));
        let green = Math.round(256 * (Math.random()));
        let blue = Math.round(256 * (Math.random()));
        let opacity = Math.random() / 2 + 0.5;
        let color = 'rgba('+red+','+green+','+blue+','+opacity+')';
        let shape = Math.random();
        particleArray.push(new Particle(x, y, directionX, directionY, size, color, shape));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx4.clearRect(0,0,innerWidth,innerHeight);

    for (let ii=0; ii<particleArray.length; ii++){
        particleArray[ii].update();
    }
}

init();
animate();






