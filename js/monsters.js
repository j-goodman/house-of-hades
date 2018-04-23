var MonsterType = function (ob) {
    this.attack = ob.attack;
    this.deathEvent = ob.deathEvent;
    this.defense = ob.defense;
    this.drop = ob.drop;
    this.fightEvent = ob.fightEvent;
    this.hitpoints = ob.hitpoints;
    this.info = ob.info;
    this.level = ob.level;
    this.name = ob.name;
    this.onDeath = ob.onDeath;
    this.onInstantiate = ob.onInstantiate;
};

var Monster = function (room, type) {
    this.attack = type.attack ? type.attack.map(num => { return num }) : [];
    this.data = {};
    this.deathEvent = type.deathEvent;
    this.defense = type.defense ? type.defense.map(num => { return num }) : [];
    this.drop = type.drop ? type.drop.map(item => { return item }) : [];
    this.fightEvent = type.fightEvent ? type.fightEvent.bind(this) : false;
    this.room = room;
    this.hitpoints = type.hitpoints;
    this.info = type.info;
    this.level = type.level;
    this.name = type.name;
    this.onDeath = type.onDeath;
    this.onInstantiate = type.onInstantiate ? type.onInstantiate.bind(this) : false;
    this.id = getGlobalUniqueId()
    if (this.onInstantiate) {
        this.onInstantiate.bind(this)();
    }
};

Monster.prototype.die = function () {
    drawString(this.onDeath || 'It\'s dead.');
    if (this.deathEvent) {
      this.deathEvent();
    }
    this.room.mana += 4;
    if (this.drop) {
      this.drop.map((item) => {
        drawString(`There\'s a ${item.name} on the ground.`);
        this.room.items.push(item);
        item.room = this.room
      });
    }
    this.room.monsters = this.room.monsters.filter(mon => {
        return mon !== this
    })
    if (this.room.monsters.length === 0) {
        this.room.doors.map(door => { door.locked = false })
    }
    this.room.graveyard.push(this)
};

var monByName = (name) => {
    return allMonsterTypes.filter((type) => {
        return type.name === name;
    })[0];
}

var itemByName = (name) => {
    var item
    item = allItemTypes.filter((type) => {
        return type.name === name
    })[0];
    if (!item) {
        item = extras[name]
    }
    return item
}

