# Packeteer-Client
A simple Packeteer Client

* Requires [Packeteer-Server](https://github.com/byBackfish/Packeteer-Server)

# Installation

* Clone this Repo
* Go into the Project
* Run `yarn install`
* Run `yarn start`
* And then you should see your Packeteer-Server start up!

# Examples

```typescript

import {WS} from './ws'

let Socket = new WS();
WS.send(
{
type: "getItems",
filter: {}
}
).then((data) => {
console.log("Received Data!: " + data);
})

```

This will send a Packet to the Server with the name "getItems" and a filter. The Backend Server needs to have this Packet registered. 
