var globalUniqueId = -1
var getGlobalUniqueId = () => {
    return globalUniqueId += 1
}

var Player = function () {
    this.room = null;
    this.stats = {
        // pierce, slash, crush, burn, poison, curse
        attack: [0,0,4,0,0,0],
        defense: [3,3,3,0,0,0],
        baseAttack: [0,0,4,0,0,0],
        baseDefense: [3,3,3,0,0,0],
        hitpoints: 20,
        maxHitpoints: 20,
    };
    this.weapon = null;
    this.shield = null;
    this.holding = [];
    this.alive = true;
    this.data = {};
};

Player.prototype.welcome = function () {
    //console.log('You find yourself within a sprawling manor, in a ' + this.room.type + '. There\'s nobody else in the room but you.'); // Seek the throne room and kill the Wendigo King.');
    //console.log('');
    //console.log('Find the treasure room and kill the dragon.');
    //console.log('');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
    updateRoom();
};

Player.prototype.lookAround = function () {
    clearType();
    //console.log('You\'re in a ' + this.room.type + '.');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
};

Player.prototype.showHolding = function () {
    clearType();
    //console.log('You\'re holding:');
    this.holding.map(item => {
        //console.log(item.name);
    });
};

Player.prototype.goTo = function (doorString) {
    var doorColor
    if (!this.alive) {
        drawString('You\'re dead.')
        return true
    } else {
        clearType()
    }
    if (typeof doorString === 'string') {
        doorColor = doorString.slice(0, doorString.length - 5)
        this.room.doors.map(function (door) {
          if (door.color === doorColor) {
            door.go(this)
          }
        }.bind(this))
    } else if (doorString.go) {
        doorString.go(this)
    }
    if (this.room.monsters.length === 0) {
        this.room.doors.map(door => {
            door.locked = false
        })
    }
    // this.recover(false);
    this.detector.update()
    updateRoom()
    this.room.monsters.map(mon => {
        if (!display.data.monstersEncountered.map(ob => { return ob.name }).includes(mon.name)) {
            display.data.monstersEncountered.push({
                name: mon.name,
                info: mon.info,
            })
        }
    })
};

Player.prototype.get = function (targetName) {
    clearType();
    var i; var j;
    var target;
    var oldItem;
    if (typeof(targetName) === 'string') {
        this.room.items.map(function (item) {
          if (item.name == targetName) {
            target = item;
          }
        }.bind(this));
    } else {
        target = targetName;
    }
    if (!target || !target.slot) { return false; }
    oldItem = this[target.slot];
    this[target.slot] = target;
    target.room = 'player';
    //console.log('You take the ' + target.name + '.');
    this.updateStats();
    for (j=0 ; j<this.room.items.length ; j++) {
        if (target.id === this.room.items[j].id) {
            this.room.items = this.room.items.slice(0,j).concat(this.room.items.slice(j+1,this.room.items.length));
        }
    }
    if (oldItem) {
        //console.log('You drop your ' + oldItem.name + '.');
        oldItem.room = game.player.room
        this.room.items.push(oldItem);
        oldItem.room = this.room;
        this.updateStats();
    }
    if (target.slot === 'weapon') {
      //console.log('Your attack' + (this.weapon ? (' (with ' + this.weapon.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));
    } else if (target.slot === 'shield') {
      //console.log('Your defense' + (this.shield ? (' (with ' + this.shield.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
    }
    //console.log('');
    updateRoom()
    if (oldItem) {
        if (oldItem.onDrop) {
            oldItem.onDrop()
        }
    }
};

Player.prototype.hold = function (targetName) {
    clearType();
    var i; var j;
    var target;
    if (this.holding.length > 5) {
        drawString('You can only hold six things.');
        return false
    }
    if (typeof targetName === 'string') {
        this.room.items.map(function (item) {
          if (item.name == targetName) {
            target = item;
          }
        }.bind(this));
    } else {
        target = targetName;
    }
    if (!target) { return false; }
    target.room = 'player';
    this.holding.push(target);
    //console.log('You put the ' + target.name + ' away for later.');
    this.updateStats();
    for (j=0 ; j<this.room.items.length ; j++) {
        if (target.id === this.room.items[j].id) {
            this.room.items = this.room.items.slice(0,j).concat(this.room.items.slice(j+1,this.room.items.length));
        }
    }
    updateRoom()
};

