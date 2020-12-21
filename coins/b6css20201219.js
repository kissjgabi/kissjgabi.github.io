
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


let edge1 = 160;
const stroke1 = "white";
const div1 = 12;
const rootsNr1 = 3;
const rootColor1 = "red";

var red = Math.round(256 * (Math.random()));
var green = Math.round(256 * (Math.random()));
var blue = Math.round(256 * (Math.random()));

var red1 = Math.round(256 * (Math.random()));
var green1 = Math.round(256 * (Math.random()));
var blue1 = Math.round(256 * (Math.random()));
const opacity = 0.01;

const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

canvas1.width = window.innerWidth * 2;
canvas1.height = window.innerHeight * 2;
ctx1.globalCompositeOperation = gCompositeOp[0];

const mouse = {
    x: null,
    y: null
}

let isDrawing = true;

window.addEventListener('mousedown', function(event){
    if (event.button == 0){
    isDrawing = true;
    red1 += Math.round(8 * (Math.random() - 0.5));
    green1 += Math.round(8 * (Math.random() - 0.5));
    blue1 += Math.round(8 * (Math.random() - 0.5));
    red1 = red1 & 255;
    green1 = green1 & 255;
    blue1 = blue1 & 255;

    ctx1.fillStyle = 'rgba('+red+','+green+','+blue+','+opacity+')';
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
    branchOut();}
});

window.addEventListener('mouseup', function(event){
    isDrawing = false;
});

window.addEventListener('wheel', function(event){
  var y = event.deltaY;
  if (y < 0) {
    edge1 += 10;
    if (edge1 > 800){
        edge1 = 800;
    }
  } else {
    edge1 -= 10;
    if (edge1 < 20){
        edge1 = 20;
    }
  }

});

window.addEventListener('mousemove', function(event){
    mouse.x = event.x * 2;
    mouse.y = event.y * 2;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
    if(isDrawing){
        branchOut();
    }
});

window.addEventListener('resize', function(){
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
});

class Root1 {
    constructor(x, y, color, centerX, centerY) {
        this.speedX = 0;
        this.speedY = 0;
        this.radius = 0;
        this.x = x;
        this.y = y;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.speedX += (Math.random() - 0.5);
        this.speedY += (Math.random() - 0.5);
        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt( distanceX * distanceX + distanceY * distanceY);
        this.radius = (-distance / edge1 + 1) * edge1 / div1;

        if (this.radius > 0) {
            red += Math.round(4 * (Math.random() - 0.5));
            green += Math.round(4 * (Math.random() - 0.5));
            blue += Math.round(4 * (Math.random() - 0.5));
            red = red & 255;
            green = green & 255;
            blue = blue & 255;
            if(red < 48){red = 128; green = 192; blue = 64;}
            if(green < 64){red = 64; green = 255; blue = 192;}
            if(blue < 32){red = 192; green = 128; blue = 64;}

            requestAnimationFrame(this.draw.bind(this));
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx1.fillStyle = 'rgb('+red+','+green+','+blue+')';
            ctx1.fill();
            ctx1.beginPath();
            ctx1.ellipse(this.x, this.y, this.radius, 5*this.radius/4 ,Math.PI*Math.random() , 0, 2 * Math.PI);
            ctx1.fillStyle = 'rgb('+red+','+green+','+blue+')';
            ctx1.fill();
            ctx1.strokeStyle = 'rgb('+red/2+','+green/2+','+blue/2+')';
            ctx1.stroke();
        }
    }
}

function branchOut(){
    const centerX = mouse.x;
    const centerY = mouse.y;
    for (let ii = 0; ii < rootsNr1; ii++){
        const root = new Root1(mouse.x, mouse.y, rootColor1, centerX, centerY);
        root.draw();
    }
}

