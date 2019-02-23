var top = 5;

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

function Send_Btn(top) {
	var bubble = document.createElement("div");
	bubble.innerHTML = "Me: " + document.getElementById("text-input").value;
	bubble.style.width = "100px";
	bubble.style.height = "10px";
	bubble.style.borderRadius = "10px";
	bubble.style.padding = "10px"; 
	bubble.style.position = "absolute";
	top += 30;
	top = top + 30;
	alert(top);
	bubble.style.top = top.toString(); 
	bubble.style.right = "5px";
	bubble.style.background = "#6666ff";
	bubble.style.color = "white";

	document.getElementById("conv").appendChild(bubble);
	//document.getElementById("conv").innerHTML+="Me: " + document.getElementById("text-input").value + "<br>";
	document.getElementById("text-input").value = "";
}

