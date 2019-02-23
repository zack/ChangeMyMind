window.onload=function(){
	document.getElementById("send-btn").addEventListener("click", Send_Btn);
	
	// Trigger send click on enter key
	document.getElementById("text-input")
		.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("send-btn").click();
		}
	});
}

function Send_Btn() {
	document.getElementById("conv").innerHTML+="Chloe: " + document.getElementById("text-input").value + "<br>";
	document.getElementById("text-input").value = "";
}