Player.prototype.drop = function (itemName) {
  clearType();
  let holding = null;
  let unique = false;
  if (typeof itemName !== 'string' && itemName.name) {
      itemName = itemName.name
  }
  if (this.weapon && this.weapon.name == itemName) {
    this.weapon.room = game.player.room
    if (this.weapon.onDrop) {
        this.weapon.room = this.room
        this.weapon.onDrop()
    }
    this.room.items.push(this.weapon);
    this.weapon.room = this.room;
    //console.log('You drop your ' + this.weapon.name + '.');
    this.weapon = null;
  } else if (this.shield && this.shield.name == itemName) {
    this.shield.room = game.player.room
    if (this.shield.onDrop) {
        this.shield.room = this.room
        this.shield.onDrop()
    }
    this.room.items.push(this.shield);
    this.shield.room = this.room;
    // console.log('You drop your ' + this.shield.name + '.');
    this.shield = null;
  } else if (this.holding.map(item => {
    holding = (item.name === itemName) ? item : holding;
    return item.name;
  }).includes(itemName)) {
    this.room.items.push(holding);
    holding.room = game.player.room
    if (holding.onDrop) {
        holding.room = this.room
        holding.onDrop()
    }
    holding.room = this.room;
    //console.log('You drop the ' + holding.name + ' you were holding.');
    this.holding = this.holding.filter(item => {
      if (item.name === itemName && !unique) {
        unique = true;
        return false;
      } else {
        return true;
      }
    });
  }
  this.updateStats();
  updateRoom()
};

Player.prototype.updateStats = function (fake=false) {
    if (!fake) {
        updateInventory()
    }
    {
        for (i=0 ; i<6 ; i++) {
            this.stats.attack[i] = this.stats.baseAttack[i] + (this.weapon ? this.weapon.bonus[i] : 0);
            this.stats.defense[i] = this.stats.baseDefense[i] + (this.shield ? this.shield.bonus[i] : 0);
            this.stats.defense[i] = this.stats.defense[i] > 12 ? 12 : this.stats.defense[i];
        }
    }
};

Player.prototype.fight = function (enemyName, fake=false) {
    var enemy;
    var i;
    var shieldUse = 0;
    if (!this.alive) {
        drawString('You\'re dead.')
        return true
    }
    if (typeof enemyName === 'string') {
        this.room.monsters.map(function (monster) {
          if (monster.name === enemyName) {
            enemy = monster;
          }
        }.bind(this));
    } else {
        enemy = enemyName
    }
    for (i=0 ; i<6 ; i++) {
        enemy.hitpoints -= Math.ceil(this.stats.attack[i] * (12/12 - (enemy.defense[i] / 12)));
    }
    for (i=0 ; i<6 ; i++) {
        if (enemy.attack[i] && this.shield && this.shield.bonus[i]) {
            shieldUse += this.shield.bonus[i] / enemy.attack[i];
        }
        this.stats.hitpoints -= Math.ceil(enemy.attack[i] * (12/12 - (this.stats.defense[i] / 12)));
    }
    //console.log('Player:' + ' ' + (this.stats.hitpoints < 0 ? 0 : this.stats.hitpoints));
    //console.log('Enemy:' + ' ' + (enemy.hitpoints < 0 ? 0 : enemy.hitpoints));
    if (this.weapon && (this.weapon.ammo || this.weapon.ammo === 0)) {
        if ((!fake || this.weapon !== game.player.weapon) && (enemy.room === game.player.room)) {
            this.weapon.ammo -= 1;
        }
        if (!display.data.itemsUsed.map(ob => { return ob.name }).includes(this.weapon.name)) {
            display.data.itemsUsed.push({
                name: this.weapon.name,
                info: this.weapon.info,
            })
        }
        if (this.weapon.onUse && !fake) { this.weapon.onUse(this); }
        if (this.weapon && this.weapon.ammo <= 0) {
            if (!fake) {
                drawString(this.weapon.spentMessage);
            }
            if (this.weapon.onDestroy && !fake) { this.weapon.onDestroy(this.room); }
            this.weapon = null;
        }
        this.updateStats(fake);
    }
    if (this.shield && this.shield !== null) {
        if (!fake || !(this.shield === game.player.shield)) {
            if (this.shield.ammo) {
                this.shield.ammo -= shieldUse < 1 ? shieldUse : 1;
            }
        }
        if (!display.data.itemsUsed.map(ob => { return ob.name }).includes(this.shield.name)) {
            display.data.itemsUsed.push({
                name: this.shield.name,
                info: this.shield.info,
            })
        }
        if (shieldUse && this.shield.onUse && !fake) { this.shield.onUse(this) }
        if (this.shield.ammo <= 0) {
            if (!fake) {
                drawString(this.shield.spentMessage);
            }
            this.shield = null;
            this.updateStats(fake);
        }
    }
    if (enemy.hitpoints <= 0 && !fake) {
        enemy.die();
    } if (this.stats.hitpoints <= 0 && !fake) {
        this.die();
    }
    if (!fake && enemy.fightEvent && enemy.hitpoints > 0) {
      enemy.fightEvent.bind(enemy)();
    }
    if (!fake) {
        updateRoomContents()
        updateInventory()
    }
};

