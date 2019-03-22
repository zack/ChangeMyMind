window.onload=function(){
	window.socket = io.connect('http://' + document.domain + ':' + location.port);

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
	if(document.getElementById("text-input").value.trim().length > 0) {
		window.socket.emit( 'my event', {
				user_name : 'username',
				message : document.getElementById("text-input").value
		} )

		window.socket.on( 'my response', function( msg ) {
			console.log( msg )

			if( typeof msg.user_name !== 'undefined' ) {
				var name = document.createElement("div");
				var bubble = document.createElement("div");
				var conv = document.getElementById("conv");

				name.innerHTML = msg.user_name;
				name.style.textAlign = "right";
				name.style.marginTop = "1px";
				name.style.color = "grey";
				name.style.fontSize = "10";

				bubble.innerHTML = msg.message;
				bubble.style.width = "auto";
				bubble.style.height = "auto";
				bubble.style.display = "table";
				bubble.style.wordBreak = "break-all";
				bubble.style.wordWrap = "normal";
				bubble.style.borderRadius = "10px";
				bubble.style.padding = "7px";
				bubble.style.marginLeft = "auto";
				bubble.style.marginRight = "0px";
				bubble.style.marginTop = "1px";
				bubble.style.maxWidth = "40%";
				bubble.style.background = "#6666ff";
				bubble.style.color = "white";


				conv.append(name);
				conv.appendChild(bubble);
				conv.scrollTop = conv.scrollHeight;

				document.getElementById("text-input").value = "";
			}
		})
	}



}
