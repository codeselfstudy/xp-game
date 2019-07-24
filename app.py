import uuid
from flask import Flask, request
from flask_socketio import SocketIO, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'notarealsecret'
socketio = SocketIO(app)

game_state = {
    'entities': {}
}

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

@socketio.on('action')
def handle_action(message):
    if 'action' not in message:
        return
    action = message['action']
    entity = game_state['entities'][request.sid]
    if action == 'Left':
        entity[0] -= 1
    if action == 'Right':
        entity[0] += 1
    if action == 'Up':
        entity[1] -= 1
    if action == 'Down':
        entity[1] += 1
    broadcast_state()


@socketio.on('connect')
def handle_connect():
    game_state['entities'][request.sid] = [0,0]
    broadcast_state()
    


@socketio.on('disconnect')
def handle_disconnect():
    del game_state['entities'][request.sid]
    broadcast_state
    

def broadcast_state():
    print(game_state)
    socketio.emit('world', game_state)
    

if __name__ == '__main__':
    print("running")
    socketio.run(app)

