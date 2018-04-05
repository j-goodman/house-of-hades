window.addEventListener('load', () => {
    document.getElementById('start-button').addEventListener('click', event => {
        document.getElementsByClassName('start-screen')[0].classList.toggle('hidden')
        document.getElementsByClassName('game-screen')[0].classList.toggle('hidden')
    })
    display = {
        message: document.getElementById('main-message'),
        doors: document.getElementById('doors'),
        monsters: document.getElementById('monsters'),
        items: document.getElementById('items'),
        inventory: document.getElementById('inventory'),
        shield: document.getElementById('shield'),
        weapon: document.getElementById('weapon'),
        hitpoints: document.getElementById('hitpoints'),
        recover: document.getElementById('recover'),
        room: document.getElementById('room'),
        attack: {},
        defense: {},
    }
    let damages = ['pierce', 'slash', 'crush', 'burn', 'poison', 'curse',]
    damages.map(dam => {
        display.attack[dam] = document.getElementById(`attack-${dam}`)
        display.defense[dam] = document.getElementById(`defense-${dam}`)
    })
    updateRoom()
    updateInventory()
    display.message.innerText = display.message.innerText + `

    Find the treasure room and kill the dragon there.`
});

clearType = () => {}

drawString = string => {
    if (display.newMessage) {
        display.message.innerText += `

        ${string}`
    } else {
        display.message.innerText = string
        display.message.style.color = '#d00'
        display.newMessage = true;
        window.setTimeout(() => {
          display.message.style.color = '#fff'
          display.newMessage = false;
        }, 1000)
    }
}

updateRecover = () => {
    display.recover.innerHTML = ''
    if (
        game.player.room.mana > 0 &&
        game.player.stats.hitpoints < 20 &&
        !game.player.room.monsters.length
    ) {
        let button = document.createElement('a')
        button.className = 'action-button'
        button.innerText = 'RECOVER'
        button.addEventListener('click', game.player.recover.bind(game.player))
        display.recover.appendChild(button)
    }
}

updateRoom = () => {
    display.message.innerText = `You're in a ${game.player.room.type}.

    ${game.player.describeMonsters() || ''} ${game.player.describeItems() || ''} ${game.player.describeDoors() || ''}`
    updateMonsters()
    updateItems()
    updateDoors()
    updateRecover()

    if (game.player.room.monsters.length > 0 || game.player.room.type.length < 25) {
        display.room.innerText = `${game.player.room.type[0].toUpperCase() + game.player.room.type.slice(1,game.player.room.type.length)}.`
    } else {
        display.room.innerText = ''
    }
}

updateRoomContents = () => {
    updateMonsters()
    updateItems()
    updateDoors()
    updateRecover()
}

updateDoors = () => {
    display.doors.innerHTML = ''
    game.player.room.doors.map(door => {
        display.doors.append(doorCard(door))
    })
}

updateMonsters = () => {
    display.monsters.innerHTML = ''
    game.player.room.monsters.map(monster => {
        display.monsters.append(monsterCard(monster))
    })
}

updateItems = () => {
    display.items.innerHTML = ''
    game.player.room.items.map(item => {
        display.items.append(itemCard(item))
    })
}

updateInventory = () => {
    updateRecover()
    display.inventory.innerHTML = ''
    game.player.holding.map(item => {
        display.inventory.append(itemCard(item, true))
    })
    display.weapon.innerHTML = ''
    if (game.player.weapon) {
        display.weapon.append(itemCard(game.player.weapon, true))
    }
    display.shield.innerHTML = ''
    if (game.player.shield) {
        display.shield.append(itemCard(game.player.shield, true))
    }
    let damages = ['pierce', 'slash', 'crush', 'burn', 'poison', 'curse',]
    damages.map((dam, index) => {
        if (game.player.stats.attack[index]) {
            if (game.player.weapon && game.player.weapon.bonus[index]) {
                display.attack[dam].innerText = `${dam}|${game.player.stats.baseAttack[index]}+${game.player.weapon.bonus[index]}`
            } else {
                display.attack[dam].innerText = `${dam}|${game.player.stats.attack[index]}`
            }
        } else {
            display.attack[dam].innerText = ``
        }
        if (game.player.shield && game.player.shield.bonus[index]) {
            display.defense[dam].innerText = `${dam}|${game.player.stats.baseDefense[index]}+${game.player.shield.bonus[index]}`
        } else {
            display.defense[dam].innerText = `${dam}|${game.player.stats.defense[index]}`
        }
    })
    display.hitpoints.innerText = `HITPOINTS|${game.player.stats.hitpoints}`
}

