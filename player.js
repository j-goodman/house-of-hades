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
    this.alive = true;
};

Player.prototype.welcome = function () {
    console.log('You find yourself within a sprawling manor, in a ' + this.room.type + '. There\'s nobody else in the room but you.'); // Seek the throne room and kill the Wendigo King.');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
};

Player.prototype.lookAround = function () {
    console.log('You\'re in a ' + this.room.type + '.');
    this.describeDoors();
    this.describeItems();
    this.describeMonsters();
};

Player.prototype.goTo = function (doorString) {
    if (!this.alive) {
        console.log('You\'re dead.');
        return true;
    }
    var doorColor;
    doorColor = doorString.slice(0, doorString.length - 5);
    this.room.doors.map(function (door) {
        if (door.color === doorColor) {
            door.go(this);
        }
    }.bind(this));
};

Player.prototype.get = function (targetName) {
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
    console.log('You take the ' + target.name + '.');
    this.updateStats();
    for (j=0 ; j<this.room.items.length ; j++) {
        if (target === this.room.items[j]) {
            this.room.items = this.room.items.slice(0,j).concat(this.room.items.slice(j+1,this.room.items.length));
        }
    }
    if (oldItem) {
        console.log('You drop your ' + oldItem.name + '.');
        this.room.items.push(oldItem);
    }
    if (target.slot === 'weapon') {
      console.log('Your attack' + (this.weapon ? (' (with ' + this.weapon.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));
    } else if (target.slot === 'shield') {
      console.log('Your defense' + (this.shield ? (' (with ' + this.shield.name.toUpperCase() + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
    }
};

Player.prototype.drop = function (itemName) {
  if (this.weapon && this.weapon.name == itemName) {
    this.room.items.push(this.weapon);
    console.log('You drop your ' + this.weapon.name + '.');
    this.weapon = null;
  } else if (this.shield && this.shield.name == itemName) {
    this.room.items.push(this.shield);
    console.log('You drop your ' + this.shield.name + '.');
    this.shield = null;
  }
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
    console.log('Player:', this.stats.hitpoints < 0 ? 0 : this.stats.hitpoints);
    console.log('Enemy:', enemy.hitpoints < 0 ? 0 : enemy.hitpoints);
    if (this.weapon && this.weapon.ammo) {
        this.weapon.ammo -= 1;
        if (this.weapon.ammo <= 0) {
            console.log(this.weapon.spentMessage);
            this.weapon = null;
            this.updateStats();
        }
    }
    if (this.shield && this.shield.ammo) {
        this.shield.ammo -= shieldUse < 1 ? shieldUse : 1;
        if (this.shield.ammo <= 0) {
            console.log(this.shield.spentMessage);
            this.shield = null;
            this.updateStats();
        }
    }
    if (enemy.hitpoints <= 0) {
        enemy.die();
    } if (this.stats.hitpoints <= 0) {
        this.die();
    }
};

Player.prototype.die = function () {
    console.log('You\'re dead.');
    this.alive = false;
};

Player.prototype.recover = function () {
    if (!this.room.monsters.length) {
        var diff;
        var gain;
        if (this.stats.hitpoints >= this.stats.maxHitpoints) {
            console.log('You\'re already at full hitpoints.');
            return undefined;
        }
        diff = this.stats.maxHitpoints - this.stats.hitpoints;
        this.room.mana -= diff;
        gain = this.room.mana < 0 ? diff + this.room.mana : diff;
        gain = gain < 0 ? 0 : gain;
        gain = gain <= diff ? gain : diff;
        if (gain === 0) {
            console.log('There\'s no life energy left to draw from in this room. Try another room.');
        } else {
            this.stats.hitpoints += gain;
            this.stats.hitpoints = this.stats.hitpoints > this.stats.maxHitpoints ? this.stats.maxHitpoints : this.stats.hitpoints;
            console.log('You heal by ' + gain + ' hitpoints, to ' + this.stats.hitpoints + '/' + this.stats.maxHitpoints + ' total.');
        }
    } else {
        console.log('You can\'t recover when there are monsters in the room.');
    }
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
    console.log(string);
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
        console.log(string);
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
        console.log(string);
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
    console.log('');
    console.log(')    YOU    (');

    console.log('You have ' + this.stats.hitpoints + '/' + this.stats.maxHitpoints + ' hitpoints.');

    console.log('Your attack' + (this.weapon ? (' (with ' + this.weapon.name + ')') : '') + ': ' + this.statObjString(this.stats.attack, this.weapon));

    console.log('Your defense' + (this.shield ? (' (with ' + this.shield.name + ')') : '') + ': ' + this.statObjString(this.stats.defense, this.shield));
};

Player.prototype.info = function () {
  var bonusString;
    var item;
    var mon;
    var i; var j;
    for (i=0 ; i<this.room.monsters.length ; i++) {
      mon = this.room.monsters[i];
      console.log('');
      console.log('|    ' + mon.name.toUpperCase() + '    |');
      console.log(mon.info);
      console.log('ATTACK: ' + this.statObjString(mon.attack));
      console.log('DEFENSE: ' + this.statObjString(mon.defense));
      console.log('The ' + mon.name + ' has ' + mon.hitpoints + ' hitpoints left.');
    }
    for (i=0 ; i<this.room.items.length ; i++) {
      item = this.room.items[i];
      console.log('');
      console.log('*    ' + item.name.toUpperCase() + '    *');
      console.log(item.info);
    }
    if (!item && !mon) {
      this.lookAround();
    }
};
