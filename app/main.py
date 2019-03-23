from flask import Flask, redirect, render_template
from flask_socketio import SocketIO


app = Flask(__name__)
<<<<<<< HEAD
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
=======
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)
>>>>>>> 200669fcadfe56883699c3ad6a385242dba95d04


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

if __name__ == '__main__':
    socketio.run(app, debug=True)
    #app.run(host='127.0.0.1', port=8080, debug=True)
