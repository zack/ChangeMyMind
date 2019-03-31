# Command to run locally: gunicorn3 -b 127.0.0.1:8080 -k flask_sockets.worker main:app
# Run sudo apt-get install gunicorn3 first 

# [START gae_flex_websockets_app]
from __future__ import print_function
from flask import Flask, redirect, render_template, request, jsonify
from google.cloud import datastore
from flask_sockets import Sockets


app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/chat')
def chat_socket(ws):
    while not ws.closed:
        message = ws.receive()
        if message is None:  # message is "None" if the client has closed.
            continue
        # Send the message to all clients connected to this webserver
        # process. (To support multiple processes or instances, an
        # extra-instance storage or messaging system would be required.)
        clients = ws.handler.server.clients.values()
        for client in clients:
            client.ws.send(message)
# [END gae_flex_websockets_app]

@app.after_request
def add_header(resp):
    resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    resp.headers['Pragma'] = 'no-cache'
    resp.headers['Expires'] = '0'
    return resp
    
@app.route('/')
def index():
    return redirect("static/ChangeMyMind.html")

@app.route("/webservice", methods=['GET', 'POST'])    
def my_webservice():
    return jsonify(result=put_debate(**request.args)) 

@app.route('/get_debate', methods=['GET', 'POST'])
def get_debates():
    ds = get_client()
    return ds.query(kind="debate").fetch()

@app.route('/get_client', methods=['GET', 'POST'])
def get_client():
    return datastore.Client()

if __name__ == '__main__':
    print("""
This can not be run directly because the Flask development server does not
support web sockets. Instead, use gunicorn:
gunicorn -b 127.0.0.1:8080 -k flask_sockets.worker main:app
""")




'''
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

@app.route('/')
def root():
    return redirect("static/ChangeMyMind.html", code=302)
    #return render_template('chatbox.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

@app.route('/get_client', methods=['GET', 'POST'])
def get_client():
    return datastore.Client()

@app.route('/put_debate', methods=['GET', 'POST'])
def put_debate(debate_id, user, transcript):
    ds = get_client()
    task_key = ds.key("debate") # unique ID for this entity
    task = datastore.Entity(key=task_key)
    task["debate_id"] = debate_id
    task["user"] = user
    task["transcript"] = transcript
    ds.put(task)
    return task

@app.route("/webservice", methods=['GET', 'POST'])    
def my_webservice():
    return jsonify(result=put_debate(**request.args)) 

@app.route('/get_debate', methods=['GET', 'POST'])
def get_debates():
    ds = get_client()
    return ds.query(kind="debate").fetch()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
'''