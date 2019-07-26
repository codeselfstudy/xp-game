import queue
import time

TICK_INTERVAL = 1

action_queue = queue.Queue()

class Action:
    client_id: str
    action: str

    def __init__(self, client_id, action):
        self.client_id, self.action = client_id, action


game_state = {
    'entities': {}
}


def client_connect(client_id):
    game_state['entities'][client_id] = [0, 0]


def client_disconnect(client_id):
    del game_state['entities'][client_id]


def enqueue_action(client_id, action):
    action_queue.put(Action(client_id=client_id, action=action))


def broadcast_state(socket_server):
    socket_server.emit('world', game_state)


def process_tick():
    actions = {}
    while not action_queue.empty():
        a = action_queue.get(block=True)
        actions[a.client_id] = a

    for a in actions.values():
        entity = game_state['entities'].get(a.client_id)
        if not entity:
            continue
        if a.action == 'Left':
            entity[0] -= 1
        if a.action == 'Right':
            entity[0] += 1
        if a.action == 'Up':
            entity[1] -= 1
        if a.action == 'Down':
            entity[1] += 1


def run_ticker(socket_server):
    tick = 0
    while(True):
        time.sleep(TICK_INTERVAL)
        print("Current tick: " + str(tick))
        process_tick()
        broadcast_state(socket_server)
        tick += 1
