var schema = require('./schema.json')
var TuringMachine = require('./turing.js')

var machine = new TuringMachine(schema, '1100')
machine.run()