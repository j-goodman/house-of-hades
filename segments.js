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
          attack: [1,5,3,0,0,0,],
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
          'A carved idol in the likeness of a octopus-like deity. You can\'t recognize what the stone is made of but it\'s engraved with runes promising protection to all worshippers.'
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

    })

    segmentRooms[0].doors[2].color = 'rusty iron hatch';
    segmentRooms[0].type = 'mold-infested bathroom';
    segmentRooms[1].type = 'long wet dimly lit tunnel flooded with ankle-deep water';
    segmentRooms[2].type = 'bend in a long metal tunnel';
    segmentRooms[3].type = 'towering abandoned hydraulic pump room lit by beams of moon light coming in from barred slats in the high ceilings';
    segmentRooms[4].type = 'long dripping tunnel flooded with ankle-deep water';
    segmentRooms[5].type = 'bathroom with blue flowers blooming from the drains';
    segmentRooms[5].doors[0].color = 'rusty iron hatch';

    room = new Room([], 3);
    rooms.push(room);
    // room.doors[0].to = otherRoom;
  },

  (count, rooms) => {
    // TARTARUS
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
      monByName('horned woman'), monByName('shoggoth'),
      // pierce, slash, crush, burn, poison, curse
      new MonsterType ({
          name: 'starving cannibal',
          attack: [1,0,3,0,0,0,],
          defense: [0,0,0,0,0,0,],
          hitpoints: 20,
          level: 3,
          info: 'He wails about his reasons for having devoured the dead and tries to claw at your eyes when you come in.',
      }),
      new MonsterType ({
          name: 'cyclops',
          attack: [2,0,6,0,0,0,],
          defense: [0,0,0,0,0,0,],
          hitpoints: 20,
          level: 3,
          info: 'A emaciated human-sized creature whose face twists in toward a single miniscule blue eye as if the rest of its features were being sucked into a drain.',
      }),
      new MonsterType ({
          name: 'sarcophagus',
          attack: [0,0,0,0,1,0,],
          defense: [7,12,12,5,5,5,],
          hitpoints: 10,
          level: 3,
          info: 'It\'s carved with the image of a jackal-faced woman and emanates a weird miasmic fume. You almost think you can hear something inside.',
          onDeath: 'It crumbles apart into rubble releasing a sweat-drenched king.',
          deathEvent: () => {
            game.player.room.monsters.push(new Monster (
              game.player.room,
              new MonsterType ({
                  name: 'sweat-drenched king',
                  attack: [0,3,4,0,0,0,],
                  defense: [0,0,0,0,0,0,],
                  hitpoints: 20,
                  level: 3,
                  info: 'A naked old man soaked in his own sweat and trying to beat you with a broken slab of stone.',
              }),
            ))
          }
      }),
    ];

    var usedItems = [];
    var segmentItems = [
      itemByName('bleeding mushroom'), itemByName('golem\'s blood'),
      // pierce, slash, crush, burn, poison, curse
      new ItemType (
          'laughing key', 'shield',
          [1,1,1,1,1,1],
          32,
          'Your laughing key sighs and is silent, then rusts away to dust.',
          'It\'s laughing because it doesn\'t unlock anything.'
      ),
      new ItemType (
          'molar', 'weapon',
          [0,0,0,0,0,0],
          1,
          'The molar breaks.',
          'A human molar tooth.'
      ),
    ];

    segmentRooms.push(new Room ([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 5));

    segmentRooms.forEach((room, index) => {
        var middle = segmentRooms[segmentRooms.length - 1];

        if (index !== segmentRooms.length - 1) {
            room.monsters = [
              new Monster (room, pick(segmentMonsters)),
            ];
            room.items = [
              new Item (pick(segmentItems)),
            ];
            room.doors[1] = middle.doors[index];
            if (room.doors[1].color === room.doors[0].color) {
              room.doors[1].color = pickUnique(doorColors, [room.doors[0].color])
            }
            room.doors[1].to = middle;
            room.doors[1].from = room;
            room.type = 'black iron cell, with the rumbling of deep tremors audible from outside';
            middle.doors[index].from = room;
        }

        middle.type = 'towering vault that seems to extend upward into eternity with small candle-lit enclaves spiraling around its inside all the way up. Its height makes you think you must be in the center of the earth';
        middle.items = [];
        middle.monsters = [
          new Monster (
            middle,
            new MonsterType ({
              name: 'hekatonkheires',
              attack: [0,0,20,0,0,0,],
              defense: [6,6,6,6,6,6,],
              hitpoints: 20,
              level: 3,
              info: 'A hundred-handed fifty-headed giant that sprang from the womb of the still-molten earth long before the days of mankind. His wailing mouths squirm against each other straining their necks to reach the air and his hands beat the earth around him. He is the last of his kind.',
            }),
          )
        ]
    })
  },
]


// ?
// new MonsterType ({
//     name: 'glass man',
//     attack: [8,2,0,0,0,0,],
//     defense: [12,0,12,12,12,12,],
//     hitpoints: 20,
//     level: 3,
//     info: 'A thing in the shape of a man, made of white glass, approaching you.',
// }),
//
// new MonsterType ({
//     name: 'laughing woman',
//     attack: [8,2,0,0,0,0,],
//     defense: [12,0,12,12,12,12,],
//     hitpoints: 20,
//     level: 3,
//     info: 'A happy woman walking an seven foot legs like a colossal spider\'s, whose heart is beating with such force and size that you can see it straining against her ribs.',

//
// new MonsterType ({
//     name: 'murderer\'s courage',
//     attack: [8,0,0,0,0,0,],
//     defense: [6,12,12,1,1,1,],
//     hitpoints: 20,
//     level: 3,
//     info: 'A ghost who wanders the earth to seize the hearts of those considering murder and provoke them.',

// pierce, slash, crush, burn, poison, curse
