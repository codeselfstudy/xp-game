from dataclasses import dataclass
from typing import Union, Optional, Dict


@dataclass(frozen=True)
class Ability:
    kind: str  # Move | Attack | Dash
    color: str
    reach: int
    delay: int
    damage: Optional[int] = None


@dataclass(frozen=True)
class Action:
    """An action in the game world undertaken by a specific entity"""
    entity_id: str
    kind: str  # Move | Attack | Spawn | Despawn | Dash
    direction: str = ""  # North | South | East | West


@dataclass(frozen=True)
class ChatData:
    body: str


@dataclass(frozen=True)
class SpawnData:
    character_name: str


@dataclass(frozen=True)
class ClientEvent:
    event_type: str  # "chat" | "action" | "spawn"
    data: Union[ChatData, Action, SpawnData]

    EVENT_TYPE_CHAT = "chat"
    EVENT_TYPE_ACTION = "action"
    EVENT_TYPE_SPAWN = "spawn"


def deserialize_client_event(raw: Dict, client_id: str) -> ClientEvent:
    event_type = raw.pop('event_type')
    raw_data = raw.pop('data')
    data: Union[ChatData, Action, SpawnData]
    if event_type == "chat":
        data = ChatData(**raw_data)
    if event_type == "action":
        raw_data.pop('entity_id', None)
        data = Action(entity_id=client_id, **raw_data)
    if event_type == "spawn":
        data = SpawnData(**raw_data)
    return ClientEvent(data=data, event_type=event_type)
