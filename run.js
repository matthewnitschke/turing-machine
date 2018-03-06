var schema = require('./schema.json')
var TuringMachine = require('./turing.js')

var machine = new TuringMachine(schema, '0100')
machine.run()