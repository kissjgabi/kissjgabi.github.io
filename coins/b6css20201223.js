
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

const canvas26 = document.getElementById('canvas26');
var ctx26 = canvas26.getContext('2d');

canvas26.width = window.innerWidth;
canvas26.height = window.innerHeight;
ctx26.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas26.width = window.innerWidth;
    canvas26.height = window.innerHeight;
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

window.addEventListener('mousedown', function(event){
    
});

let particleArray = [];
const numberOfParticles26 = 100;
let wobble = 1;
let wobble2 = 1;

class Particle {
    constructor(moveRadius, step, position, size, print, spikes){
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
        this.print = print;
        this.spikes = spikes;
    }

    fill(){
        wobble += 0.0002;
        ctx26.fillStyle = "white";
        ctx26.beginPath();
        ctx26.arc(
            Math.cos(this.position + Math.cos(wobble))*this.moveRadius + canvas26.width / 2,
            Math.sin(this.position + Math.sin(wobble))*this.moveRadius + canvas26.height / 2,
            this.size, 0, Math.PI*2
        );
        ctx26.closePath();
        ctx26.fill();
    }
    
    stroke(){
        wobble2 += 0.0001;
        ctx26.strokeStyle = "white";
        ctx26.beginPath();
        ctx26.arc(
            Math.cos(this.position + Math.cos(wobble))*this.moveRadius + canvas26.width / 2,
            Math.sin(this.position + Math.sin(wobble))*this.moveRadius + canvas26.height / 2,
            this.size, 0, Math.PI*2
        );
        ctx26.closePath();
        ctx26.stroke();
    }
    
    starStroke(){
        ctx26.strokeStyle = "white";
        let x = Math.cos(this.position)*this.moveRadius + canvas26.width / 2;
        let y = Math.sin(this.position)*this.moveRadius + canvas26.height / 2;

        drawStar(x, y, this.spikes, this.size, this.size / 2);     
        ctx26.stroke();
    }
    
    starFill(){
        ctx26.fillStyle = "white";
        let x = Math.cos(this.position)*this.moveRadius + canvas26.width / 2;
        let y = Math.sin(this.position)*this.moveRadius + canvas26.height / 2;

        drawStar(x, y, this.spikes, this.size, this.size / 2);     
        ctx26.fill();
    }
    
    update(){
        
        switch (this.print){
            case 0:
                this.position += this.step / 4;
                this.fill();
                break;
            case 1:
                this.position += this.step / 8;
                this.stroke();
                break;
            case 2:
                this.position += this.step;
                this.starStroke();
                break;
            case 3:
                this.position += this.step;
                this.starFill();
                break;
            default:
                this.stroke();
        }
        
    }
}

function init(){
    particleArray = [];
    for(let ii = 0; ii < numberOfParticles26; ii++){
        let moveRadius = Math.random() * canvas26.width;
        let step = Math.random() * 0.002 + 0.002;
        let position = Math.random() * Math.PI*2;
        let size = Math.random() * 15 + 5;
        let print = Math.floor(Math.random() * 4);
        let spikes = Math.random() * 3 + 4;

        particleArray.push(
            new Particle(moveRadius, step, position, size, print, spikes)
        )
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx26.fillStyle = 'rgba(96, 96, 128, 0.01)';
    ctx26.fillRect(0,0,innerWidth,innerHeight);

    for (let ii=0; ii<particleArray.length; ii++){
        particleArray[ii].update();
    }
}

init();
animate();

function drawStar(posX, posY, spikes, outerRadius, innerRadius) {
    let rotation = Math.PI / 3;
    let x = posX + Math.cos(rotation) * outerRadius;
    let y = posY + Math.sin(rotation) * outerRadius;
    let step = Math.PI / spikes;

    ctx26.beginPath()
    ctx26.moveTo(x, y - outerRadius);
    for (let ii= 0; ii < spikes; ii++){
        x = posX + Math.cos(rotation) * outerRadius;
        y = posY + Math.sin(rotation) * outerRadius;
        ctx26.lineTo(x, y);
        rotation += step;

        x = posX + Math.cos(rotation) * innerRadius;
        y = posY + Math.sin(rotation) * innerRadius;
        ctx26.lineTo(x, y);
        rotation += step;
    }
    ctx26.closePath();
}