Player.prototype.use = function (itemName) {
    if (this.weapon && this.weapon.name === itemName) {
        if (!fake && this.weapon.onUse && this.weapon.name === itemName) {
            this.weapon.onUse(this);
        } else {
            clearType();
            //console.log(`You wave your ${itemName} in front of you.`);
        }
    };
}

Player.prototype.die = function () {
    clearType()
    drawString('You\'re dead.')
    this.alive = false;

    localStorage.setItem('monster-data', JSON.stringify(display.data))

    window.setTimeout(gameOver, 1500)
};

Player.prototype.recover = function (active=false) {
    if (!this.alive) {
        drawString('You\'re dead.')
        return false
    }
    if (!this.room.monsters.length) {
        var diff;
        var gain;
        if (this.stats.hitpoints >= this.stats.maxHitpoints && active) {
            //console.log('You\'re already at full hitpoints.');
            return undefined;
        }
        diff = this.stats.maxHitpoints - this.stats.hitpoints;
        this.room.mana -= diff;
        gain = this.room.mana < 0 ? diff + this.room.mana : diff;
        gain = gain < 0 ? 0 : gain;
        gain = gain <= diff ? gain : diff;
        if (gain === 0 && active) {
            //console.log('There\'s no life energy left to draw from in this room. Try another room.');
        } else {
            this.stats.hitpoints += gain;
            this.stats.hitpoints = this.stats.hitpoints > this.stats.maxHitpoints ? this.stats.maxHitpoints : this.stats.hitpoints;
            if (gain) {
              //console.log('You heal by ' + gain + ' hitpoints, to ' + this.stats.hitpoints + '|' + this.stats.maxHitpoints + ' total.');
            }
        }
    } else if (active) {
        //console.log('You can\'t recover when there are monsters in the room.');
    }

    if (display.data.monstersKilled && display.data.itemsUsed) {
        display.data.monstersKilled = display.data.monstersKilled.sort((x, y) => {
            return x.name[0] < y.name[0]
        })
        display.data.monstersEncountered = display.data.monstersEncountered.sort((x, y) => {
            return x.name[0] < y.name[0]
        })
        display.data.itemsUsed = display.data.itemsUsed.sort((x, y) => {
            return x.name[0] < y.name[0]
        })
    }
    localStorage.setItem('monster-data', JSON.stringify(display.data))

    updateInventory()
};

Player.prototype.describeDoors = function () {
    var i;
    var string;
    string = 'This room has ';
    for (i=0 ; i<this.room.doors.length ; i++) {
        if (i < this.room.doors.length - 1) {
            string += 'a ' + this.room.doors[i].color + ' door, ';
        } else if (this.room.doors.length > 1) {
            string += 'and a ' + this.room.doors[i].color + ' door.';
        } else {
            string += 'a ' + this.room.doors[i].color + ' door.';
        }
    }
    //console.log(string);
    return string;
};

