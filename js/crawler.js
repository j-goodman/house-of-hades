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
    startRoom.monsters = startRoom.monsters.filter(mon => {
        return mon !== this
    })
    endRoom.monsters.push(this)
    this.room = endRoom
}
