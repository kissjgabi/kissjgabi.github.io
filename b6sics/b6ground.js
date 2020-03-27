
// When the user scrolls down 180px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
        document.getElementById("button2top").style.display = "block";
        document.getElementById("buttoninfo").style.display = "none";
    } else {
        document.getElementById("button2top").style.display = "none";
        document.getElementById("buttoninfo").style.display = "block";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;	
}

function bottonFunction() {
	window.scrollTo(0,document.body.scrollHeight);
}
