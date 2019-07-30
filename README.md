# Installation and usage
## Backend
- You'll need to [install python 3.7](https://www.python.org/downloads/)
- Suggested: set up a virtual environment:
    - `$ python -m venv xp-game`
    - `$ source xp-game/bin/activate` to activate and run environment
- `$ pip install -r requirements.txt` to install the python dependencies
## Frontend
- `$ npm install -g typescript` install typescript (if not already installed)
- `$ tsc` to run the typescript compiler (or `$ tsc --watch` to have it watch for file changes)
- `$ make start` - start the development server
- Conenct to the game in the browser at http://localhost:5000/

## What's this about?
This project's goal is to create a (not so massively) multiplayer RPG as a collaborative project, in the spirit of Dungeons and Dragons, old CRPGs like the Ultima series, Baldur's Gate, and classic dungeon crawling roguelikes, with an extensible content creation system. Early development efforts will fall roughly into these categories:

- Backend (tentatively in python):
  - authentication
  - user persistence
  - gameplay programming
  - chat system
- Client (typescript)
  - gameplay state rendering
  - input handling
  - asset pipeline (tilesets and sound effects)
- Content Creation System (tbd)
  - scripting engine
  - map editor

## How to get invovled
Register on the [Code Self Study](https://community.codeselfstudy.com/).
Once registered, you can access the running todo list [here](https://community.codeselfstudy.com/t/rpg-project-todo-list/1713/5).

There isn't a master design document, or a more concrete roadmap-- yet.  If you'd like to get involved in planning, please message bdjewkes on the forum.
