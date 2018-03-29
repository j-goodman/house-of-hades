var pick = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};
var dice = function (sides) {
    return Math.ceil(Math.random() * sides);
};
var oneIn = function (howMany) {
    return !Math.floor(Math.random() * howMany);
};
var pickUnique = function (array, nonArray) {
    var choice;
    var i = 0;
    choice = array[Math.floor(Math.random() * array.length)];
    if (!nonArray.includes(choice)) {
        return choice;
    } else {
        while (nonArray.includes(choice) && i < array.length * 16) {
            choice = array[Math.floor(Math.random() * array.length)];
            i += 1;
        }
        if (i < array.length * 16) {
            return choice;
        } else {
            return false;
        }
    }
};
var allDoors = [];
var allUnresolvedDoors = () => {
  return allDoors.filter((door) => {
    return (!door.to && door.from.doors.includes(door));
  });
}
var roomTypes = ['parlor', 'study', 'dining room', 'kitchen', 'hallway', 'storeroom', 'library', 'bedroom', 'courtyard'];
var doorColors = ['green', 'red', 'blue', 'black', 'white', 'grey', 'brown', 'gold', 'maroon', 'beige', 'oak', 'elmwood', 'lead', 'willow', 'bronze', 'brass', 'cobalt', 'mahogany', 'maple', 'walnut', 'ashwood', 'chestnut', 'pinewood', 'cedar', 'ironwood', 'sandalwood'];
var laterRoomTypes = [
    ['laboratory', 'greenhouse', 'ballroom', 'wine cellar', 'bathroom', 'dimly lit storage space', 'room with hay on the floor', 'larder'],
    ['dungeon', 'laundry room', 'furnace room', 'unfurnished concrete cube'],
    ['observatory', 'chapel', 'throne room'],
];
var laterDoorColors = [
    ['beechwood', 'birchwood', 'aluminium', 'acacia', 'filthy', 'pale blue', 'mirrored', 'tar-smeared', 'charred', 'dark brown', 'pink', 'orange', 'pearl-colored', 'applewood', 'wet', 'purple', 'plywood', 'emerald', 'olive', 'lemon-yellow', 'zinc', 'iron', 'titanium', 'alderwood', 'yew', 'pewter'],
    ['foul-smelling', 'tungsten', 'sweet-smelling', 'jewel-encrusted', 'faintly glowing', 'upholstered', 'heavy looking', 'bright yellow', 'small', 'tall', 'blackwood'],
    ['slime-coated', 'perfectly round', 'eldritch', 'weeping', 'gray'],
];
var surfaceTypes = [
    ['coffee table', ['parlor']],
    ['dinnertable', ['dining room']],
    ['counter', ['kitchen', 'bathroom']],
    ['desk', ['study']],
    ['bookshelf', ['library']],
    ['shelf', ['storeroom', 'laboratory', 'wine cellar', 'larder']],
    ['end table', ['hallway']],
    ['bed', ['bedroom']],
    ['ground', ['courtyard', 'greenhouse']],
    ['floor', ['ballroom', 'dungeon', 'observatory', 'laundry room', 'chapel', 'furnace room']],
    ['throne', ['throne room']],
];

var nextRoomId = 0;
var hour = 0;

var House = function (player) {
    var spawnRoom;

    this.rooms = [];

    spawnRoom = houseBuilder.buildSpawn();

    buildSegments(3, this.rooms);

    this.rooms.push(spawnRoom);
    player.room = spawnRoom;
};

