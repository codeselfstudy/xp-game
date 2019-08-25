from typing import Union, Optional
from dataclasses import dataclass


@dataclass(frozen=True)
class Vector:
    x: int
    y: int


@dataclass
class Entity:
    position: Vector
    client_id: str
    health: int

    def get_name(self):
        return self.client_id[-7:]


@dataclass(frozen=True)
class Action:
    """An action in the game world undertaken by a specific entity"""
    entity: Entity
    kind: str  # Move | Attack | Spawn | Despawn | Dash
    direction: str = ""  # North | South | East | West


@dataclass(frozen=True)
class Ability:
    kind: str  # Move | Attack | Dash
    color: str
    reach: int
    delay: int
    damage: Optional[int] = None


@dataclass(frozen=True)
class LoginEventDetail:
    character_name: str


@dataclass(frozen=True)
class ClientEvent:
    """A lifecycle event associated with a specific client"""
    kind: str  # login
    detail: Union[LoginEventDetail]

    LOGIN_EVENT_KIND = "login"
