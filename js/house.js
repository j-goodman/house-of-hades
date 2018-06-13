var setupHouse = () => {
  window.allDoors = [];
}
setupHouse()
Array.prototype.politePush = function (item) {
    if (!this.includes(item)) {
        this.push(item)
        return true
    }
    return false
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
var allUnresolvedDoors = () => {
  return allDoors.filter((door) => {
    return (!door.to && door.from.doors.includes(door));
  });
}
var roomTypes = ['parlor', 'study', 'dining room', 'kitchen', 'storeroom', 'library', 'bedroom', 'courtyard', 'living room', 'hallway', 'hallway', 'hallway', 'hallway', 'hallway', 'hallway', 'hallway'];
var doorColors = ['green', 'red', 'blue', 'black', 'white', 'grey', 'brown', 'gold', 'maroon', 'beige', 'oak', 'elmwood', 'lead', 'willow', 'bronze', 'brass', 'cobalt', 'mahogany', 'maple', 'walnut', 'ashwood', 'chestnut', 'pinewood', 'cedar', 'ironwood', 'sandalwood'];
var laterRoomTypes = [
    ['greenhouse', 'ballroom', 'wine cellar', 'bathroom', 'dimly lit storage space', 'room with hay on the floor', 'larder'],
    ['dungeon', 'laundry room', 'furnace room', 'armory', 'unfurnished concrete cube', 'artist\'s studio', 'music room', 'crypt'],
    ['laboratory', 'observatory', 'chapel', 'throne room', 'vast atrium with a fountain in the center', 'glass vault', 'serpent shrine', 'aviary'],
];
var laterDoorColors = [
    ['beechwood', 'birchwood', 'ebony', 'aluminium', 'acacia', 'filthy', 'pale blue', 'mirrored', 'tar-smeared', 'charred', 'dark brown', 'pink', 'orange', 'pearl-colored', 'applewood', 'wet', 'purple', 'plywood', 'emerald', 'olive', 'lemon-yellow', 'zinc', 'iron', 'titanium', 'alderwood', 'yew', 'pewter'],
    ['foul-smelling', 'tungsten', 'sweet-smelling', 'jewel-encrusted', 'faintly glowing', 'upholstered', 'heavy looking', 'bright yellow', 'small', 'tall', 'blackwood', 'heavily fortified', 'baroque', 'plaster-covered', 'canvas-covered', 'grass-green', 'thick'],
    ['slime-coated', 'perfectly round', 'eldritch', 'weeping', 'gray', 'fake', 'real'],
];
var surfaceTypes = [
    ['coffee table', ['parlor', 'living room']],
    ['dinnertable', ['dining room']],
    ['counter', ['kitchen', 'bathroom']],
    ['desk', ['study']],
    ['bookshelf', ['library']],
    ['shelf', ['storeroom', 'laboratory', 'wine cellar', 'larder']],
    ['end table', ['hallway']],
    ['bed', ['bedroom']],
    ['ground', ['greenhouse']],
    ['floor', ['observatory', 'furnace room']],
    ['throne', ['throne room']],
    ['dance floor', ['ballroom']],
    ['altar', ['chapel', 'serpent shrine']],
    ['grand piano', ['music room']],
    ['concrete floor', ['unfurnished concrete cube']],
    ['weapon rack', ['armory']],
    ['washing machine', ['laundry room']],
    ['cold stone floor', ['dungeon']],
    ['grass', ['courtyard']],
];
var roomTypeItems = {
    'kitchen': ['jar of salt', 'jar of salt', 'life-giving herb', 'kitchen knife', 'kitchen knife'],
    'greenhouse': ['purple orchid', 'bleeding mushroom', 'sickle'],
    'courtyard': ['life-giving herb', 'bleeding mushroom', 'oak stick', 'broken bottle', 'woodaxe', 'dueling saber'],
    'music room': ['weird viol', 'wand of oceans', 'bottle of whiskey'],
    'chapel': ['posessed bible', 'clergyman\'s dagger'],
    'laboratory': ['bottle of green acid', 'bottle of orange fumes', 'bottle of violet powder', 'broken bottle'],
    'study': ['letter opener', 'antique saber', 'cigarette lighter', 'inkwell', 'fountain pen', 'hand grenade'],
    'bathroom': ['straightrazor', 'crowbar', 'wrench'],
    'storeroom': ['wrench', 'jar of salt', 'thompson gun', 'riot shield', 'firebomb', 'hand grenade', 'woodaxe', 'case of chemical bombs', 'revolver', 'canned ghost', 'bottle of liquid swords', 'bag of devil\'s gold', 'golem\'s blood', 'assassin\'s gun', 'dueling saber'],
    'dungeon': ['makeshift stabbing implement', 'makeshift stabbing implement', 'old iron chain', 'old iron chain', 'fire poker', 'bleeding mushroom', 'bleeding mushroom', 'burned bone', 'crowbar', 'paladin\'s shield'],
    'armory': ['executioner\'s sword', 'assassin\'s gun', 'battleaxe', 'pike', 'cavalry shield', 'poison crossbow', 'dueling saber'],
    'crypt': ['assassin\'s gun', 'plague knight\'s sword'],
    'serpent shrine': ['assassin\'s gun', 'blowgun', 'torch'],
    // 'hallway': ['assassin\'s gun', 'plague knight\'s sword', 'dueling saber'],
}
var roomTypeMonsters = {
    'vast atrium with a fountain in the center': ['merman', 'rabid wizard', 'necromancer', 'riverwolf'],
    'furnace room': ['arsonist ghost', 'fire elemental', 'posessed furnace'],
    'throne room': ['swordwraith'],
    'dungeon': ['rabid wizard', 'weaghrai', 'shoggoth', 'chained specter', 'foolsfire'],
    'crypt': ['skullhead', 'cruel phantom', 'murderer\'s courage'],
    'serpent shrine': ['pit viper', 'boa constrictor', 'rattlesnake'],
    'aviary': ['hawk', 'crow', 'albatross', 'owl of shadows'],
}

var nextRoomId = 0;
var hour = 0;

var House = function (player) {
    var spawnRoom;

    this.rooms = [];

    spawnRoom = houseBuilder.buildSpawn();

    buildSegments(2, this.rooms);

    let newRoom = new Room ([], 3)
    newRoom.type = pick(roomTypes)
    newRoom = new Room ([], 1 + dice(2))
    newRoom.type = pick(roomTypes)
    newRoom = new Room ([], 2)
    newRoom.type = pick(roomTypes)

    if (!game.gated) {
        segments[8]([])
    }

    this.rooms.push(spawnRoom);
    player.room = spawnRoom;
    player.detector = impossibility_detector
    player.detector.room = player.room;
};

var Room = function (doors, doorCount) {
    this.type = pick(roomTypes);
    this.doors = doors ? doors : [];
    this.id = nextRoomId;
    this.monsters = [];
    this.items = [];
    this.graveyard = [];
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
    var mainMonsterPool = hour > 12 ? allMonsterTypes : allMonsterTypes.filter(function (monsterType) {
      return monsterType.level <= 2;
    });
    var secondMonsterPool = hour > 24 ? allMonsterTypes : allMonsterTypes.filter(function (monsterType) {
      return monsterType.level <= 1;
    });
    if (oneIn(1.5)) {
        this.monsters.push(new Monster (this, pick(mainMonsterPool)));
    }
    if (this.type === 'glass vault' && this.monsters.length === 1 && !game.sphinxed) {
        this.monsters[0] = new Monster (this, extras['sphinx'])
        game.sphinxed = true
    }
    if (oneIn(7)) {
        this.monsters.push(new Monster (this, pick(secondMonsterPool)));
    }
    // Check that it's not two of the same monster:
    this.monsters = (this.monsters.length === 2 &&this.monsters[0].name === this.monsters[1].name) ?
    [this.monsters[0]] : this.monsters;

    if (roomTypeMonsters[this.type]) {
        this.monsters.map((mon, index) => {
            this.monsters[index] = new Monster (this, monByName(pick(roomTypeMonsters[this.type])))
        })
    }

    if (oneIn(1.7)) {
        this.items.push(new Item (pick(allItemTypes), this));
    }
    if (roomTypeItems[this.type]) {
        this.items.map((itm, index) => {
            this.items[index] = new Item (itemByName(pick(roomTypeItems[this.type])), this)
        })
    }
    let rando = dice(14)
    let amt = rando > 11 ? 2 : 1
    amt = rando > 13 ? 3 : amt
    doorCount = (doorCount || doorCount === 0) ? doorCount : amt;
    for (i=0 ; i<doorCount ; i++) {
        if (i > 0 && hour > 0 && allDoors.length > 10 && allUnresolvedDoors().filter((door)=>{ return !usedColors.includes(door.color) }).length > 0 && (allUnresolvedDoors().length > 3)) {
          door = pick(allUnresolvedDoors().filter((selectDoor)=>{ return !usedColors.includes(selectDoor.color) }));
          door.to = this;
        } else {
          door = new Door (pickUnique(doorColors, usedColors), this, null);
        }
        door.locked = !!this.monsters.length;
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
      if (hour > 20 && Math.round(Math.random()) && finalTreasureRoom.doors[0] && (finalTreasureRoom.doors[0].to === true)) {
        this.to = finalTreasureRoom;
        finalTreasureRoom.doors = [this];
        this.locked = false;
      } else {
        this.makeDestination()
      }
    }
    if (this.locked) {
        if (player.room.monsters.length) {
            console.log('Kill the monsters in the room to unlock that door.');
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
        console.log('DOOR ERROR');
        console.log(this, player);
    }
    this.locked = false;
    this.advanceRoomAndDoorTypes();
    player.lookAround();
};

Door.prototype.makeDestination = function () {
  this.to = new Room ([this]);
}

Door.prototype.resolved = function () {
  return ((this.from && this.to) && (this.from.type && this.to.type))
}

Door.prototype.advanceRoomAndDoorTypes = function () {
  if (hour > 30 && laterDoorColors[0] && laterRoomTypes[0]) {
      doorColors = doorColors.concat(laterDoorColors[0]);
      roomTypes = roomTypes.concat(laterRoomTypes[0]);
      laterDoorColors[0] = false; laterRoomTypes[0] = false;
  }
  if (hour > 60 && laterDoorColors[1] && laterRoomTypes[1]) {
      doorColors = doorColors.concat(laterDoorColors[1]);
      roomTypes = roomTypes.concat(laterRoomTypes[1]);
      laterDoorColors[1] = false; laterRoomTypes[1] = false;
  }
  if (hour > 80 && laterDoorColors[2] && laterRoomTypes[2]) {
      doorColors = doorColors.concat(laterDoorColors[2]);
      roomTypes = roomTypes.concat(laterRoomTypes[2]);
      laterDoorColors[2] = false; laterRoomTypes[2] = false;
  }
};