var Room = function (doors, doorCount) {
    this.type = pick(roomTypes);
    this.doors = doors ? doors : [];
    this.id = nextRoomId;
    this.monsters = [];
    this.items = [];
    this.mana = 8;
    nextRoomId += 1;
    var i;
    var door;
    var usedColors = [];
    if (doors) {
        doors.map(function (door) {
            usedColors.push(door.color);
        });
    }
    var mainMonsterPool = hour > 7 ? allMonsterTypes : allMonsterTypes.filter(function (monsterType) {
      return monsterType.level <= 2;
    });
    var secondMonsterPool = hour > 16 ? allMonsterTypes : allMonsterTypes.filter(function (monsterType) {
      return monsterType.level <= 1;
    });
    if (oneIn(1.3)) {
        this.monsters.push(new Monster (this, pick(mainMonsterPool)));
        // this.monsters.push(new Monster (this, monByName('weaghrai')));
    }
    if (oneIn(7)) {
        this.monsters.push(new Monster (this, pick(secondMonsterPool)));
    }
    // Check that it's not two of the same monster:
    this.monsters = (this.monsters.length === 2 &&this.monsters[0].name === this.monsters[1].name) ?
    [this.monsters[0]] : this.monsters;
    if (oneIn(1.7)) {
        this.items.push(new Item (pick(allItemTypes), this));
    }
    doorCount = (doorCount || doorCount === 0) ? doorCount : Math.ceil(Math.random() * (2.1));
    for (i=0 ; i<doorCount ; i++) {
        if (i > 0 && hour > 0 && allDoors.length > 10 && allUnresolvedDoors().filter((door)=>{ return !usedColors.includes(door.color) }).length > 0 && (allUnresolvedDoors().length > 3)) {
          door = pick(allUnresolvedDoors().filter((selectDoor)=>{ return !usedColors.includes(selectDoor.color) }));
          door.to = this;
        } else {
          door = new Door (pickUnique(doorColors, usedColors), this, null);
        }
        door.locked = true;
        usedColors.push(door.color);
        this.doors.push(door);
    }
};

Room.prototype.ensureUniqueDoorColors = function () {
  var usedColors = [];
  this.doors.forEach((door) => {
    while (usedColors.includes(door.color)) {
      door.color = pick(doorColors);
    }
    usedColors.push(door.color);
  });
};

var Door = function (color, from, to, locked) {
    allDoors.push(this);
    this.from = from;
    this.color = color;
    this.locked = !!locked;
    if (to) { this.to = to; } else {
        this.to = false;
    }
};

Door.prototype.go = function (player) {
    if (!this.to) {
      if (hour > 26 && Math.round(Math.random()) && finalTreasureRoom.doors[0] && (finalTreasureRoom.doors[0].to === true)) {
        this.to = finalTreasureRoom;
        finalTreasureRoom.doors = [this];
        this.locked = false;
      } else {
        this.makeDestination()
      }
    }
    if (this.locked) {
        if (player.room.monsters.length) {
            drawString('Kill the monsters in the room to unlock that door.');
            return false;
        } else {
            this.locked = false;
        }
    }
    if (player.room.id === this.from.id) {
        player.room = this.to;
        hour += 1;
    } else if (player.room.id === this.to.id) {
        player.room = this.from;
        hour += 1;
    } else {
        drawString('DOOR ERROR');
        drawString(this, player);
    }
    this.locked = false;
    this.advanceRoomAndDoorTypes();
    player.lookAround();
};

Door.prototype.makeDestination = function () {
  this.to = new Room ([this]);
}

Door.prototype.advanceRoomAndDoorTypes = function () {
  if (hour > 18 && laterDoorColors[0] && laterRoomTypes[0]) {
      doorColors = doorColors.concat(laterDoorColors[0]);
      roomTypes = roomTypes.concat(laterRoomTypes[0]);
      laterDoorColors[0] = false; laterRoomTypes[0] = false;
  }
  if (hour > 36 && laterDoorColors[1] && laterRoomTypes[1]) {
      doorColors = doorColors.concat(laterDoorColors[1]);
      roomTypes = roomTypes.concat(laterRoomTypes[1]);
      laterDoorColors[1] = false; laterRoomTypes[1] = false;
  }
  if (hour > 50 && laterDoorColors[2] && laterRoomTypes[2]) {
      doorColors = doorColors.concat(laterDoorColors[2]);
      roomTypes = roomTypes.concat(laterRoomTypes[2]);
      laterDoorColors[2] = false; laterRoomTypes[2] = false;
  }
};
