var Crawler = function (ob) {
    this.room = ob.room
    this.mem = {}
}

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

var impossibility_detector = new Crawler ({room: null})

impossibility_detector.update = function () {
    this.room = game.player.room

    if (this.detectImpossibility().impossible) {
        this.solve()
    }
}

impossibility_detector.accessibleRooms = function () {
    let rooms = []
    rooms.politePush(this.room)

    let addAdjacent = room => {
        let pushed = false
        room.doors.filter(door => {
            return (!door.locked && door.resolved())
        }).map(door => {
            let adjacent = (door.to === room) ? door.from : door.to
            pushed = pushed ? true : rooms.politePush(adjacent)
        })
        return pushed
    }

    let finished = false
    while (!finished) {
        finished = true
        rooms.map(room => {
            if (addAdjacent(room)) {
                finished = false
            }
        })
    }
    return rooms
}

impossibility_detector.accessibleItems = function () {
    let items = []
    let rooms = this.accessibleRooms()
    rooms.map(room => {
        room.items.map(item => {
            items.push(item)
        })
    })
    if (game.player.weapon) {
        items.push(game.player.weapon)
    }
    if (game.player.shield) {
        items.push(game.player.shield)
    }
    items = items.concat(game.player.holding)
    return items
}

impossibility_detector.accessibleWeapons = function () {
    return this.accessibleItems().filter( (item => { return item.slot === 'weapon' }) )
}

impossibility_detector.accessibleShields = function () {
    return this.accessibleItems().filter( (item => { return item.slot === 'shield' }) )
}

impossibility_detector.bestWeaponAgainstMonster = function (monster, weapons=impossibility_detector.accessibleWeapons()) {
    let bestWeapon = null
    let bestTotal = -1
    weapons.map(weapon => {
        let total = 0
        weapon.bonus.map((num, index) => {
            total += (num - monster.defense[index] < 0) ? 0 : num - monster.defense[index]
        })
        if (total > bestTotal) {
            bestTotal = total
            bestWeapon = weapon
        }
    })
    return bestWeapon
}

impossibility_detector.bestShieldAgainstMonster = function (monster, shields=impossibility_detector.accessibleShields()) {
    let bestShield = null
    let bestTotal = 1000000000 // A billion
    shields.map(shield => {
        let total = 0
        shield.bonus.map((num, index) => {
            total += (monster.attack[index] - num < 0) ? 0 : monster.attack[index] - num
        })
        if (total < bestTotal) {
            bestTotal = total
            bestShield = shield
        }
    })
    return bestShield
}

impossibility_detector.accessibleMana = function () {
    let rooms = this.accessibleRooms()
    let sum = 0
    rooms.map(room => {
        if (room.monsters.length === 0) {
            sum += room.mana
        }
    })
    return sum
}

