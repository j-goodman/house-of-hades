

var buildSegments = (count, rooms) => {
  var number = 2;
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

    console.log('sewage')

    var segmentMonsters = [
      monByName('ghoul'), monByName('riverwolf'),
      extras['waterlogged grasper'],
      extras['blobby amphibious creature'],
    ];

    var usedItems = [];
    var segmentItems = [
      itemByName('cursed pistol'), itemByName('evil eye'), itemByName('posessed bible'), itemByName('life-giving herb'), itemByName('crowbar'),
      // pierce, slash, crush, burn, poison, curse
      extras['black stone idol'],
      extras['razor-sharp bone'],
    ];

    segmentRooms.push(new Room ([], 3));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
    segmentRooms.push(new Room([], 2));
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
          new Item (pickUnique(segmentItems, usedItems), room),
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
    console.log('tartarus')
    var segmentRooms = [];
    var otherRoom;

    var segmentMonsters = [
      monByName('shoggoth'),
      monByName('weaghrai'),
      // pierce, slash, crush, burn, poison, curse
      extras['starving cannibal'],
      extras['cyclops'],
      extras['sarcophagus'],
    ];

    var usedItems = [];
    var segmentItems = [
      itemByName('bleeding mushroom'),
      itemByName('jar of salt'),
      itemByName('bag of devil\'s gold'),
      itemByName('canned ghost'),
      // pierce, slash, crush, burn, poison, curse
      extras['laughing key'],
      extras['molar'],
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
              new Item (pick(segmentItems), room),
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
                extras['hekatonkheires'],
            )
        ]
    })

    segmentRooms.map(room => {
        room.doors.map(door => {
            door.locked = true
        })
    })
  },

  /*

  *      LICH'S GROTTO      *

  */
  (count, rooms) => {
    console.log('bones')
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
              ), this.room
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
              ), this.room
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
              ), this.room
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
                                      ), segmentRooms[0]
                                    ),
                                    new Item (
                                      extras['lich\'s eye'],
                                      segmentRooms[0]
                                    ),
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
                                'The torso of a aged woman with no appendages. It lies inert and bloodless but you can still see its heart beating.'
                            ), segmentRooms[0]
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

    segmentRooms.map(room => {
        room.doors.map(door => {
            door.locked = false;
        })
    })

  },

  /*

  *      UNICORN AND THE DEVIL      *

  */
  (count, rooms) => {
    console.log('horns')
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
                      ), segmentRooms[0]
                    )
                  )
                }
            }),
        )
    ]

    segmentRooms.push(new Room ([], 3));

    segmentRooms[1].type += ' that smells like sulfur';
    segmentRooms[1].items = [];
    segmentRooms[1].monsters = [
    new Monster (
        segmentRooms[1],
        new MonsterType ({
            // pierce, slash, crush, burn, poison, curse
            name: 'devil',
            attack: [3,0,0,7,5,2],
            defense: [11,2,5,11,11,0],
            hitpoints: 29,
            level: 3,
            info: 'It\'s the devil, bright red and with a three-pronged hayfork in his hands.',
            onDeath: 'You killed the devil.',
            drop: [
                new Item (itemByName('bag of devil\'s gold'), this.room),
                new Item (
                    new ItemType (
                      'devil\'s fork', 'weapon',
                      [3,0,0,7,5,2],
                      13,
                      'The devil\'s fork turns into smoke.',
                      'A three-pronged hayfork.'
                    ),
                    this.room
                ),
                new Item (pick(allItemTypes), this.room),
                new Item (
                    new ItemType (
                      'angel\'s armor', 'shield',
                      [2,2,3,0,8,8],
                      9,
                      'Your angel\'s armor turns into sunlight and vanishes.',
                      'Armor forged by the almighty himself to protect his most loyal representatives.'
                    ),
                    this.room
                ),
            ],
            fightEvent: function () {
                let stolen = false
                if (game.player.weapon && (oneIn(2) || !game.player.shield)) {
                    stolen = game.player.weapon
                    game.player.weapon = null
                } else if (game.player.shield) {
                    stolen = game.player.shield
                    game.player.shield = null
                }
                if (stolen) {
                  this.drop.push(stolen)
                  drawString(`The devil thiefs your ${stolen.name}.`)
                }
                this.room.monsters = this.room.monsters.filter( mon => { return mon !== this } )
                let door = pick(allDoors.filter( door => { return door.to || door.from } ))
                if (door.from) {
                    this.room = door.from
                } else {
                    this.room = door.to
                }
                this.room.monsters.push(this)
                drawString('The devil cracks his hoof on the floor and vanishes in a swirl of hellfire.')
                if (this.room.monsters.length === 0) {
                    this.room.doors.map(door => { door.locked = false })
                }
            }
        }),
      )
    ];
  },

  /*

  *      DOOR MUMBLER      *

  */
  (count, rooms) => {
    console.log('doors')
    var segmentRooms = [];
    var otherRoom;

    segmentRooms.push(new Room ([], 3));
    segmentRooms.push(new Room ([], 2));

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

    segmentRooms[1].type = 'distorted room'
    if (dice(2) - 1) {
      segmentRooms[1].monsters = [
        new Monster(
          segmentRooms[1],
          extras['paranoid summoner'],
        )
      ]
    }

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

  *      CURSE DEN      *

  */
  (count, rooms) => {
      console.log('curse')
      var segmentRooms = []
      var otherRoom

      let cursedRevolver = new ItemType (
          'cursed revolver', 'weapon',
          [dice(6),0,0,0,0,dice(12)],
          9,
          'The protean cursed revolver finally spins out of control and curls tightly into a laughing ball before exploding into a thick black cloud of spores.',
          'A Nambu 26 Revolver with a acrid black lichen growing out from its barrel that wails with laughter when it\'s fired.',
          null,
          function () {
              this.bonus = [dice(4),0,0,0,0,dice(4)]
              game.player.updateStats()
              this.bonus[dice(6) - 1] += dice(10)
              drawString('Your cursed revolver spins wildly and pulls against you like a gyroscope as its shape seems to change completely before returning to being itself')
          }
      )

      let wildCompass = new ItemType (
          'wild compass', 'shield',
          [12,6,0,0,0,0],
          8,
          'Your wild compass seems to become the size of a olive pit, then the size of a horse, then it\'s gone.',
          'A old bronze compass with three wildly spinning hands. It can unfix your position in space, making you nearly impossible to hit with piercing and slashing attacks.',
      )

      let bonehardener = new ItemType (
          'bonehardener', 'shield',
          [0,3,9,0,1,2],
          8,
          'You\'ve run out of bonehardener.',
          'A vibrantly green medallion with silver roots that weave out of it and into the skin of the person holding it and fossilize their bones into a heavy metallic substance.',
      )

      let whiskey = new ItemType (
          'bottle of whiskey', 'weapon',
          [0,3,0,1,1,0],
          1,
          'The bottle of whiskey is shattered.',
          'A bottle of inexpensive barrel-aged Kentucky bourbon.',
      )

      let molotovCocktail = new ItemType (
          'molotov cocktail', 'weapon',
          [0,2,0,10,0,0],
          1,
          'The smoke from the molotov cocktail clears leaving a dark crater.',
          'A crude homemade firebomb. Only good for one use, but should deal poweful burn damage.'
      )


      let chestOfDevilsGold = new ItemType (
          'chest of devil\'s gold', 'shield',
          [6,6,0,8,0,0],
          8,
          'You\'re out of devil\'s gold.',
          'It\'s a black metal chest filled to the top with infernal gold. Someone must have really outwitted the devil or given him something of great value to get all this gold, but there\'s no one here to claim it now. Use it to bribe fire and sharp objects out of hurting you.'
      )

      let setOfDice = new ItemType (
          'set of dice', 'weapon',
          [0,0,1,0,0,2],
          40,
          'You lose track of the dice.',
          'A pair of black dice with white pips.',
          null,
          function () {
              drawString(`You roll a ${dice(6) + dice(6)}.`)
          }
      )

      let gin = new ItemType (
          'bottle of gin', 'weapon',
          [0,3,0,1,1,0],
          1,
          'The bottle of gin is shattered.',
          'A bottle of English juniper liquor.',
      )

      let desperateGrifter = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'desperate grifter',
          attack: [6,0,0,1,0,0,],
          defense: [4,4,0,0,12,12,],
          hitpoints: 20,
          level: 1,
          info: 'A well-dressed wild-eyed con artist whose curiosity about the ways of magic has gotten him in over his head in debt to dark powers. Armed with a revolver.',
          drop: [
              new Item (itemByName('revolver'), this.room),
              new Item (itemByName('bag of devil\'s gold'), this.room),
              new Item (pick(allItemTypes), this.room),
          ]
      })

      let sorcerousGambler = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'sorcerous gambler',
          attack: [0,0,3,0,0,1,],
          defense: [3,5,4,0,4,8,],
          hitpoints: 20,
          level: 3,
          info: 'A practitioner of the magical arts whose gambling has started to spiral out of control. Dressed to fit in at the finest underground casinos and notoriously unpredictable in combat.',
          fightEvent: function () {
              this.attack = [0,0,0,0,0,0]
              this.attack[dice(6) - 1] += dice(9)
              this.attack[dice(6) - 1] += dice(5)
              this.defense = [dice(9), dice(9), dice(9), dice(9), dice(9), dice(9)]
          },
          drop: [
              new Item (pick(allItemTypes), this.room),
          ]
      })

      let hub = new Room ([], dice(3) + dice(2) + dice(2))
      let types = [
          'damp-smelling old room with heavy patterned velvet curtains on the walls and a moth-eaten Persian rug on the floor',
          'hallway that looks as if it stretches out into infinity but can be crossed in half a minute',
          'ornate sitting room whose furniture has all been upturned and made into barricades',
          'room with a overhead fan turning on the ceiling and some card tables set up below with empty glasses and dice on them',
          'alternatingly pitch-dark and vividly well lit room',
          'room with a ornate cigarette-smoke stained fresco painting on its ceiling of two copulating angels',
          'sphere',
          'library with long-empty shelves',
          'cluttered office',
          'planetarium room',
          'room with vast curving runes traced into its red sand floor',
          'room with vast curving runes traced into its white sand floor',
          'room with vast curving runes traced into its black sand floor',
      ]
      let itemTypes = [
          itemByName('revolver'),
          itemByName('evil eye'),
          itemByName('wand of oceans'),
          itemByName('bag of devil\'s gold'),
          itemByName('life-giving herb'),
          itemByName('thompson gun'),
          cursedRevolver,
          wildCompass,
          bonehardener,
          chestOfDevilsGold,
          gin,
          whiskey,
          molotovCocktail,
          setOfDice,
      ]
      let monsterTypes = [
          monByName('witch'),
          monByName('vampire'),
          monByName('shrieking dog'),
          monByName('horned woman'),
          monByName('weaghrai'),
          extras['paranoid summoner'],
          extras['crow'],
          extras['shapeshifter'],
          extras['shapeshifter'],
          desperateGrifter,
          sorcerousGambler,
          extras['arcane merchant'],
      ]
      segmentRooms.push(hub)
      hub.type = 'black market and gambling den for wizards and other magical types'
      hub.items = [new Item (pick(itemTypes), hub)]
      hub.monsters = [new Monster(hub, pick(monsterTypes))]

      window.teleport = hub

      hub.doors.map(door => {
          let room = new Room ([], dice(2))
          let secondRoom;
          room.type = pick(types)
          room.items = [new Item (pick(itemTypes), room), new Item (pick(itemTypes), room), new Item (pick(itemTypes), room)]
          room.monsters = [new Monster(room, pick(monsterTypes)), new Monster(room, pick(monsterTypes))]
          room.doors[0] = door
          door.from = room
          door.to = hub
      })
  },

  /*

  *      XIBALBA      *

  */
  (count, rooms) => {
      console.log('xibalba')
      var segmentRooms = []
      var otherRoom

      let nagual = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'nagual',
          attack: [0,0,0,3,0,6,],
          defense: [3,10,7,0,9,12,],
          hitpoints: 20,
          level: 1,
          info: 'A sorceror in league with the gods of night, granted the power to manifest his spirit in the form of the nocturnal beast that is his totem. He\'s dressed in a slick black animal pelt.',
          fightEvent: function () {
              if (this.name === 'nagual' && oneIn(1.3)) {
                  drawString(`The night wind blows through in a gale as the nagual sheds his form and becomes a massive black jaguar with claws like obsidian razors and eyes like planets in the night sky.`)
                  this.name = 'jaguar'
                  this.attack = [6,6,5,0,0,0,]
                  this.defense = [9,5,12,5,9,3,]
                  this.info = 'A enormous jet-black jaguar with razor claws and phosphorous eyes.'
              } else if (this.name === 'jaguar' && oneIn(2)) {
                  drawString(`The night wind blows through in a gale as the jaguar\'s skin becomes a lifeless pelt and the human shape of the nagual emerges out from under it.`)
                  this.name = 'nagual'
                  this.attack = [0,0,0,3,0,7,]
                  this.defense = [0,10,7,0,9,12,]
                  this.info = 'A sorceror in league with the gods of night, granted the power to manifest his spirit in the form of the nocturnal beast that is his totem. He\'s dressed in a slick black animal pelt.'
              }
          }
      })

      let colossalStoneHead = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'colossal stone head',
          attack: [0,0,6,0,0,0,],
          defense: [12,10,8,12,12,12,],
          hitpoints: 20,
          level: 1,
          info: 'A 40 ton monumental basalt head. Its expression remains placid as it sweeps slowly into position to crush you.',
      })

      let astrologer = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'astrologer',
          attack: [0,0,3,0,0,0,],
          defense: [0,0,0,0,6,12,],
          hitpoints: 20,
          level: 1,
          info: 'A student of the night sky who has learned through observation to observe the future positions of the stars, and endeavors to apply the same methods to events on earth.',
          onDeath: `"Oh god!" the astrologer cries, "my god — why have you forsaken me?"`,
          onInstantiate: function () {
              this.room.doors.map(door => { door.locked = false })
          }
      })

      let hub = new Room ([], dice(3) + dice(2) + dice(2))
      let types = [
          'a dark underground passageway with a cold moisture hanging in the air',
          'a underground tunnel through dirt, with roots sprouting from ceiling to floor and growing branches',
          'a underground passageway lit by some luminescent fungus in the soil of its ceiling and walls',
      ]
      let itemTypes = [
          itemByName('life-giving herb'),
          itemByName('firebomb'),
          itemByName('atalatl'),
          itemByName('sledgehammer'),
          itemByName('blowgun'),
          itemByName('torch'),
          itemByName('ghostcandle'),
          new ItemType (
              'obsidian axe', 'weapon',
              [0,8,0,2,0,2],
              7,
              'Your obsidian axe explodes into smoke, dissipating through the mansion\'s walls with a cry like a speared boar dying.',
              'A one-handed obsidian axe decorated with crowsfeathers. Deals very powerful slash damage and stays silent.'
          ),
          new ItemType (
              'dragonfeather', 'shield',
              [4,0,0,0,9,4],
              13,
              'Your dragonfeather dries out and becomes dust.',
              'A gold dragonfeather, symbol of the serpent god. It\'s supposed to invoke the god\'s protection.'
          ),
      ]
      let monsterTypes = [
          monByName('skullhead'),
          monByName('rain ghost'),
          nagual,
          colossalStoneHead,
          extras['wildgod'],
          extras['wildgod'],
          extras['arcane merchant'],
          astrologer,
      ]
      segmentRooms.push(hub)
      hub.type = pick(types)
      hub.items = [new Item (pick(itemTypes), hub)]
      hub.monsters = [new Monster(hub, pick(monsterTypes))]

      window.teleport = hub

      hub.doors.map(door => {
          let room = new Room ([], dice(2))
          let secondRoom;
          room.type = pick(types)
          room.items = oneIn(2) ?
                       [new Item (pick(itemTypes), room)] :
                       [new Item (pick(itemTypes), room), new Item (pick(itemTypes), room)]
          room.monsters = oneIn(2) ?
                         [new Monster(room, pick(monsterTypes))] :
                         [new Monster(room, pick(monsterTypes)), new Monster(room, pick(monsterTypes))]
          room.doors[0] = door
          door.from = room
          door.to = hub
      })
  },


    /*

    *      CROSSROADS      *

    */
    (count, rooms) => {
        console.log('crossroads')
        var segmentRooms = []
        var otherRoom

        let hub = new Room ([], 4)
        let north = new Room ([], 2)
        let east = new Room ([], 2)
        let south = new Room ([], 2)
        let west = new Room ([], 2)
        segmentRooms.push(hub, north, east, south, west)


        hub.doors[0].to = north
        hub.doors[1].to = east
        hub.doors[2].to = south
        hub.doors[3].to = west
        north.doors[0] = hub.doors[0]
        east.doors[0] = hub.doors[1]
        south.doors[0] = hub.doors[2]
        west.doors[0] = hub.doors[3]
        north.doors[0].color = 'north'
        east.doors[0].color = 'east'
        south.doors[0].color = 'south'
        west.doors[0].color = 'west'

        hub.type = pick(['deep crossroads', 'fortified crossroads', 'distorted crossroads', 'vine-overgrown indoor crossroads', 'underground crossroads', 'crossroads over a mile-deep pit', 'ontological crossroads'])
        hub.monsters = [new Monster (
            hub,
            pick([
                extras['glass man'],
                extras['laughing woman'],
                extras['murderer\'s courage'],
                extras['arcane merchant'],
            ])
        )]
        north.type = pick(['long corridor covered in brightly polished shining steel', 'colossal machine room made up of a thousand moving parts', 'control and observation room with its walls in panels and monitors'])
        north.monsters = [
            new Monster (
                north,
                pick([
                    extras['glass man'],
                    extras['screaming mechanical searcher'],
                ])
            ),
            new Monster (
                north,
                pick([
                    extras['glass man'],
                    extras['screaming mechanical searcher'],
                ])
            ),
        ]
        east.type = pick(['arid vault that extends for hundreds of yards, with bright light and heat radiating into it through vents in the ceiling', 'vast lobby filled halfway with constantly shifting baking-hot red sand'])
        east.monsters = [
            new Monster (
                east,
                pick([
                    extras['glass man'],
                    extras['half-goat soldier'],
                    extras['sandeater'],
                    extras['shapeshifter'],
                ])
            ),
            new Monster (
                east,
                pick([
                    extras['half-goat soldier'],
                    extras['sandeater'],
                    extras['shapeshifter'],
                    extras['murderer\'s courage'],
                ])
            ),
            new Monster (
                east,
                pick([
                    extras['glass man'],
                    extras['half-goat soldier'],
                ])
            ),
        ]
        south.type = pick(['enormous sandy room containing a vast saltwater lake and whose ceiling is an impossibly huge painting of the night sky with moving stars and planets', 'room where a long stone bridge passes over an immense subterranean lake that moves as if it had tides'])
        south.monsters = [new Monster (
            south,
            pick([
                extras['kraken'],
                extras['seagod'],
            ])
        )]
        west.type = pick(['vast damp room densely infested with creeping vines and thorn-covered trees', 'massive reception hall that\'s become so overgrown with trees and vines and fungus as to now more resemble a forest'])
        west.monsters = [new Monster (
            west,
            pick([
                extras['wildgod'],
                extras['nagual'],
                extras['laughing woman'],
                extras['murderer\'s courage'],
                extras['boa constrictor'],
                monByName('wendigo'),
            ])
        )]

        segmentRooms.map(room => {
            if (room.monsters.length > 0) {
                room.doors.map(door => {
                        door.locked = true
                })
            }
        })
    },

]