doorCard = door => {
    let element = document.createElement('div')
    element.className = 'door-card card'
    let header = document.createElement('div')
    header.innerText = `${door.color} door`
    element.appendChild(header)
    if (door.locked) {
        let locked = document.createElement('a')
        locked.innerText = 'LOCKED'
        element.appendChild(locked)
    } else {
        let goto = document.createElement('a')
        goto.className = 'action-button'
        goto.innerText = 'GO'
        goto.addEventListener('click', () => {
          game.player.goTo(door)
        })
        element.appendChild(goto)
    }
    return element
}

monsterCard = monster => {
    let element = document.createElement('div')
    element.className = 'monster-card card'
    let header = document.createElement('div')
    header.innerText = monster.name.toUpperCase()
    element.appendChild(header)
    let hitpoints = document.createElement('li')
    hitpoints.innerText = `HITPOINTS|${monster.hitpoints}`
    element.appendChild(hitpoints)
    let paragraph = document.createElement('p')
    paragraph.innerText = monster.info
    element.appendChild(paragraph)

    let actions = document.createElement('section')
    actions.className = 'actions'

    let fight = document.createElement('a')
    fight.className = 'action-button'
    fight.innerText = 'FIGHT'
    fight.addEventListener('click', () => {
        game.player.fight(monster)
        updateMonsters()
    })
    actions.appendChild(fight)

    let stats = document.createElement('a')
    stats.className = 'action-button'
    stats.innerText = 'STATS'
    stats.addEventListener('click', () => {
        paragraph.innerText = (paragraph.innerText === monster.info) ?
            `ATTACK
            ${game.player.statObjString(monster.attack)}

            DEFENSE
            ${game.player.statObjString(monster.defense)}`:
            monster.info
        stats.innerText = (paragraph.innerText === monster.info) ? 'STATS' : 'INFO'
    })
    actions.appendChild(stats)

    element.appendChild(actions)
    return element
}


itemCard = (item, inventory) => {
    let element = document.createElement('div')
    element.className = 'item-card card'
    element.className += item.slot === 'shield' ? ' shield' : ' weapon'
    let header = document.createElement('div')
    header.innerText = item.name
    element.appendChild(header)

    if (game.player.weapon === item || game.player.shield === item) {
        let paragraph = document.createElement('p')
        paragraph.className = 'item-card-description'
        paragraph.innerText = item.info
        element.appendChild(paragraph)
    }

    let actions = document.createElement('section')
    actions.className = 'actions'

    if (game.player.weapon !== item && game.player.shield !== item) {
        let get = document.createElement('a')
        get.className = 'action-button'
        get.innerText = 'EQUIP'
        get.addEventListener('click', () => {
          if (game.player.room.items.includes(item)) {
            game.player.get(item)
          } else if (game.player.holding.includes(item)) {
            game.player.drop(item)
            game.player.get(item)
          }
          updateRoomContents()
          updateInventory()
        })
        actions.appendChild(get)
    }

    if (inventory) {
        let drop = document.createElement('a')
        drop.className = 'action-button'
        drop.innerText = 'DROP'
        drop.addEventListener('click', () => {
            game.player.drop(item)
            updateRoomContents()
            updateInventory()
        })
        actions.appendChild(drop)
    } else {
        let hold = document.createElement('a')
        hold.className = 'action-button'
        hold.innerText = 'HOLD'
        hold.addEventListener('click', () => {
            game.player.hold(item)
            updateRoomContents()
            updateInventory()
        })
        actions.appendChild(hold)
    }

    element.append(actions)
    return element
}
