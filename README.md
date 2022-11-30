# Board Game API

## Description

A RESTful API built using Node.js, designed for use with a MongoDB database. Players are added to a game and then take turns rolling to move. At position 30 they are set as the winner.

## Dependencies
```
- node version 18.10.0
- express version 4.18.1 
- npm version 8.19.2
- mongodb version 4.10.0
```

## Installing
Clone this repo:
```
git@github.com:mikeycodingstuff/board-game-api.git
```

Navigate into the newly created repo:
```
cd board-game-api
```

Run:
```
npm install
```

Create a new MongoDB database called `board-game` and a collection within this called `cuttlefish-board-game`.  
These names can be changed but will then need to be changed in:
```
Services/dbService.js
```

Here you will also need to connect to your MongoDB connection. The default is:
```
const url = "mongodb://root:password@localhost:27017"
```

## Routes

### /players

#### GET

- Gets all the players that have been added to the game.
- Returns `{
    "success": true,
    "msg": "",
    "code": 200,
    "data": [
    ]
}` where data contains the players.

#### POST
- Adds a new player to the game. First checks to see if the name is valid.
- Should be sent in the format `{"name":"mikey"}`
- Returns
  - If valid:
  ```
  {
      "success": "player added",
      "msg": "",
      "code": 200,
      "data": {
          "name": "bob",
          "position": 1,
          "winner": false,
          "order": 4,
          "role": "player",
          "_id": "638798d0edf11e146245f801"
      }
  }
  ```
  - If invalid:
  ```
  {
      "success": false,
      "msg": "please provide a valid name",
      "code": 400,
      "data": ""
  }
  ```

### /players/:id

#### PUT
- Checks if it is the player's turn via middleware.
- Rolls a dice and moves the player's position and updates the order accordingly.
- Returns success true/false:
  - If it is the player's turn:
  ```
  {
      "success": true,
      "msg": "",
      "code": 200,
      "data": [
          {
              "_id": "638794c2edf11e146245f7fe",
              "name": "mikey",
              "position": 3,
              "winner": false,
              "order": 1,
              "role": "player"
          }
      ]
  }
  ```
  - If it is not the player's turn:
  ```
  {
    "success": false,
    "msg": "not your go",
    "code": 400,
    "data": ""
  }
  ```
  
### /game
  
#### DELETE
