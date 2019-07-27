import queue
import time
from .domain import Entity, World, Action, Vector, to_dict

TICK_INTERVAL = 1

action_queue = queue.Queue()

game_state = World(
    width=500,
    height=500,
    entities=[]
)


def client_connect(client_id):
    # TOOD - process as an action in tick loop
    game_state.entities.append(Entity(position=Vector(0, 0),
                                      client_id=client_id))


def client_disconnect(client_id):
    # THIS IS BAD AND NOT AT ALL SAFE.  DON'T DO THIS.
    # TODO - should be processed as an action in tick loop
    game_state.entities = [e for e in game_state.entities
                           if e.client_id != client_id]


def enqueue_action(client_id, action):
    action_queue.put(Action(client_id=client_id, action=action))


def broadcast_state(socket_server):
    socket_server.emit('world', to_dict(game_state))


def process_tick():
    actions = {}
    while not action_queue.empty():
        a = action_queue.get(block=True)
        actions[a.client_id] = a

    for entity in game_state.entities:
        a = actions.get(entity.client_id)
        if a is None:
            continue
        if a.action == 'Left' and entity.position.x > 0:
            entity.position.x -= 1
        if a.action == 'Right' and entity.position.x < game_state.height - 1:
            entity.position.x += 1
        if a.action == 'Up' and entity.position.y > 0:
            entity.position.y -= 1
        if a.action == 'Down' and entity.position.y < game_state.height - 1:
            entity.position.y += 1


def run_ticker(socket_server):
    tick = 0
    while(True):
        time.sleep(TICK_INTERVAL)
        print("Current tick: " + str(tick))
        process_tick()
        broadcast_state(socket_server)
        tick += 1