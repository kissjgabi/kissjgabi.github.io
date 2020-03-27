function navigationMenuToggle() {
	var nodelistOFmenulinkicon = document.getElementsByClassName("menulinkiconSmall");
	var menulinkiconLength = nodelistOFmenulinkicon.length;
	
	for ( var xx=0; xx < menulinkiconLength; xx++){
		if (nodelistOFmenulinkicon[xx].style.display == "initial"){
			nodelistOFmenulinkicon[xx].style.display = "none";    		
			} else {
			nodelistOFmenulinkicon[xx].style.display = "initial";	
			}
	}  
}

function navigationMenuReset() {
	var nodelistOFmenulinkicon = document.getElementsByClassName("menulinkiconSmall");
	var menulinkiconLength = nodelistOFmenulinkicon.length;
	
	for ( var xx=0; xx < menulinkiconLength; xx++){
			nodelistOFmenulinkicon[xx].style.display = "none";    		
	}  
}