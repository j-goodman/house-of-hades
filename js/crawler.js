var Crawler = function (ob) {
    this.room = ob.room
    this.mem = {}
};

Crawler.prototype.checkSurroundings = function () {
    this.mem.availableItems = this.mem.availableItems || []
    this.room.items.map(item => {
        this.mem.availableItems.push(item)
    })
}

Crawler.prototype.goTo = function (door) {
    let startRoom = this.room
    let endRoom = this.room === door.to ? door.from : door.to
    let arrayName = ''
    if (this.room.monsters.includes(this)) {
      	arrayName = 'monsters'
    } else if (
      	arrayName = 'items'
    )

    if (arrayName) {
        startRoom[arrayName] = startRoom[arrayName].filter(ob => {
            return ob !== this
        })
        endRoom[arrayName].push(this)
    }

    this.room = endRoom
}

var impossibility_detector = new Crawler ({
    room: game.player.room
})
