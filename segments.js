var buildSegments = (count, rooms) => {
  segments[Math.floor(Math.random() * segments.length)](count, rooms);
};

var segments = [
  (count, rooms) => {
    
    
    // THE SEWAGE MAIN
    var segmentRooms = [];
    var otherRoom;
    
    var monByName = (name) => {
        return allMonsterTypes.filter((type) => {
            return type.name === name;
        })[0];
    }
    
    var itemByName = (name) => {
        return allItemTypes.filter((type) => {
            return type.name === name;
        })[0];
    }
    
    var segmentMonsters = [
      monByName('ghoul'), monByName('riverwolf'),
      // pierce, slash, crush, burn, poison, curse
      new MonsterType ({
          name: 'waterlogged grasper',
          attack: [0,2,4,0,2,0,],
          defense: [2,1,0,12,8,0,],
          hitpoints: 20,
          level: 2,
          info: 'The delirious corpse of a drowning victim trying desperately to cling to your legs and neck with its pale bloated hands.',
      }),
      new MonsterType ({
          name: 'deep creature',
          attack: [0,0,0,0,0,0,],
          defense: [3,2,9,7,11,4,],
          hitpoints: 20,
          level: 2,
          info: 'A milky-eyed eeltoothed finned creature the size of a silverback gorilla. It\'s baring its teeth at you.',
      }),
    ];
    
    var usedItems = [];
    var segmentItems = [
      itemByName('cursed pistol'), itemByName('evil eye'), itemByName('posessed bible'), itemByName('life-giving herb'), itemByName('crowbar'),
      // pierce, slash, crush, burn, poison, curse
      new ItemType (
          'black stone idol', 'shield',
          [1,1,1,1,9,9],
          14,
          'With a shriek like the grinding of a mountain out from the mantle the earth, the strange black stone idol you\'re carrying seems to slip between a fold or a crack in the thin air and it falls into a hole of sickly orange light. It\'s gone.',
          'A carved idol in the likeness of an octopus-like deity. You can\'t recognize what the stone is made of but it\'s engraved with runes promising protection to all worshippers.'
      ),
      new ItemType (
          'razor-sharp bone', 'weapon',
          [1,7,0,1,0,0],
          13,
          'The razor-sharp bone you\'re carrying splinters into a dozen pieces with a shower of white sparks.',
          'A four foot long white bone that\'s either been sharpened or naturally comes to a razor-honed edge. You could hold one end and use it as a weapon.'
      ),
    ];
    
    segmentRooms.push(new Room ([], 3));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 3));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
        
    segmentRooms[0].doors[segmentRooms[0].doors.length - 1].to = segmentRooms[1];
    segmentRooms.forEach((room, index) => {
        room.monsters = [
            new Monster (room, pick(segmentMonsters)),
        ];
        if (oneIn(5)) {
            room.monsters.push(
                new Monster (room, pickUnique(segmentMonsters, [room.monsters[0]]))
            )
        }
        if (oneIn(7)) {
            room.monsters = [];
        }
        room.items = [
          new Item (pickUnique(segmentItems, usedItems)),
        ];
        usedItems.push(room.items[0]);
        
        if (index !== 0 && index !== segmentRooms.length - 1) {
            room.doors[0] = segmentRooms[index - 1].doors[segmentRooms[index - 1].doors.length - 1];
            room.doors[room.doors.length - 1].to = segmentRooms[index + 1];
        }
        segmentRooms[segmentRooms.length - 1].doors[0] = segmentRooms[segmentRooms.length - 2].doors[segmentRooms[segmentRooms.length - 2].doors.length - 1];
        rooms.push(room);
        
        segmentRooms[0].doors[2].color = 'rusty iron hatch';
        segmentRooms[0].type = 'mold-infested bathroom';
        segmentRooms[1].type = 'long wet dimly lit tunnel flooded with ankle-deep water';
        segmentRooms[2].type = 'bend in a long metal tunnel';
        segmentRooms[3].type = 'towering abandoned hydraulic pump room lit by beams of moon light coming in from barred slats in the high ceilings';
        segmentRooms[4].type = 'long dripping tunnel flooded with ankle-deep water';
        segmentRooms[5].type = 'bathroom with blue flowers blooming from the drains';
        segmentRooms[5].doors[0].color = 'rusty iron hatch';
    })    
    
    room = new Room([], 3);
    rooms.push(room);
    // room.doors[0].to = otherRoom;
  },
]