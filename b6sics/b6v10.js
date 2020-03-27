
window.addEventListener("resize", b6WindowResize);

function b6WindowResize() {
	
	navigationMenuReset();
    if (globalID != null){
		cancelRequestAnimFrame (globalID);
	}
	b6canvasresize();
	globalID = setTimeout(b6canvasupdate, 1000 / 60);
}
