
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

const canvas5 = document.getElementById('canvas5');
var ctx5 = canvas5.getContext('2d');

const daVinci1 = new Image();
daVinci1.src = 'daV1.png';

const daVinci2 = new Image();
daVinci2.src = 'daV2.png';

canvas5.width = window.innerWidth;
canvas5.height = window.innerHeight;
ctx5.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas5.width = window.innerWidth;
    canvas5.height = window.innerHeight;
    particleArray = [];
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

let particleArray = [];
const numberOfParticles5 = 100;
const mouseRadius = 100;;
const grow5 = 3;
const shrink5 = 0.2;
const speed5 = -2;
const maxSize5 = 150;
const minSize5 = 20;
const colors5 = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(192,208,224,0.8)',
    'rgba(208,208,208,0.8)'
]

function Particle(x, y, directionX, directionY, axis1, axis2, color, strokeColor, shape){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.axis1 = axis1;
    this.axis2 = axis2;
    this.color = color;
    this.strokeColor = strokeColor;
    this.shape = shape;
}

Particle.prototype.draw = function() {
    ctx5.fillStyle = this.color;
    ctx5.strokeStyle = this.strokeColor;
    if (this.shape < 0.5){
        ctx5.beginPath();
        ctx5.ellipse(this.x, this.y, this.axis1, this.axis2, 0, 0, Math.PI * 2, false);
        ctx5.fill();
// ctx5.drawImage(daVinci1, this.x - this.axis1, this.y - this.axis2, this.axis1 * 2, this.axis2 * 2);
    } else {
        ctx5.fillRect(this.x - this.axis1, this.y - this.axis2, this.axis1 * 2, this.axis2 * 2);
// ctx5.drawImage(daVinci2, this.x - this.axis1, this.y - this.axis2, this.axis1 * 2, this.axis2 * 2);
    }
    ctx5.stroke();
}

Particle.prototype.update = function(){
    this.x += this.directionX;
    if(this.x + this.axis1 > canvas5.width || this.x - this.axis1 < 0){
        this.directionX = -this.directionX;
        this.x += this.directionX;
    }
    this.y += this.directionY;
    if(this.y + this.axis2 > canvas5.height || this.y - this.axis2 < 0){
        this.directionY = -this.directionY;
        this.y += this.directionY;
    }

    if( mouse.x - this.x < mouseRadius &&
        mouse.x - this.x > -mouseRadius &&
        mouse.y - this.y < mouseRadius &&
        mouse.y - this.y > -mouseRadius ) {

            if( this.axis1 < maxSize5 && this.axis2 < maxSize5) {
                this.axis1 += grow5;
                this.axis2 += grow5;
            }
        } else if (this.axis1 > 0 && this.axis2 > 0){
            this.axis1 -= shrink5;
            this.axis2 -= shrink5;
        }
    if (this.axis1 > 0 && this.axis2 > 0){
        this.draw();
    }
}

function newParticle(x, y){
    let axis1 = (maxSize5 - minSize5) * Math.random() + minSize5;
    let axis2 = (maxSize5 - minSize5) * Math.random() + minSize5;
    if (x == -1) {
        x = Math.random() * (innerWidth - axis1 * 2) + axis1;
    }
    if (y == -1) {
        y = Math.random() * (innerHeight - axis2 * 2) + axis2;
    }
    let directionX = Math.random() * speed5 - speed5 / 2;
    let directionY = Math.random() * speed5 - speed5 / 2;
    let red = Math.floor(256 * (Math.random()));
    let green = Math.floor(256 * (Math.random()));
    let blue = Math.floor(256 * (Math.random()));
    var red1, green1, blue1;
    if (red > 127){red1 = red - 8} else {red1 = red + 8}
    if (green > 127){green1 = green - 32} else {green1 = green+32}
    if (blue > 127){blue1 = blue - 32} else {blue1 = blue+32}
    let opacity = Math.random() / 2 + 0.5;
    let color = 'rgba('+red+','+green+','+blue+','+opacity+')';
    let strokeColor = 'rgba('+red1+','+3*green1+','+blue1+','+opacity+')';
    let shape = Math.random();
    
    particleArray.push(new Particle(x, y, directionX, directionY, axis1, axis2, color, strokeColor, shape));
}

function init(){

    for(let ii = 0; ii < numberOfParticles5; ii++){
        newParticle(-1, -1);
    }
}

window.addEventListener('mousedown', function(event){
    newParticle(event.x, event.y);
});

function animate(){
    requestAnimationFrame(animate);
    ctx5.clearRect(0,0,innerWidth,innerHeight);

    for (let ii=0; ii<particleArray.length; ii++){
        particleArray[ii].update();
    }
}

init();
animate();

