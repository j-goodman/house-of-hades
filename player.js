var Player = function () {
    this.room = null;
    this.stats = {
        // pierce, slash, crush, burn, poison, curse
        attack: [1,2,6,0,0,0],
        defense: [3,3,3,1,2,1],
        baseAttack: [1,2,6,0,0,0],
        baseDefense: [3,3,3,1,2,1],
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
    // drawString('You find yourself within a sprawling manor, in a ' + this.room.type + '. There\'s nobody else in the room but you.'); // Seek the throne room and kill the Wendigo King.');
    // drawString('');
    // drawString('Find the treasure room and kill the dragon.');
    // drawString('');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
};

Player.prototype.lookAround = function () {
    // clearType();
    // drawString('You\'re in a ' + this.room.type + '.');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
};

Player.prototype.showHolding = function () {
    // clearType();
    // drawString('You\'re holding:');
    this.holding.map(item => {
        // drawString(item.name);
    });
};

Player.prototype.goTo = function (doorString) {
    var doorColor;
    if (!this.alive) {
        // drawString('You\'re dead.');
        return true;
    } else {
      // clearType();
    }
    doorColor = doorString.slice(0, doorString.length - 5);
    this.room.doors.map(function (door) {
        if (door.color === doorColor) {
            door.go(this);
        }
    }.bind(this));
    this.recover(false);
    display.update();
};

Player.prototype.get = function (targetName) {
    // clearType();
    var i; var j;
    var target;
    var oldItem;
    this.room.items.map(function (item) {
        if (item.name == targetName) {
            target = item;
        }
    }.bind(this));
    if (!target || !target.slot) { return false; }
    oldItem = this[target.slot];
    this[target.slot] = target;
    target.room = 'player';
    // drawString('You take the ' + target.name + '.');
    this.updateStats();
    for (j=0 ; j<this.room.items.length ; j++) {
        if (target === this.room.items[j]) {
            this.room.items = this.room.items.slice(0,j).concat(this.room.items.slice(j+1,this.room.items.length));
        }
    }
    if (oldItem) {
        // drawString('You drop your ' + oldItem.name + '.');
        this.room.items.push(oldItem);
        oldItem.room = this.room;
        this.updateStats();
    }
    if (target.slot === 'weapon') {
      // drawString('Your attack' + (this.weapon ? (' (with ' + this.weapon.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));
    } else if (target.slot === 'shield') {
      // drawString('Your defense' + (this.shield ? (' (with ' + this.shield.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
    }
    // drawString('');
    display.update();
};

Player.prototype.hold = function (targetName) {
    // clearType();
    var i; var j;
    var target;
    this.room.items.map(function (item) {
        if (item.name == targetName) {
            target = item;
        }
    }.bind(this));
    if (!target) { return false; }
    target.room = 'player';
    this.holding.push(target);
    // drawString('You put the ' + target.name + ' away for later.');
    this.updateStats();
    for (j=0 ; j<this.room.items.length ; j++) {
        if (target === this.room.items[j]) {
            this.room.items = this.room.items.slice(0,j).concat(this.room.items.slice(j+1,this.room.items.length));
        }
    }
    display.update();
};

Player.prototype.drop = function (itemName) {
  // clearType();
  let holding = null;
  let unique = false;
  if (this.weapon && this.weapon.name == itemName) {
    this.room.items.push(this.weapon);
    this.weapon.room = this.room;
    // drawString('You drop your ' + this.weapon.name + '.');
    this.weapon = null;
  } else if (this.shield && this.shield.name == itemName) {
    this.room.items.push(this.shield);
    this.shield.room = this.room;
    // drawString('You drop your ' + this.shield.name + '.');
    this.shield = null;
  } else if (this.holding.map(item => {
    holding = (item.name === itemName) ? item : holding;
    return item.name;
  }).includes(itemName)) {
    this.room.items.push(holding);
    holding.room = this.room;
    // drawString('You drop the ' + holding.name + ' you were holding.');
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
  display.update();
};

Player.prototype.updateStats = function () {
    {
        for (i=0 ; i<6 ; i++) {
            this.stats.attack[i] = this.stats.baseAttack[i] + (this.weapon ? this.weapon.bonus[i] : 0);
            this.stats.defense[i] = this.stats.baseDefense[i] + (this.shield ? this.shield.bonus[i] : 0);
            this.stats.defense[i] = this.stats.defense[i] > 12 ? 12 : this.stats.defense[i];
        }
    }
};

Player.prototype.fight = function (enemyName) {
    var enemy;
    var i;
    var shieldUse = 0;
    // clearType();
    this.room.monsters.map(function (monster) {
        if (monster.name === enemyName) {
            enemy = monster;
        }
    }.bind(this));
    for (i=0 ; i<6 ; i++) {
        enemy.hitpoints -= Math.ceil(this.stats.attack[i] * (12/12 - (enemy.defense[i] / 12)));
    }
    for (i=0 ; i<6 ; i++) {
        if (enemy.attack[i] && this.shield && this.shield.bonus[i]) {
            shieldUse += this.shield.bonus[i] / enemy.attack[i];
        }
        this.stats.hitpoints -= Math.ceil(enemy.attack[i] * (12/12 - (this.stats.defense[i] / 12)));
    }
    // drawString('Player:' + ' ' + (this.stats.hitpoints < 0 ? 0 : this.stats.hitpoints));
    // drawString('Enemy:' + ' ' + (enemy.hitpoints < 0 ? 0 : enemy.hitpoints));
    if (this.weapon && this.weapon.ammo) {
        this.weapon.ammo -= 1;
        if (this.weapon.onUse) { this.weapon.onUse(this); }
        if (this.weapon.ammo <= 0) {
            // drawString(this.weapon.spentMessage);
            if (this.weapon.onDestroy) { this.weapon.onDestroy(this.room); }
            this.weapon = null;
        }
        this.updateStats();
    }
    if (this.shield && this.shield.ammo) {
        this.shield.ammo -= shieldUse < 1 ? shieldUse : 1;
        if (shieldUse && this.shield.onUse) { this.shield.onUse(this) }
        if (this.shield.ammo <= 0) {
            // drawString(this.shield.spentMessage);
            this.shield = null;
            this.updateStats();
        }
    }
    if (enemy.hitpoints <= 0) {
        enemy.die();
    } if (this.stats.hitpoints <= 0) {
        this.die();
    }
    if (enemy.fightEvent && enemy.hitpoints > 0) {
      enemy.fightEvent();
    }
    display.update();
};

Player.prototype.use = function (itemName) {
    if (this.weapon && this.weapon.name === itemName) {
        if (this.weapon.onUse && this.weapon.name === itemName) {
            this.weapon.onUse(this);
        } else {
            // clearType();
            // drawString(`You wave your ${itemName} in front of you.`);
        }
    };
    display.update();
}

Player.prototype.die = function () {
    // clearType();
    // drawString('You\'re dead.');
    this.alive = false;
    display.update();
};

Player.prototype.recover = function (active=false) {
    if (!this.room.monsters.length) {
        var diff;
        var gain;
        if (this.stats.hitpoints >= this.stats.maxHitpoints && active) {
            // drawString('You\'re already at full hitpoints.');
            return undefined;
        }
        diff = this.stats.maxHitpoints - this.stats.hitpoints;
        this.room.mana -= diff;
        gain = this.room.mana < 0 ? diff + this.room.mana : diff;
        gain = gain < 0 ? 0 : gain;
        gain = gain <= diff ? gain : diff;
        if (gain === 0 && active) {
            // drawString('There\'s no life energy left to draw from in this room. Try another room.');
        } else {
            this.stats.hitpoints += gain;
            this.stats.hitpoints = this.stats.hitpoints > this.stats.maxHitpoints ? this.stats.maxHitpoints : this.stats.hitpoints;
            if (gain) {
              // drawString('You heal by ' + gain + ' hitpoints, to ' + this.stats.hitpoints + '|' + this.stats.maxHitpoints + ' total.');
            }
        }
    } else if (active) {
        // drawString('You can\'t recover when there are monsters in the room.');
    }
    display.update();
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
    // drawString(string);
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
        // drawString(string);
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
        // drawString(string);
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
    // clearType();
    // drawString('');
    // drawString(')    YOU    (');

    // drawString('You have ' + this.stats.hitpoints + '|' + this.stats.maxHitpoints + ' hitpoints.');

    // drawString('Your attack' + (this.weapon ? (' (with ' + this.weapon.name + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));

    // drawString('Your defense' + (this.shield ? (' (with ' + this.shield.name + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
};

Player.prototype.info = function () {
    var bonusString;
    var item;
    var mon;
    var i; var j;

    // clearType();

    for (i=0 ; i<this.room.monsters.length ; i++) {
      mon = this.room.monsters[i];
      // drawString('');
      // drawString('|    ' + mon.name.toUpperCase() + '    |');
      // drawString(mon.info);
      // drawString('ATTACK: ' + this.statObjString(mon.attack));
      // drawString('DEFENSE: ' + this.statObjString(mon.defense));
      // drawString('The ' + mon.name + ' has ' + mon.hitpoints + ' hitpoints left.');
    }
    for (i=0 ; i<this.room.items.length ; i++) {
      item = this.room.items[i];
      // drawString('');
      // drawString('*    ' + item.name.toUpperCase() + '    *');
      // drawString(item.info);
    }
    if (!item && !mon) {
      this.lookAround();
    }
    display.update();
};
;