impossibility_detector.killable = function (monster) {
    let certainty = true
    let fakePlayer = Object.assign({}, game.player)
    fakePlayer.stats = Object.assign({}, game.player.stats)
    fakePlayer.stats.attack = Object.assign({}, game.player.stats.attack)
    fakePlayer.stats.defense = Object.assign({}, game.player.stats.defense)
    let fakeRoom = Object.assign({}, game.player.room)
    fakePlayer.id = getGlobalUniqueId()
    fakeRoom.id = getGlobalUniqueId()

    fakeRoom.monsters = monster.room.monsters.map((mon, index) => {
        let fakeMon = Object.assign({}, mon)
        fakeMon.id = getGlobalUniqueId()
        return fakeMon
    })

    let fakeMonster = fakeRoom.monsters[monster.room.monsters.indexOf(monster)]

    fakeWeapon = Object.assign({}, this.bestWeaponAgainstMonster(monster))
    if (Object.keys(fakeWeapon).length) {
        fakeWeapon.id = getGlobalUniqueId()
    } else {
        fakeWeapon = false
    }
    fakeShield = Object.assign({}, this.bestShieldAgainstMonster(monster))
    if (Object.keys(fakeShield).length) {
        fakeShield.id = getGlobalUniqueId()
    } else {
        fakeShield = false
    }

    fakeMonster.room = fakeRoom

    if (monster.fightEvent || monster.onInstantiate) {
        certainty = false
    }
    // fakeMonster.onInstantiate = monster.onInstantiate
    // fakeMonster.fightEvent = monster.fightEvent
    // if (typeof fakeMonster.onInstantiate === 'function') {
    //     fakeMonster.onInstantiate()
    // }

    fakePlayer.weapon = fakeWeapon
    fakePlayer.shield = fakeShield

    fakePlayer.stats.hitpoints += this.accessibleMana()

    fakePlayer.usedWeaponIds = []
    fakePlayer.usedShieldIds = []
    fakePlayer.usedWeaponIds.push(fakePlayer.weapon.id)
    fakePlayer.usedShieldIds.push(fakePlayer.shield.id)

    fakePlayer.updateStats = game.player.updateStats
    fakePlayer.updateStats()
    fakePlayer.fight = game.player.fight
    let dex = 0
    while(fakePlayer.stats.hitpoints > 0 && fakeMonster.hitpoints > 0 && dex < 200) {
        dex++
        fakePlayer.fight(fakeMonster, true)
        if (!fakePlayer.weapon) {
            fakePlayer.weapon = this.bestWeaponAgainstMonster(monster, this.accessibleWeapons().filter(weapon => { return !fakePlayer.usedWeaponIds.includes(weapon.id) }))
            if (fakePlayer.weapon) {
                fakePlayer.usedWeaponIds.push(fakePlayer.weapon.id)
            }
        }
        if (!fakePlayer.shield) {
            fakePlayer.shield = this.bestShieldAgainstMonster(monster, this.accessibleShields().filter(shield => { return !fakePlayer.usedShieldIds.includes(weapon.id) }))
            if (fakePlayer.shield) {
                fakePlayer.usedShieldIds.push(fakePlayer.shield.id)
            }
        }
    }

    let report = {
        answer: (fakePlayer.stats.hitpoints > 0 && fakeMonster.hitpoints <= 0),
        certainty: certainty
    }
    return report
}

impossibility_detector.detectImpossibility = function () {
    let openMysteryDoors = []
    let openableMysteryDoors = []
    let rooms = this.accessibleRooms()

    let isFoolsfire = false

    let possibility = false
    let accessibleRooms = this.accessibleRooms()

    rooms.map(room => {
        if (room.monsters.map(mon => { return mon.name }).includes('foolsfire')) {
            isFoolsfire = true
        }
        room.doors.map(door => {
            let accessibleRoom = false
            if (accessibleRooms.includes(door.to)) {
                accessibleRoom = door.to
            } else if (accessibleRooms.includes(door.from)) {
                accessibleRoom = door.from
            }
            if ((!door.to || !door.from) && !door.locked) {
                openMysteryDoors.push(door)
            } else if (door.locked && accessibleRoom && accessibleRoom.monsters.length === accessibleRoom.monsters.filter(mon => {
                let report = this.killable(mon)
                if (report.answer && report.certainty) {
                    return true
                }
            }).length) {
                openableMysteryDoors.push(door)
            }
        })
    })

    let report = {
        impossible: false
    }

    if (openableMysteryDoors.length + openMysteryDoors.length === 0 && !isFoolsfire) {
        report.impossible = true
    }

    return report
}

impossibility_detector.solve = function () {
    let room = pick(game.player.room.doors.map(door => {
        if (door.to !== game.player.room) {
            return door.to
        } else if (door.from !== game.player.room) {
            return door.from
        }
    }).filter(room => { return room && room.monsters && room.monsters.length === 0 }))
    room = room ? room : pick(this.accessibleRooms().filter(room => { return room.monsters.length === 0 }))
    console.log('Solving for map impossibility.')
    console.log('Room:', room)
    room.monsters.push(new Monster (room, extras['foolsfire']))
}
