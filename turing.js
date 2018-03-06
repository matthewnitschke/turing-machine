function TapeNode() {
    this.left = null
    this.right = null
    this.value = ''
}

function Tape(initialVal) {
    this.current = new TapeNode()

    this.right = (writeVal) => {
        if (writeVal) {
            this.current.value = writeVal
        }

        if (this.current.right) {
            this.current = this.current.right
        } else {
            let newNode = new TapeNode()
            this.current.right = newNode
            newNode.left = this.current

            this.current = newNode
        }
    }

    this.left = (writeVal) => {
        if (writeVal) {
            this.current.value = writeVal
        }

        if (this.current.left) {
            this.current = this.current.left
        } else {
            let newNode = new TapeNode()
            this.current.left = newNode
            newNode.right = this.current

            this.current = newNode
        }
    }

    this.get = () => {
        return this.current.value
    }

    this.print = () => {
        let curNode = getStartNode()

        while (curNode) {
            if (curNode.value == '') {
                process.stdout.write('[ ]')
            } else {
                process.stdout.write(curNode.value)
            }
            curNode = curNode.right
        }
        console.log()
    }

    var getStartNode = () => {
        let curNode = this.current
        while (curNode.left) {
            curNode = curNode.left
        }
        return curNode
    }

    if (typeof initialVal === 'string') {
        initialVal.split('').forEach(v => {
            this.right(v)
        })
        this.current.left.right = null // remove final null node
        this.current = getStartNode()
    }
}

function TuringNode(schema) {
    this.start = schema.start ? schema.start : false
    this.name = schema.name
}

function TuringMachine(schema, initialTape) {

    this.run = () => {
        var running = true
        while (running) {
            var tapeVal = this.tape.get()
            var curNodeSchema = this.schema[this.currentNode]

            if (curNodeSchema.accepting || curNodeSchema.rejecting) {
                running = false
            }
            var path = curNodeSchema.paths[tapeVal]
            this.currentNode = path.to
            var writeVal = path.write ? path.write : undefined

            if (path.direction == 'r') {
                this.tape.right(writeVal)
            } else if (path.direction == 'l') {
                this.tape.left(writeVal)
            }
        }
        this.tape.print()
    }

    var startStateSchema = Object.keys(schema).filter(s => {
        return schema[s].start
    })
    if (startStateSchema.length != 1) {
        throw 'Exactly one start node required'
    }

    this.schema = schema
    this.currentNode = startStateSchema[0]
    this.tape = new Tape(initialTape)

}

module.exports = TuringMachine