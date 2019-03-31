/*
window.onload=function(){
    //Temporary unique debate ID
    window.debate_id = 1
    socket.on( 'connect', function() {
		document.getElementById("send-btn").onclick = function fun(e) {
				e.preventDefault()
                var signout = document.getElementById("signout").textContent.split(" ");
                var user_name = signout[signout.length-1]
		window.socket.emit( 'my event', {
				user_name : user_name,
				message : document.getElementById("text-input").value
			} )
		}
	} )

	// Trigger send click on enter key
	document.getElementById("text-input")
		.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("send-btn").click();
		}
	});



    window.socket.on( 'my response', function( msg ) {
        console.log( msg )

        if( typeof msg.user_name !== 'undefined' ) {
            var name = document.createElement("div");
            var bubble = document.createElement("div");
            var conv = document.getElementById("conv");

            name.innerHTML = msg.user_name;
            name.style.textAlign = "left";
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
            bubble.style.marginLeft = "5px";
            //bubble.style.marginRight = "0px";
            bubble.style.marginTop = "1px";
            bubble.style.maxWidth = "90%";
            bubble.style.background = "#6666ff";
            bubble.style.color = "white";


            conv.append(name);
            conv.appendChild(bubble);
            conv.scrollTop = conv.scrollHeight;
            document.getElementById("text-input").value = "";

            //Store chat in database
            dbStore(debate_id, msg.user_name, msg.message)
            dbRetrieve()
		}
	})
}
*/

window.onload = function() {
    var scheme = window.location.protocol == "https:" ? 'wss://' : 'ws://';
    var webSocketUri =  scheme
                        + window.location.hostname
                        + (location.port ? ':'+location.port: '')
                        + '/chat';

      /* Establish the WebSocket connection and register event handlers. */
      var websocket = new WebSocket(webSocketUri);

      websocket.onopen = function() {
        console.log('Connected');
      };

      websocket.onclose = function() {
        console.log('Closed');
      };

      websocket.onmessage = function(e) {
        user_name = JSON.parse(e.data)[0]
        msg = JSON.parse(e.data)[1]
        console.log('Message received');
        
        var name = document.createElement("div");
        var bubble = document.createElement("div");
        var conv = document.getElementById("conv");

        name.innerHTML = user_name;
        name.style.textAlign = "left";
        name.style.marginTop = "1px";
        name.style.color = "grey";
        name.style.fontSize = "10";

        bubble.innerHTML = msg;
        bubble.style.width = "auto";
        bubble.style.height = "auto";
        bubble.style.display = "table";
        bubble.style.wordBreak = "break-all";
        bubble.style.wordWrap = "normal";
        bubble.style.borderRadius = "10px";
        bubble.style.padding = "7px";
        bubble.style.marginLeft = "5px";
        //bubble.style.marginRight = "0px";
        bubble.style.marginTop = "1px";
        bubble.style.maxWidth = "90%";
        bubble.style.background = "#6666ff";
        bubble.style.color = "white";


        conv.append(name);
        conv.appendChild(bubble);
        conv.scrollTop = conv.scrollHeight;
        document.getElementById("text-input").value = "";

        //Store chat in database
        dbStore(window.debate_id, e.data, e.data)
        dbRetrieve()
      };

      websocket.onerror = function(e) {
        console.log('Error (see console)');
        console.log(e);
      };

      window.debate_id = 1
      document.getElementById("send-btn").onclick = function fun(e) {
          e.preventDefault()
          var signout = document.getElementById("signout").textContent.split(" ");
          var user_name = signout[signout.length-1]
          websocket.send( JSON.stringify([user_name, document.getElementById("text-input").value]))
		}
        
        document.getElementById("text-input")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
            document.getElementById("send-btn").click();
            }
        });
}

function dbStore(debate_id, user, transcript){
    console.log("Stored")
    $.ajax({
        type: "GET",
        url: "/webservice",
        data: { debate_id: debate_id, 
            user: user, 
            transcript: transcript },
        success: function(response) {
            console.log(response);
        }
    }).done(function(data){
        console.log(data);
    });
}


function dbRetrieve(){
    console.log("Retrieved")
    $.ajax({
        type: "GET",
        url: "/get_debate",
        data: { },
        success: function(response) {
            console.log(response);
        }
    }).done(function(data){
        console.log(data);
    });
}