Player.prototype.describeMonsters = function () {
    if (!this.room.monsters.length) {
        return false;
    } else {
        var i;
        var string;
        string = 'There\'s ';
        for (i=0 ; i<this.room.monsters.length ; i++) {
            if (i < this.room.monsters.length - 1) {
                string += 'a ' + this.room.monsters[i].name + ', ';
            } else if (this.room.monsters.length > 1) {
                string += 'and a ' + this.room.monsters[i].name + ' in the room with you.';
            } else {
                string += 'a ' + this.room.monsters[i].name + ' in the room with you.';
            }
        }
        //console.log(string);
        return string;
    }
};

Player.prototype.describeItems = function () {
    if (!this.room.items.length) {
        return false;
    } else {
        var i;
        var string;
        var surface;
        surfaceTypes.map(function (surfaceType) {
            if (surfaceType[1].includes(this.room.type)) {
                surface = surfaceType[0];
            }
            if (!surface) { surface = 'floor'; }
        }.bind(this));
        string = 'There\'s ';
        for (i=0 ; i<this.room.items.length ; i++) {
            if (i < this.room.items.length - 1) {
                string += 'a ' + this.room.items[i].name + ', ';
            } else if (this.room.items.length > 1) {
                string += 'and a ' + this.room.items[i].name + ' on the ' + surface + '.';
            } else {
                string += 'a ' + this.room.items[i].name + ' on the ' + surface + '.';
            }
        }
        //console.log(string);
        return string;
    }
};

Player.prototype.statObjString = function (stats, item) {
  if (item) {
    return (
    'pierce|' + (stats[0] - item.bonus[0]) + (item.bonus[0] ? ('+' + item.bonus[0]) : '') +
    ' slash|' + (stats[1] - item.bonus[1]) + (item.bonus[1] ? ('+' + item.bonus[1]) : '') +
    ' crush|' + (stats[2] - item.bonus[2]) + (item.bonus[2] ? ('+' + item.bonus[2]) : '') +
    ' burn|' + (stats[3] - item.bonus[3]) + (item.bonus[3] ? ('+' + item.bonus[3]) : '') +
    ' poison|' + (stats[4] - item.bonus[4]) + (item.bonus[4] ? ('+' + item.bonus[4]) : '') +
    ' curse|' + (stats[5] - item.bonus[5]) + (item.bonus[5] ? ('+' + item.bonus[5]) : ''));
  } else {
    return 'pierce|' + stats[0] +
    ' slash|' + stats[1] +
    ' crush|' + stats[2] +
    ' burn|' + stats[3] +
    ' poison|' + stats[4] +
    ' curse|' + stats[5];
  }
};

Player.prototype.showStats = function () {
    clearType();
    //console.log('');
    //console.log(')    YOU    (');

    //console.log('You have ' + this.stats.hitpoints + '|' + this.stats.maxHitpoints + ' hitpoints.');

    //console.log('Your attack' + (this.weapon ? (' (with ' + this.weapon.name + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));

    //console.log('Your defense' + (this.shield ? (' (with ' + this.shield.name + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
};

Player.prototype.info = function () {
    var bonusString;
    var item;
    var mon;
    var i; var j;

    clearType();

    for (i=0 ; i<this.room.monsters.length ; i++) {
      mon = this.room.monsters[i];
      //console.log('');
      //console.log('|    ' + mon.name.toUpperCase() + '    |');
      //console.log(mon.info);
      //console.log('ATTACK: ' + this.statObjString(mon.attack));
      //console.log('DEFENSE: ' + this.statObjString(mon.defense));
      //console.log('The ' + mon.name + ' has ' + mon.hitpoints + ' hitpoints left.');
    }
    for (i=0 ; i<this.room.items.length ; i++) {
      item = this.room.items[i];
      //console.log('');
      //console.log('*    ' + item.name.toUpperCase() + '    *');
      //console.log(item.info);
    }
    if (!item && !mon) {
      this.lookAround();
    }
};
;
