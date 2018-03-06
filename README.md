# Turing Machine

A simple turing machine emulator written in javascript

# Schema file

the schema file tells the turing machine how the nodes are setup. It is formatted as follows:

```javascript
{
  "q0": { // name of the node
    "start": true, // nullable, is this state the start state
    "accepting": false, // nullable, is this state an accepting state
    "rejecting": false, // nullable, is this state a rejecting state
    "paths": {
      "1": { // what input value the path accepts
        "to": "q1", // what node the path goes to
        "direction": "r" // r,l, the direction to move on the tape
        "write": "x" // what value to write to the tape before moving
      },
      ...
    }
  },
  ...
}
```

# Running
To run the machine instantiate and call `run`

```javascript
var TuringMachine = require('TuringMachine')

var machine = new TuringMachine(schema, '1100101')
machine.run()
```