// levels go from 1-3, most should be 3.
var allMonsterTypes = [
    new MonsterType ({
        name: 'dragon',
        attack: [0,6,6,12,0,1],
        defense: [12,10,9,12,3,12],
        hitpoints: 20,
        level: 3,
        info: 'It\'s a feathered serpentine animal the size of a passenger jet. Conventional attacks would be risky, and even if you could try to poison it, you\'d probably end up roasted first.',
        onDeath: 'The dragon rears its head back and shrieks to rattle the foundations of the mighty house. Dust showers down from the rafters as it collapses onto the floor dead.',
        deathEvent: () => {
            var door;
            if (game.player.room.type === 'treasure room') {
            door = new Door ('trap', game.player.room, null);
            game.player.room.doors.push(door);
            door.to = new Room ([], 13);
            door.to.type = 'amphitheater with thirteen vaulted walls'
            door.to.items.push(
                itemByName(pick(['executioner\'s sword', 'obsidian axe'])),
                itemByName(pick(['king\'s sword', 'sunfire macana'])),
                itemByName(pick(['wand of oceans', 'golem\'s blood'])),
                itemByName(pick(['bag of devil\'s gold', 'canned ghost'])),
                itemByName(pick(['lion\'s hide', 'goat\'s armor'])),
                itemByName('wizard\'s ring'),
            )
            allMonsterTypes = allMonsterTypes.filter(mon => {
                return oneIn(5)
            })
            allMonsterTypes.push(
                extras['half-goat soldier'],
                extras['half-goat soldier'],
                extras['half-goat soldier'],
                extras['half-goat soldier']
            )
            allMonsterTypes.push(extras['swordwraith'])
            allMonsterTypes.push(extras['murderer\'s courage'])
            allMonsterTypes.push(extras['shapeshifter'])
            allMonsterTypes.push(extras['nagual'])
            allMonsterTypes.push(extras['big floating eyeball'])
            door.to.doors.map((innerDoor, index) => {
              innerDoor.color = innerDoor.color === 'trap' ? 'trap' : [
                  'colossal basalt',
                  'rune-inscribed',
                  'carved ebony',
                  'giant sandstone',
                  'huge steel',
                  'tiny circular',
                  'opaque glass',
                  'tall narrow ivory',
                  'thirteen-eyed',
                  'obsidian',
                  'ornate stained glass',
                  'polished marble',
                  'solid gold',
              ][index]
            })
            door.to.mana += 100;
            door.from.mana += 50;
                drawString('');
                drawString('    | YOU WIN |    ');
                drawString('');
            }
        }
    }),
    new MonsterType ({
        name: 'giant scorpion',
        attack: [3,1,0,0,4,0],
        defense: [2,1,3,2,7,0],
        hitpoints: 20,
        level: 2,
        info: 'It\'s a scorpion the size of a dog. Careful of that poison sting.',
    }),
    new MonsterType ({
        name: 'vampire',
        attack: [6,0,0,0,2,4,],
        defense: [0,8,8,3,12,12,],
        hitpoints: 20,
        level: 3,
        info: 'Immune to poisons and curses, and supposedly only killable by piercing its heart.',
        onDeath: 'The vampire hisses in agony before attempting to turn into a bat and dieing mid-transformation.',
        drop: [
          new Item (
            new ItemType (
                'half-man half-bat carcass', 'weapon',
                [0,0,2,0,6,1],
                3,
                'The half-man half-bat carcass that you\'ve been carrying and throwing around as a toxic weapon SHRIEKS and its arms seem to be trying to prize it free from the form of the dead bat. Slowly, a naked vampire, skeletal, hairless and bent, emerges from the rotting mess.',
                'The corpse of a bat with the twisted arm and face of a human man bursting from it, also dead. It\'s bleeding some kind of ashy black ichor.',
                (room) => {
                    room.monsters.push(
                      new Monster (
                          room,
                          new MonsterType ({
                              // pierce, slash, crush, burn, poison, curse
                              name: 'misshaped vampire',
                              attack: [7,1,0,0,1,3,],
                              defense: [0,9,0,2,12,12,],
                              hitpoints: 20,
                              level: 3,
                              info: 'Immune to poisons and curses, and supposedly only killable by piercing its heart.',
                              onDeath: 'The vampire starts growing chalky white hair rapidly from its head and body, while its skin becomes papery and constricts its skull. Its eyes shrivel up like raisins and then it explodes into bright red ash.',
                          }),
                        )
                    )
                }
            ),
          ),
        ]
    }),
    new MonsterType ({
        name: 'werewolf',
        attack: [5,3,0,0,0,0,],
        defense: [4,6,7,3,2,4,],
        hitpoints: 20,
        level: 3,
        info: 'A creature like a mangy flea-ridden wild dog reared to its hind legs with a look of ferocious hunger in its eyes.',
        fightEvent: function () {
            var people;
            people = [
                'brown-eyed man with a red beard',
                'black-haired old woman',
                'tall long-haired woman',
                'overweight middle-aged man',
                'starving looking basset hound'
            ]
            if (!this.foughtOnce) {
              drawString('The werewolf\'s eyes turn bloodshot and its legs and arms seem to extend out as if its bones were stretching.');
              this.info = 'Something vaguely like a person crouching and breathing heavily, preparing to lunge at you with is jaws open.'
            } else {
              drawString('The werewolf is enraged.');
              this.info = 'A furious looking wolf reared up onto its back legs like a person.'
            }
            this.attack[0] -= this.attack[0] > 0 ? 1 : 0; // decrease pierce
            this.attack[1] += 1; // increase slash
            this.attack[2] += 2; // increase crush
            this.onDeath = 'The wolf becomes a ' + pick(people) + ' and dies.';
            this.foughtOnce = true;
        }
    }),
    new MonsterType ({
        name: 'violent blob',
        attack: [0,0,4,0,0,0,],
        defense: [12,12,10,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s not clear what it is but it\'s bigger than you are and it doesn\'t look like it likes you.',
    }),
    new MonsterType ({
        name: 'shoggoth',
        attack: [1,0,7,0,3,1,],
        defense: [9,8,8,1,4,2,],
        hitpoints: 20,
        level: 3,
        info: 'A seething mass of forming and unforming flesh. All other life on earth was created as an accidental byproduct of this writhing parody\'s birth. If you can get close enough you can try burning it.',
        drop: [new Item(extras['primordial glob'])]
    }),
    new MonsterType ({
        name: 'ghoul',
        attack: [2,3,0,0,1,0,],
        defense: [2,1,0,0,8,0,],
        hitpoints: 20,
        level: 2,
        info: 'A emaciated human with blood and stringy raw meat clinging around his mouth and in his teeth and a expression of lunatic hunger on his face. It reeks of dead flesh.',
    }),
    new MonsterType ({
        name: 'bee person',
        attack: [3,0,0,0,3,0,],
        defense: [6,3,0,0,1,0,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s part bee, but it\'s part person too.',
    }),
    new MonsterType ({
        name: 'fire elemental',
        attack: [0,0,0,8,0,0,],
        defense: [4,4,4,12,2,0,],
        hitpoints: 20,
        level: 3,
        info: 'When it holds a single shape for a flickering moment it\'s that of a woman with blazing eyes and mouth. Most vulnerable to magic attacks.',
        onDeath: 'Its face goes slack and swirls into a glob of black flame which falls and bursts.',
        drop: [new Item(itemByName(Math.floor(Math.random()) ? 'ghostcandle' : 'burned bone'))]
    }),
    new MonsterType ({
        name: 'hellhound',
        attack: [3,0,0,0,2,2,],
        defense: [2,2,8,8,2,4,],
        hitpoints: 20,
        level: 2,
        info: 'A massive grey dog with smoldering hellfire foaming out from between its jaws. Don\'t bother with crushing or burning attacks, and just be careful of its bite.',
    }),
    new MonsterType ({
        name: 'witch',
        attack: [0,0,0,0,2,8,],
        defense: [3,3,3,0,12,12,],
        hitpoints: 20,
        level: 3,
        info: 'She\'s not moving but her eyes remind you of a cat stalking a bird. Supposed to be most vulnerable to fire.',
    }),
    new MonsterType ({
        name: 'rattlesnake',
        attack: [1,0,0,0,2,0,],
        defense: [0,0,0,0,0,0,],
        hitpoints: 20,
        level: 1,
        info: 'It\'s poisonous!',
    }),
    new MonsterType ({
        name: 'angry triceratops',
        attack: [2,0,8,0,0,0,],
        defense: [0,4,12,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'A beast from out of time, driven into a mad fury and ready to crush anything it stumbles into. Try a strong pierce attack.',
    }),
    new MonsterType ({
        name: 'riverwolf',
        attack: [0,0,12,0,0,0,],
        defense: [4,0,5,2,2,1,],
        hitpoints: 20,
        level: 3,
        info: 'A soaking wet apelike dog creature with a emaciated grasping hand sprouting from the end of its long tail. Deals heavy crush damage as it strangles its victims. Try to get close enough to slash at it.',
    }),
    new MonsterType ({
        name: 'weaselcat',
        attack: [5,0,0,0,3,0,],
        defense: [4,0,1,2,5,1,],
        hitpoints: 20,
        level: 2,
        info: 'A long, small Amazonian wildcat known for its piercing bite. This one looks like it might be rabid, so be careful of poison. Try slashing or crushing it if you catch it.',
    }),
    new MonsterType ({
        name: 'cruel phantom',
        attack: [0,0,0,0,0,3,],
        defense: [12,12,12,12,12,0,],
        hitpoints: 20,
        level: 3,
        info: 'The mansion\'s cruel phantoms are the spirits of people who died painful deaths within the walls. They\'re immune to all physical attacks, and determined to return their agony to the still living.',
        drop: [new Item(extras['phantom\'s blood'])]
    }),
    new MonsterType ({
        name: 'wendigo',
        attack: [7,7,7,0,0,0,],
        defense: [10,10,10,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'A savagely deadly creature of the boreal forests, the tortured body of one who was forced to eat their own kind to survive, and now must continue or die. Its body is numb to pain and it can weather most physical attacks.',
    }),
    new MonsterType ({
        name: 'rabid wizard',
        attack: [0,0,0,0,0,9,],
        defense: [6,1,2,0,0,4,],
        hitpoints: 20,
        level: 3,
        info: 'He looks like he\'s not used to being around other people. his eyes are constantly moving around the room and his beard is wild and matted. his fingers and ears are crackling with hairswidth bolts of black lightning.',
    }),
    new MonsterType ({
        name: 'shrieking dog',
        attack: [0,0,0,0,4,4,],
        defense: [7,0,8,3,5,9,],
        hitpoints: 20,
        level: 3,
        info: 'Its weird scream is supposed to be an omen of disease. It can\'t wield weapons so it\'s most vulnerable to slashing attacks.',
    }),
    new MonsterType ({
        name: 'arsonist ghost',
        attack: [0,0,0,6,0,1,],
        defense: [8,7,5,0,5,5,],
        hitpoints: 20,
        level: 3,
        info: 'The ghost of a man convicted of setting fire to property public and private, recidivating after a lethal injection. He\'s most vulnerable to fire.',
    }),
    new MonsterType ({
        name: 'tumorous bleating mass',
        attack: [0,0,1,0,2,0,],
        defense: [0,10,0,5,2,1,],
        hitpoints: 20,
        level: 2,
        info: 'A pulsating blot of veiny scab-covered flesh with seven blinking eyes and a shapeless bleating mouth. It doesn\'t seem dangerous.',
    }),
    new MonsterType ({
        name: 'nightgaunt',
        attack: [0,5,2,0,0,0,],
        defense: [2,9,4,2,2,7,],
        hitpoints: 20,
        level: 1,
        info: 'A tall, thin snatcher of innocents in the night. Weakest to piercing and fire.',
    }),
    new MonsterType ({
        name: 'horned woman',
        attack: [4,0,0,4,4,0,],
        defense: [3,3,6,0,0,6,],
        hitpoints: 20,
        level: 3,
        info: 'A woman with the head of a stag. The wounds left by her piercing antlers and tentacles of shadow will smolder with heat and become infected.',
    }),
    new MonsterType ({
        name: 'invisible mangler',
        attack: [0,6,0,0,0,0,],
        defense: [12,2,1,2,1,1,],
        hitpoints: 20,
        level: 2,
        info: 'An unseeable stunted hairy creature that will attack and gnaw on random targets in public places, sometimes dismembering them with its razor claws. Burning and crushing attacks will be most likely to hit it.',
    }),
    new MonsterType ({
        name: 'headless knight',
        attack: [3,9,1,0,0,1,],
        defense: [11,3,3,0,0,0,],
        hitpoints: 20,
        level: 2,
        info: 'The body of a crusading knight beheaded in the Holy Land and resurrected by a witch. His slashing attack is deadly and his chainmail protects him from pierce attacks.',
        drop: [new Item(itemByName(pick(['bag of devil\'s gold', 'executioner\'s sword', 'crusader\'s shield'])))]
    }),
    new MonsterType ({
        name: 'mad gasser',
        attack: [0,0,0,0,8,0,],
        defense: [4,0,5,0,10,1,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s too cowardly to attack up close so it protects its face with a gas mask and sprays toxic fumes at anything it sees breathing. It\'s vulnerable to slashing and fire.',
    }),
    new MonsterType ({
        name: 'weird oak',
        attack: [2,0,5,0,0,0,],
        defense: [10,1,4,0,12,8,],
        hitpoints: 20,
        level: 1,
        info: 'A large oak tree whose roots are winding into and tearing up the room\'s floor. The knots on its trunk are twisted into a tortured grimace. Vulnerable to slashing and fire.',
    }),
    new MonsterType ({
        name: 'rain ghost',
        attack: [0,0,0,1,0,1,],
        defense: [12,12,12,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'A once-powerful thunder god whose name hasn\'t been spoken in worship for centuries, now only an embittered cloud of static electricity. Can\'t be harmed with normal physical weapons.',
    }),
    new MonsterType ({
        name: 'skullhead',
        attack: [2,2,0,0,0,0,],
        defense: [12,0,0,6,12,0,],
        hitpoints: 20,
        level: 1,
        info: 'An energetically animated human skeleton, moving to attack with its bare hands.',
    }),
    new MonsterType ({
        name: 'drowned whaler',
        attack: [12,0,0,0,0,0,],
        defense: [0,0,0,2,1,4,],
        hitpoints: 20,
        level: 2,
        info: 'The waterlogged corpse of a whaler reanimated and wielding a deadly barbed harpoon.',
        drop: [new Item(extras['harpoon'])]
    }),
    new MonsterType ({
        name: 'mechanical bear',
        attack: [0,4,7,0,0,0,],
        defense: [4,2,2,0,7,0,],
        hitpoints: 20,
        level: 2,
        info: 'A monstrous automaton the size and shape of a North American Grizzly Bear. It spits acrid black smoke from its mouth, nose, and eyes as it bears down on you.',
    }),
    new MonsterType ({
        name: 'omnivorous fungus',
        attack: [0,0,1,0,2,0,],
        defense: [11,3,5,0,8,1,],
        hitpoints: 20,
        level: 2,
        info: 'A massive greenish-blue fungal growth with spores wriggling out of its back as it devours the walls it\'s growing on.',
        fightEvent: function () {
            if (
                game.player.weapon && // Player is armed
                (
                    game.player.weapon.bonus[1] > 0 || // Slash damage
                    game.player.weapon.bonus[2] > 0 // Crush damage
                ) &&
                game.player.weapon.bonus[3] < 4 && // No substantial burn damage
                game.player.weapon.ammo > 0 && // Weapon still has ammo
                this.hitpoints > 0 // Still alive
              ) {
                let weapon = game.player.weapon;
                game.player.weapon = null;
                drawString(`The omnivorous fungus devours your ${weapon.name}.`);
                this.attack = this.attack.map((stat, index) => {
                    return stat + weapon.bonus[index];
                })
                this.info += ` The power of your ${weapon.name} is added to its attack.`
            }
        }
    }),
    new MonsterType ({
        name: 'weaghrai',
        attack: [0,0,0,0,0,0,],
        defense: [9,7,6,3,3,1,],
        hitpoints: 20,
        level: 1,
        info: 'A sharp-toothed feline-eared diminuitive grey implike creature with wild deranged eyes.',
        onInstantiate: function () {
            this.data.baseDefense = this.defense.map(stat => { return stat })
            this.data.baseAttack = this.attack.map(stat => { return stat })
            this.data.arsenal = [
                itemByName('revolver'),
                itemByName('hunting knife'),
                itemByName('thompson gun'),
                itemByName('hand grenade'),
                itemByName('shotgun'),
                itemByName('laughing mask'),
                itemByName('firebomb'),
                itemByName('case of chemical bombs'),
                itemByName('throwing knife'),
                itemByName('machete'),
            ];
            this.data.notify = function () {
                drawString(`The ${this.name} conjures a ${this.data.item.name} in a flash of ${pick(['ultraviolet light', 'ultraviolet light', 'ultraviolet light', 'darkness', 'white light'])}.`);
                this.info = `A sharp-toothed feline-eared diminuitive grey implike creature ${this.data.item.slot === 'weapon' ? 'armed with' : 'defending itself with' } a ${this.data.item.name}.`;
            }.bind(this)
        },
        fightEvent: function () {
            if (this.data.item) {
                this.data.item.ammo -= 1;
                if (this.data.item.ammo > 0) {
                    drawString(`The ${this.name} drops its ${this.data.item.name}.`);
                    this.room.items.push(this.data.item);
                } else {
                    drawString(`The ${this.name}'s ${this.data.item.name} is destroyed.`);
                }
                this.data.item = null;
            }
            this.data.item = new Item(pick(this.data.arsenal), this.room);
            this.drop = this.data.item.ammo > 1 ? [this.data.item] : [];
            this.data.notify();
            if (this.data.item.slot === 'shield') {
                this.defense = this.data.baseDefense.map((stat, index) => {
                    return stat + this.data.item.bonus[index] > 12 ? 12 : stat + this.data.item.bonus[index]
                });
            } else if (this.data.item.slot === 'weapon') {
                this.attack = this.data.baseAttack.map((stat, index) => {
                    return stat + this.data.item.bonus[index]
                });
            }
        }
    }),
    new MonsterType ({
        name: 'necromancer',
        attack: [0,1,4,0,0,0],
        defense: [6,1,2,0,0,4,],
        hitpoints: 20,
        level: 3,
        info: 'A well-dressed thin tall man with a hat.',
        fightEvent: function () {
            this.data.monstersInRoom.map(mon => {
                if (!this.room.monsters.includes(mon) && !mon.undead) {
                    drawString(`The necromancer raises the ${mon.name} from the dead ${
                        pick([
                            'like he thinks he\'s the king of hell.',
                            'by standing over the corpse and shouting so loudly that spit comes out.',
                            'with his hand.',
                            'after removing his hat to speak a prayer.',
                            `like it's a ${mon.name.split(' ')[mon.name.split(' ').length - 1]} Lazarus.`,
                            `but it almost looks as if it\'s resisting being pulled back into life, its body dissolving as it rises.`,
                        ])
                    }`)
                    let roll = dice(3)
                    mon.defense[1] = 0 // weak against slash
                    mon.defense[3] = 0 // weak against fire
                    mon.defense[0] = 12 // immune to pierce
                    mon.defense[4] = 12 // immune to poison
                    mon.undead = true
                    mon.hitpoints = 20
                    switch (roll) {
                        case 1:
                            mon.name = `unmurdered ${mon.name}`
                            mon.attack[0] += 3 // pierce attack bonus
                            mon.attack[5] += 1 // curse attack bonus
                            mon.info += ' It was murdered and has risen changed.'
                            break;
                        case 2:
                            mon.name = `reanimated ${mon.name}`
                            // all attack weakened:
                            mon.attack = mon.attack.map(stat => {
                                return Math.floor(stat / 2)
                            })
                            // crush increased:
                            mon.attack[2] += dice(6) + dice(6) + dice(6)
                            mon.info += ' It\'s been reanimated but it looks like it wasn\'t quite fresh enough.'
                            break;
                        case 3:
                            mon.name = `half-dead ${mon.name}`
                            // all attack weakened:
                            mon.attack = mon.attack.map(stat => {
                                return Math.floor(stat / 2)
                            })
                            mon.info = `Somebody botched the job of returning this thing to the ranks of the living. ${mon.info}`
                            break;
                    }
                    this.room.monsters.push(mon);
                }
            })
            if (this.room.monsters.filter(mon => { return !mon.undead }).length > 0) {
                drawString(`The necromancer opens his mouth twice as wide as you\'ve ever seen anyone open his mouth, sucking the lifeforce of the room\'s other occupants in through it.`)
                this.room.monsters.map(mon => {
                    if (
                        mon.hitpoints > 0 &&
                        !mon.undead &&
                        this.hitpoints < 20
                    ) {
                        let amount = (20 - this.hitpoints) < (mon.hitpoints) ? (20 - this.hitpoints) : (mon.hitpoints)
                        mon.hitpoints -= amount
                        this.hitpoints += amount
                        if (mon.hitpoints <= 0) {
                            mon.die()
                        }
                    }
                })
            }
        },
        onInstantiate: function () {
            this.undead = true
            this.room.monsters.push(new Monster (this.room, pick(allMonsterTypes)))
            this.data.monstersInRoom = this.room.monsters.filter(mon => { return mon.name !== 'necromancer' })
        },
    }),
    new MonsterType ({
      name: 'man o\' nails',
      attack: [4,2,1,0,0,0,],
      defense: [11,0,10,3,12,3,],
      hitpoints: 20,
      level: 2,
      info: `Sixty-eight thousand stainless steel nails gathered together into the shape of a man, bearing down on you with a loping skip of a stride.`,
      onDeath: 'It collapses into nails.',
      onInstantiate: function () {
          this.data.numbers = ['Sixty-eight thousand', 'Thirty-four thousand', 'Seventeen thousand', 'Eight thousand five hundred', 'Four thousand two hundred and fifty', 'Two thousand one hundred and twenty-five', 'One thousand sixty-two and a half', 'Five hundred thirty-one and a quarter', 'Two hundred sixty-five and five eights', 'A hundred thirty-two and thirteen sixteenths', 'Sixty-six and thirteen thirty-seconds', 'Thirty-three and thirteen sixty-fourths', 'Sixteen and seventy-seven hundred-and-twenty-eighths', 'Eight and seventy-seven two-hundred-and-fifty-sixths', 'Four and seventy-seven five-hundred-and-twelfths']
          this.data.splits = 0
      },
      fightEvent: function () {
          let one = new Monster (this.room, monByName('man o\' nails'))
          let two = new Monster (this.room, monByName('man o\' nails'))
          one.hitpoints = Math.ceil(this.hitpoints / 2)
          two.hitpoints = Math.floor(this.hitpoints / 2)
          one.data.splits = this.data.splits + 1
          two.data.splits = this.data.splits + 1
          one.info = `${(one.data && one.data.numbers) ? one.data.numbers[one.data.splits] || 'Sixty-eight thousand' : 'Sixty-eight thousand'} stainless steel nails gathered together into the shape of a man, bearing down on you with a loping skip of a stride.`
          two.info = `${(two.data && two.data.numbers) ? two.data.numbers[two.data.splits] || 'Sixty-eight thousand' : 'Sixty-eight thousand'} stainless steel nails gathered together into the shape of a man, bearing down on you with a loping skip of a stride.`
          if (one.hitpoints > 0) {
              this.room.monsters.push(one)
          }
          if (two.hitpoints > 0) {
              this.room.monsters.push(two)
          }
          this.die()
          drawString('The nails form up into two smaller men.')
      }
    }),
    new MonsterType ({
        name: 'psychic ray',
        attack: [1,0,0,0,3,3,],
        defense: [8,1,10,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s stingray hovering in the air.',
    }),
    new MonsterType ({
        name: 'Opel Manta',
        attack: [0,0,8,3,0,0,],
        defense: [2,2,10,8,12,0,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s a 1977 Opel Manta. A affordable four-door hatchback with a good safety rating but low gas mileage.',
    }),
    // pierce, slash, crush, burn, poison, curse
    // new MonsterType ({
    //     name: 'template',
    //     attack: [0,0,0,0,0,0,],
    //     defense: [0,0,0,0,0,0,],
    //     hitpoints: 20,
    //     level: 3,
    //     info: '',
    // }),
];

// attack: {
//     pierce: 0,
//     slash: 2,
//     crush: 1,
//     burn: 0,
//     poison: 3,
//     curse: 0,
// },
// defense: {
//     pierce: 6,
//     slash: 0,
//     crush: 0,
//     burn: 0,
//     poison: 12,
//     curse: 0,
// }
