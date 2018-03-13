var buildSegments = (count, rooms) => {
  var number = 1;
  var choices = [];
  var choice;
  var i;
  for (i = 0; i < number; i++) {
    if (segments.length < number) {
      console.log('Not enough segments.');
      number = segments.length - 1;
    };
    choice = Math.floor(Math.random() * segments.length);
    while (choices.includes(choice)) {
      choice = Math.floor(Math.random() * segments.length);
    }
    choices.push(choice);
  }
  choices.map((index) => {
    segments[index](count, rooms);
  });
};

var segments = [
  /*

  *      SEWAGE MAIN      *

  */
  (count, rooms) => {
    var segmentRooms = [];
    var otherRoom;

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
          name: 'blobby amphibious creature',
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

  /*

  *      TARTARUS      *

  */
  (count, rooms) => {
    var segmentRooms = [];
    var otherRoom;

    var segmentMonsters = [
      monByName('shoggoth'),
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
      itemByName('bleeding mushroom'),
      itemByName('jar of salt'),
      itemByName('bag of devil\'s gold'),
      itemByName('canned ghost'),
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

  /*

  *      LICH'S GROTTO      *

  */
  (count, rooms) => {
    var segmentRooms = [];
    var otherRoom;

    var slitheringLeg = new MonsterType ({
        name: 'slithering leg',
        attack: [0,1,1,0,0,0,],
        defense: [12,0,0,12,12,0,],
        hitpoints: 20,
        info: 'A single fleshy leg that wriggles around the grotto like a snake.',
        deathEvent: function () {
          this.room.items.push(
            new Item (
              Math.floor(Math.random() * 2) ?
              new ItemType (
                  'lich\'s toe', 'shield',
                  [0,12,0,0,0,0],
                  '20',
                  'The lich\'s toe crumbles and becomes rotten-smelling ash.',
                  'A fleshy toe that\'s been cursed with dark magic. Protects from all slash damage.'
              ) : new ItemType (
                  'lich\'s ankle', 'shield',
                  [12,0,0,0,0,0],
                  '20',
                  'The lich\'s ankle crumbles and becomes rotten-smelling ash.',
                  'A fleshy ankle that\'s been cursed with dark magic. Protects from all pierce damage.'
              )
            ),
          );
        }
    });

    var writhingArm = new MonsterType ({
        name: 'writhing arm',
        attack: [0,1,1,0,0,0,],
        defense: [12,0,0,12,12,0,],
        hitpoints: 20,
        info: 'A wrinkly withered arm that flaps around by the elbow trying to claw at things.',
        deathEvent: function () {
          this.room.items.push(
            new Item (
              Math.floor(Math.random() * 2) ?
              new ItemType (
                  'lich\'s finger', 'shield',
                  [0,0,12,0,0,0],
                  '20',
                  'The lich\'s finger crumbles and becomes rotten-smelling ash.',
                  'A fleshy forefinger that\'s been cursed with dark magic. Protects from all crush damage.'
              ) : new ItemType (
                  'lich\'s thumb', 'shield',
                  [0,0,0,12,0,0],
                  '20',
                  'The lich\'s thumb crumbles and becomes rotten-smelling ash.',
                  'A fleshy thumb that\'s been cursed with dark magic. Protects from all burn damage.'
              )
            ),
          );
        }
    });

    var bitingHead = new MonsterType ({
        name: 'biting head',
        attack: [2,0,1,0,0,0,],
        defense: [12,0,0,12,12,0,],
        hitpoints: 20,
        info: 'A wrinkly withered arm that flaps around by the elbow trying to claw at things.',
        deathEvent: function () {
          this.room.items.push(
            new Item (
              Math.floor(Math.random() * 2) ?
              new ItemType (
                  'lich\'s thumb', 'shield',
                  [0,0,12,0,0,0],
                  '20',
                  'The lich\'s thumb crumbles and becomes rotten-smelling ash.',
                  'A fleshy thumb that\'s been cursed with dark magic. Protects from all crush damage.'
              ) : new ItemType (
                  'lich\'s finger', 'shield',
                  [0,0,0,12,0,0],
                  '20',
                  'The lich\'s finger crumbles and becomes rotten-smelling ash.',
                  'A fleshy finger that\'s been cursed with dark magic. Protects from all burn damage.'
              )
            ),
          );
        }
    });

    segmentRooms.push(new Room ([], 1));
    segmentRooms.push(new Room ([], 3));
    segmentRooms[0].type = 'lich\'s grotto';
    segmentRooms[1].type = 'room with a huge mosaic in Byzantine style, depicting a victorious queen enthroned before her family and subjects, a rack of skulls behind her';
    segmentRooms[1].doors[1].to = segmentRooms[0];
    segmentRooms[0].doors[0] = segmentRooms[1].doors[1];

    segmentRooms[1].monsters = [];
    segmentRooms[0].items = [];
    segmentRooms[0].monsters = [
    new Monster (
        segmentRooms[0],
        new MonsterType ({
            name: 'lich',
            attack: [0,2,0,0,1,5],
            defense: [12,1,3,12,12,6],
            hitpoints: 20,
            level: 3,
            info: 'A bleach-white skeleton crowned in platinum and dressed in rich violet robes. It sways on its feet as if it\'s disoriented.',
            onDeath: 'It breaks into pieces.',
            deathEvent: () => {
              segmentRooms[0].monsters.push(
                new Monster (
                  segmentRooms[0],
                  new MonsterType ({
                      name: 'grasping top-half',
                      attack: [0,2,4,0,0,0,],
                      defense: [12,0,0,12,12,0,],
                      hitpoints: 20,
                      info: 'The skeletal top half of a clambering skeleton, mouthing voicelessly as clammy skin emerges from its eye sockets and starts clinging to its face.',
                      onDeath: 'It breaks into pieces.',
                      deathEvent: () => {
                        segmentRooms[0].monsters.push(
                          new Monster (
                            segmentRooms[0],
                            new MonsterType ({
                                name: 'biting head',
                                attack: [0,2,2,0,0,0,],
                                defense: [12,0,0,12,12,0,],
                                hitpoints: 20,
                                info: 'A severed head with dry white hair springing from its scalp irregularly. Its bright green eyes sit in sunken sockets and it moves its mouth in a silent scream while rolling and biting.',
                                deathEvent: () => {
                                  segmentRooms[0].items.push(
                                    new Item (
                                      Math.floor(Math.random() * 2) ?
                                      new ItemType (
                                          'lich\'s ear', 'shield',
                                          [0,0,0,0,12,0],
                                          '20',
                                          'The lich\'s ear crumbles and becomes rotten-smelling ash.',
                                          'A pale white ear that\'s been cursed with dark magic. Protects from all poison damage.'
                                      ) : new ItemType (
                                          'lich\'s nose', 'shield',
                                          [0,0,0,0,0,12],
                                          '20',
                                          'The lich\'s nose crumbles and becomes rotten-smelling ash.',
                                          'A rotting nose that\'s been cursed with dark magic. Protects from all curse damage.'
                                      )
                                    ),
                                    new Item (
                                      new ItemType (
                                          'lich\'s eye', 'weapon',
                                          [0,0,0,0,10,0],
                                          '9',
                                          'The lich\'s eye rots away to sludge in the same manner any living thing would with time.',
                                          'A green eye with the power to kill those it looks upon.'
                                      )
                                    )
                                  );
                                }
                            }),
                          ),
                          new Monster (
                            segmentRooms[0],
                            writhingArm
                          ),
                          new Monster (
                            segmentRooms[0],
                            writhingArm
                          ),
                        );
                        segmentRooms[0].items.push(
                          new Item (
                            new ItemType (
                                'inert torso', 'shield',
                                [0,0,0,0,0,0],
                                '50',
                                'The lich\'s torso rots away to sludge.',
                                'The torso of an aged woman with no appendages. It lies inert and bloodless but you can still see its heart beating.'
                            ),
                          )
                        )
                      }
                  }),
                ),
                new Monster (
                  segmentRooms[0],
                  new MonsterType ({
                      name: 'kicking pelvis and legs',
                      attack: [0,3,2,0,0,0,],
                      defense: [12,0,0,12,12,0,],
                      hitpoints: 20,
                      info: 'A pelvic bone shrouded in purple tatters, kicking wildly with its bony legs and propelling itself around the room. Sinews of muscle are starting to form around its thighs',
                      onDeath: 'It breaks into pieces.',
                      deathEvent: () => {
                        segmentRooms[0].monsters.push(
                          new Monster (
                            segmentRooms[0],
                            slitheringLeg
                          ),
                          new Monster (
                            segmentRooms[0],
                            slitheringLeg
                          ),
                        )
                      }
                  }),
                ),
              )
            }
        }),
      )
    ];

  },

  /*

  *      UNICORN      *

  */
  (count, rooms) => {
    var segmentRooms = [];
    var otherRoom;

    segmentRooms.push(new Room ([], 4));

    segmentRooms[0].type += ' that smells like a barn';
    segmentRooms[0].items = [];
    segmentRooms[0].monsters = [
    new Monster (
        segmentRooms[0],
        new MonsterType ({
            // pierce, slash, crush, burn, poison, curse
            name: 'unicorn',
            attack: [11,0,0,0,0,1],
            defense: [3,3,0,12,12,12],
            hitpoints: 20,
            level: 3,
            info: 'A grey horse the size of a moose with a twisting horn coming out of its nose like a narwhal\'s. It prepares to charge and try to gore you.',
            onDeath: 'The unicorn collapses and dies.',
            deathEvent: () => {
              segmentRooms[0].items.push(
                new Item (
                  new ItemType (
                      'horn', 'weapon',
                      [11,0,0,0,0,1],
                      33,
                      'The unicorn horn you\'ve been using as a weapon splinters and breaks.',
                      'A twisting horn.'
                  ),
                )
              )
            }
        }),
      )
    ];
  },

  /*

  *      DOOR MUMBLER      *

  */
  (count, rooms) => {
    var segmentRooms = [];
    var otherRoom;

    segmentRooms.push(new Room ([], 3));

    segmentRooms[0].items = [];
    segmentRooms[0].monsters = [
    new Monster (
        segmentRooms[0],
        new MonsterType ({
            // pierce, slash, crush, burn, poison, curse
            name: 'door mumbler',
            attack: [0,2,8,1,0,0],
            defense: [8,4,8,1,3,8],
            hitpoints: 20,
            level: 3,
            info: 'A seller and manufacturer of very strange trick doors, dressed in comfortable looking olive coveralls.',
            onDeath: 'The door mumbler is killed.',
        }),
      )
    ];

    segmentRooms[0].monsters[0].fightEvent = function () {
      var destinationDoor;
      this.room.doors.push(
        new Door (
          doorMumbler.mumbleDoor(),
          this.room,
          pick(allDoors.filter((door) => {
            return door.to !== true;
          })).to
        )
      );
      drawString('The door mumbler lets out a wild yelp like a mule and is gone in a pillar of acrid black grease-smoke, a misshapen door in her place');
      this.hitpoints += 1;
      this.room.monsters = this.room.monsters.filter((mon) => {
        return mon.name !== 'door mumbler';
      });
      destinationDoor = pick(this.room.doors.filter((door) => {
        return (door.to && door.to !== true);
      }));
      if (this.room.id === destinationDoor.to.id) {
        destinationDoor.from.monsters.push(this);
        this.room = destinationDoor.from;
      } else {
        destinationDoor.to.monsters.push(this);
        this.room = destinationDoor.to;
      }
    }.bind(segmentRooms[0].monsters[0])
  },

  /*

  *      LABORATORY      *

  */
  (count, rooms) => {
    console.log('$')
    var segmentRooms = [];
    var otherRoom;

    segmentRooms.push(new Room ([], 3));

    segmentRooms[0].items = [
      new ItemType (
          'uncurser', 'weapon',
          [0,0,3,0,0,0],
          14,
          '',
          'A disk made of a matte black metal whose internal weight seems to shift fluidly in your hands.',
          null,
          player => {
              clearType();
              drawString('You put your hand through the hole at the middle of the uncurser and it injects you with something. You\'re innoculated against all curses and syphilis now, and your right eye starts going lazy.');
              player.stats.defense[5] = 12;
          }
      ),
    ];
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
