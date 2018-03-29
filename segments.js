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
    var segmentRooms = [];
    var otherRoom;

    var segmentMonsters = [
      monByName('shoggoth'),
      monByName('weaghrai'),
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
                                      new ItemType (
                                          'lich\'s eye', 'weapon',
                                          [0,0,0,0,10,0],
                                          '9',
                                          'The lich\'s eye rots away to sludge in the same manner any living thing would with time.',
                                          'A green eye with the power to kill those it looks upon.'
                                      ),
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
                  ), segmentRooms[0]
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
          'An old bronze compass with three wildly spinning hands. It can unfix your position in space, making you nearly impossible to hit with piercing and slashing attacks.',
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

      let crow = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'crow',
          attack: [1,3,0,0,0,0,],
          defense: [12,0,0,0,0,0,],
          hitpoints: 20,
          level: 1,
          info: 'A glossy black-feathered carrion crow.',
      })

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

      let shapeshifter = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'shapeshifter',
          attack: [0,0,0,0,0,0,],
          defense: [12,12,12,12,12,12,],
          hitpoints: 20,
          level: 3,
          info: 'A wizard who\'s spent years studying the art of shapeshifting, as signified by the necklace he wears made from the teeth of a thousand unique beasts. The proportions of his body are somewhat irregular, as if he\'s started to lose track of his original shape.',
          onDeath: 'The shapeshifter returns to its human form and falls to its knees before writhing tentacles tear their way out from the inside of its skull and are consumed in white fire. It\'s dead.',
          fightEvent: function () {
              let targetType = pick(allMonsterTypes)
              this.name = targetType.name
              this.attack = targetType.attack
              this.defense = targetType.defense
              this.defense = targetType.defense
              this.info = targetType.info
              drawString(`With a noise like a colossal bullfrog\'s croak the shapeshifter becomes a ${pickUnique(allMonsterTypes, [targetType]).name}, a ${pickUnique(allMonsterTypes, [targetType]).name}, then a ${targetType.name}`)
          }
      })

      let arcaneMerchant = Object.assign({}, monByName('weaghrai'))
      arcaneMerchant.name = 'arcane merchant'
      arcaneMerchant.info = 'A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. The cat\'s eye on his necklace marks him as a worshipper of the night god Tezcatlipoca.'
      arcaneMerchant.defense[5] = 10
      arcaneMerchant.defense[2] = 10
      arcaneMerchant.onInstantiate = function () {
          this.data.arsenal = [
              itemByName('sacred tomohawk'),
              itemByName('ghostcandle'),
              new ItemType (
                  'lich\'s eye', 'weapon',
                  [0,0,0,0,10,0],
                  '9',
                  'The lich\'s eye rots away to sludge in the same manner any living thing would with time.',
                  'A green eye with the power to kill those it looks upon.'
              ),
              new ItemType (
                  'Byzantine murder ring', 'weapon',
                  [0,13,0,0,0,0],
                  '7',
                  'The murder ring shrinks suddenly, slicing off your finger from your hand before diminishing out of sight with a stench like methane. It\'s gone.',
                  'A bronze ring embedded with a mosaic of brightly colored near-microscopic stones. Imbued by the holy men of ancient Constantinople with the power to summon throat-cutting demons against one\'s enemies.'
              ),
              new ItemType (
                  'cosmic ball', 'weapon',
                  [0,0,10,0,0,0],
                  '12',
                  'The cosmic ball seems to reaccrue its natural weightiness all at once. It plummets through the floor, vanishing into the earth.',
                  'An impossibly dense sphere made of a mattle black substance that absorbs all light. Despite its great mass, it\'s as easy to hold and throw as a much lighter ball would be.'
              ),
              new ItemType (
                  'djinn\'s sword', 'weapon',
                  [0,5,0,7,0,0],
                  '13',
                  'The djinn\'s sword becomes fire in your hands, returning to the plane of its creator.',
                  'The curved blazing blade of a fire-born djinn, given to one of Saladin\'s lietenants to help defend Jerusalem against the western Crusaders.'
              ),
              new ItemType (
                  'spidersilk sling', 'weapon',
                  [7,0,7,0,0,0],
                  '11',
                  'The spidersilk sling is worn out after centuries of use and dissipates.',
                  'A throwing sling woven by the Norse craftsmen of Greenland and the native people of Canada working in concert, later used in the war between the two.'
              ),
          ];
          this.data.notify = function () {
              drawString(`The merchant withdraws a ${this.data.weapon.name} from the folds of his velvety black coat.`);
              this.info = `A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. He's armed with a ${this.data.weapon.name}.`;
          }.bind(this)
      }

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

      let paranoidSummoner = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'paranoid summoner',
          attack: [0,0,0,0,2,8,],
          defense: [0,5,8,0,8,7,],
          hitpoints: 20,
          level: 1,
          info: 'A middle-aged woman in black whose eyes dart from corner to corner of the room she\'s in. She seems to have come here to hide from something dangerous.',
          fightEvent: function () {
              var escapeRoom;
              var escapeDoor;
              while (!escapeRoom) {
                  escapeDoor = pick(this.room.doors)
                  escapeRoom = escapeDoor.from === this.room ? escapeDoor.to : escapeDoor.from;
              }
              this.room.monsters = this.room.monsters.filter(mon => {
                  return mon !== this
              })
              escapeRoom.monsters.push(this)
              this.room = escapeRoom
              drawString('The paranoid summoner escapes.')
          },
          deathEvent: function () {
              drawString('The fabric of space seems to stretch into a claw that rips open the torso of the paranoid summoner releasing a murder of crows and killing her. The crows fly out of the room and the rift remains open.')
              let rift = new Door ('demoniac rift', this.room)
              let dungeon = new Room ([rift], 0)
              rift.to = dungeon
              this.room.doors.push(rift)
              this.room.monsters.push(new Monster (this.room, crow), new Monster (this.room, crow), new Monster (this.room, crow))
              dungeon.mana *= 12;

              dungeon.type = 'infernal dungeon'
              dungeon.items = []
              dungeon.monsters = [new Monster (
                  dungeon,
                  new MonsterType ({
                      name: 'divine malfeasance',
                      attack: [dice(9),dice(9),dice(9),dice(9),dice(9),dice(9),],
                      defense: [dice(12),dice(12),dice(12),dice(12),dice(12),dice(12),],
                      hitpoints: 20,
                      level: 3,
                      info: 'A thing whose form seems to be made up of the shrieking sound of metal grinding on metal.',
                  }),
              )]
          }
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
          setOfDice,
      ]
      let monsterTypes = [
          monByName('witch'),
          monByName('vampire'),
          monByName('shrieking dog'),
          monByName('horned woman'),
          monByName('weaghrai'),
          paranoidSummoner,
          crow,
          shapeshifter,
          desperateGrifter,
          sorcerousGambler,
          arcaneMerchant,
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
                  this.info = 'An enormous jet-black jaguar with razor claws and phosphorous eyes.'
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

      let wildgod = new MonsterType ({
          // pierce, slash, crush, burn, poison, curse
          name: 'wildgod',
          attack: [0,0,0,0,0,0,],
          defense: [10,10,10,10,10,10,],
          hitpoints: 20,
          level: 1,
          info: 'A lesser god of the forests and wilds. Takes the shape of a fanged and cleft-headed human with a black stripe running horizontally across her eyes.',
          fightEvent: function () {
              let monsterTypes = [
                  monByName('dragon'),
                  monByName('rattlesnake'),
                  monByName('angry triceratops'),
                  monByName('riverwolf'),
                  monByName('weaselcat'),
                  new MonsterType ({
                      name: 'pit viper',
                      attack: [1,0,0,0,4,0,],
                      defense: [6,0,0,0,0,0,],
                      hitpoints: 20,
                      level: 1,
                      info: 'A venomous black viper.',
                  }),
                  new MonsterType ({
                      name: 'boa constrictor',
                      attack: [0,0,9,0,0,0,],
                      defense: [7,0,5,0,3,0,],
                      hitpoints: 20,
                      level: 1,
                      info: 'A massive green serpent that crushes its prey to death in its muscular coils.',
                  }),
                  new MonsterType ({
                      name: 'wild boar',
                      attack: [2,0,5,0,0,0,],
                      defense: [0,5,10,0,0,0,],
                      hitpoints: 20,
                      level: 2,
                      info: 'A black-haired boar with freshly bloodied white tusks.',
                  }),
                  new MonsterType ({
                      name: 'hawk',
                      attack: [1,4,0,0,0,0,],
                      defense: [12,0,0,0,0,0,],
                      hitpoints: 20,
                      level: 1,
                      info: 'A fierce brownfeathered bird of prey.',
                  }),
                  new MonsterType ({
                      name: 'puma',
                      attack: [3,6,1,0,0,0,],
                      defense: [6,1,6,0,0,0,],
                      hitpoints: 20,
                      level: 1,
                      info: 'A night-black wildcat.',
                  }),
              ]
              let monsterType = pick(monsterTypes)
              this.room.monsters.push(new Monster (this.room, monsterType))
              drawString(`With a cry like a waterfall the wildgod summons a ${monsterType.name}.`)
          },
          onInstantiate: function () {
              this.defense[dice(6) - 1] = 3;
          }
      })

      let hub = new Room ([], dice(3) + dice(2) + dice(2))
      let types = [
          'xibalba',
      ]
      let itemTypes = [
          itemByName('life-giving herb'),
          itemByName('firebomb'),
          itemByName('sacred tomohawk'),
          itemByName('atalatl'),
          itemByName('sledgehammer'),
          itemByName('blowgun'),
          itemByName('torch'),
          itemByName('laughing mask'),
          itemByName('ghostcandle'),
      ]
      let monsterTypes = [
          monByName('skullhead'),
          monByName('skullhead'),
          monByName('rain ghost'),
          nagual,
          colossalStoneHead,
          wildgod,
      ]
      segmentRooms.push(hub)
      hub.type = 'grim under-realm'
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
