import os
from typing import Dict
from flask import Flask, request, render_template
from flask_socketio import SocketIO
from web.sanitizer import sanitize
from web.assets import cache_buster
from utilities.logger import log
from common.messages import ClientEvent, deserialize_client_event
import game.ticker as ticker

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('GAME_SECRET', 'notarealsecret')
HOST = os.environ.get('GAME_HOST', '127.0.0.1')
PORT = os.environ.get('GAME_PORT', 5000)

socketio = SocketIO(app)
client_names: Dict[str, str] = {}

cache_busting_query = cache_buster()


@app.route('/')
def homepage():
    """Render the index.html file with the frontend application."""
    data = {
        'cache_buster': cache_busting_query
    }
    return render_template('index.html', data=data)


@socketio.on('connect')
def handle_connect():
    # Authentication can go here
    log.game_event(f'client_connected: {request.sid}')


@socketio.on('disconnect')
def handle_disconnect():
    log.game_event(f'client_disconnected: {request.sid}')
    ticker.despawn_entity(request.sid)


@socketio.on('event')
def handle_event(event_dict):
    """
    Events are of the format { kind: str, data: {...}}
    """
    global client_names
    try:
        event = deserialize_client_event(event_dict, request.sid)
    except Exception:
        log.exception("Failed to deserialize client event")
        return
    if event.event_type == ClientEvent.EVENT_TYPE_SPAWN:
        client_names[request.sid] = event.data.character_name
        log.game_event(f'{request.sid} spawned as {event.data.character_name}')
        ticker.enqueue_client_message(event, request.sid)
    else:
        log.game_event(f'action: {event.data.kind} by {request.sid}')
        ticker.enqueue_client_message(event, request.sid)


@socketio.on('chat')
def handle_chat(incoming):
    """Respond to `chat` message from the frontend.

    `incoming` is `{'body': 'the message content'}`.
    """
    print(client_names)
    trimmed_message = incoming['body'].strip()
    if trimmed_message:
        outgoing = {
            'id': client_names.get(request.sid),
            'body': sanitize(trimmed_message),
        }
        log.game_event(f'chat_message: {outgoing}')
        socketio.emit('chat', outgoing)


if __name__ == '__main__':
    print(f"Starting server at {HOST}:{PORT}")
    socketio.start_background_task(ticker.run_ticker, socketio, client_names)
    socketio.run(app, use_reloader=True, debug=True, log_output=True,
                 host=HOST, port=PORT)
