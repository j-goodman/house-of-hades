var extras = extras ? extras : {}

// pierce, slash, crush, burn, poison, curse

extras['arcane merchant'] = Object.assign({}, monByName('weaghrai'))
extras['arcane merchant'].defense = monByName('weaghrai').defense.map(num => { return num })
extras['arcane merchant'].attack = monByName('weaghrai').attack.map(num => { return num })
extras['arcane merchant'].name = 'arcane merchant'
extras['arcane merchant'].info = 'A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. The cat\'s eye on his necklace marks him as a worshipper of the night god Tezcatlipoca.'
extras['arcane merchant'].defense[5] = 10
extras['arcane merchant'].defense[2] = 10
extras['arcane merchant'].attack[2] = 4
extras['arcane merchant'].onInstantiate = function () {
    this.data.baseDefense = this.defense.map(stat => { return stat })
    this.data.baseAttack = this.attack.map(stat => { return stat })
    this.data.arsenal = [
        itemByName('sacred tomohawk'),
        extras['lich\'s eye'],
        extras['Byzantine murder ring'],
        extras['cosmic ball'],
        extras['djinn\'s sword'],
        extras['spidersilk sling'],
        extras['Greek\'s dager'],
        extras['mithril vest'],
        extras['angel\'s armor'],
        extras['goat\'s armor'],
        extras['Swede\'s head'],
        extras['sunfire macana'],
    ];
    this.data.notify = function () {
        drawString(`The merchant withdraws a ${this.data.item.name} from the folds of his velvety black coat.`);
        this.info = `A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. He's ${this.data.item.slot === 'weapon' ? 'armed with' : 'defending himself with' } with a ${this.data.item.name}.`;
    }.bind(this)
}

extras['waterlogged grasper'] = new MonsterType ({
    name: 'waterlogged grasper',
    attack: [0,2,4,0,2,0,],
    defense: [2,1,0,12,8,0,],
    hitpoints: 20,
    level: 2,
    info: 'The delirious corpse of a drowning victim trying desperately to cling to your legs and neck with its pale bloated hands.',
})

extras['blobby amphibious creature'] = new MonsterType ({
    name: 'blobby amphibious creature',
    attack: [1,5,3,0,0,0,],
    defense: [3,2,9,7,11,4,],
    hitpoints: 20,
    level: 2,
    info: 'A milky-eyed eeltoothed finned creature the size of a silverback gorilla. It\'s baring its teeth at you.',
})

extras['starving cannibal'] = new MonsterType ({
    name: 'starving cannibal',
    attack: [1,0,3,0,0,0,],
    defense: [0,0,0,0,0,0,],
    hitpoints: 20,
    level: 3,
    info: 'He wails about his reasons for having devoured the dead and tries to claw at your eyes when you come in.',
})

extras['cyclops'] = new MonsterType ({
    name: 'cyclops',
    attack: [2,0,6,0,0,0,],
    defense: [0,0,0,0,0,0,],
    hitpoints: 20,
    level: 3,
    info: 'A emaciated human-sized creature whose face twists in toward a single miniscule blue eye as if the rest of its features were being sucked into a drain.',
})

extras['sweat-drenched king'] = new MonsterType ({
    name: 'sweat-drenched king',
    attack: [0,3,4,0,0,0,],
    defense: [0,0,0,0,0,0,],
    hitpoints: 20,
    level: 3,
    info: 'A naked old man soaked in his own sweat and trying to beat you with a broken slab of stone.',
})

extras['sarcophagus'] = new MonsterType ({
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
        extras['sweat-drenched king'],
      ))
    }
})

extras['hekatonkheires'] = new MonsterType ({
    name: 'hekatonkheires',
    attack: [0,0,20,0,0,0,],
    defense: [6,6,6,6,6,6,],
    hitpoints: 20,
    level: 3,
    info: 'A hundred-handed fifty-headed giant that sprang from the womb of the still-molten earth long before the days of mankind. His wailing mouths squirm against each other straining their necks to reach the air and his hands beat the earth around him. He is the last of his kind.',
})

extras['divine malfeasance'] = new MonsterType ({
    name: 'divine malfeasance',
    attack: [dice(5) + dice(5), dice(5) + dice(5), dice(9), dice(9), dice(9), dice(9),],
    defense: [dice(12), dice(12), dice(6) + dice(5), dice(12), dice(12), dice(12),],
    hitpoints: 20,
    level: 3,
    info: 'A thing whose form seems to be made up of the shrieking sound of metal grinding on metal.',
    drop: [
        new Item (extras['death\'s beak']),
    ],
})

extras['paranoid summoner'] = new MonsterType ({
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
        console.log('Fight event.')
        console.log('this.room:', this.room)
        drawString('The paranoid summoner escapes.')
    },
    deathEvent: function () {
        drawString('The fabric of space seems to stretch into a claw that rips open the torso of the paranoid summoner releasing a murder of crows and killing her. The crows fly out and shake themselves clean, and the rift pulses but remains open.')
        console.log('Death event.')
        console.log('this.room:', this.room)
        let rift = new Door ('demoniac rift', this.room)
        let dungeon = new Room ([rift], 0)
        rift.to = dungeon
        this.room.doors.push(rift)
        this.room.monsters.push(new Monster (this.room, extras['crow']), new Monster (this.room, extras['crow']), new Monster (this.room, extras['crow']))
        dungeon.mana *= 12;

        dungeon.type = 'limitless unperceivable void'
        dungeon.items = []
        dungeon.monsters = [new Monster (
            dungeon,
            extras['divine malfeasance'],
        )]
    }
})

extras['crow'] = new MonsterType ({
    // pierce, slash, crush, burn, poison, curse
    name: 'crow',
    attack: [1,3,0,0,0,0,],
    defense: [12,0,0,0,0,0,],
    hitpoints: 20,
    level: 1,
    info: 'A glossy black-feathered carrion crow.',
})

extras['boa constrictor'] = new MonsterType ({
    name: 'boa constrictor',
    attack: [0,0,9,0,0,0,],
    defense: [7,0,5,0,3,0,],
    hitpoints: 20,
    level: 1,
    info: 'A massive green serpent that crushes its prey to death in its muscular coils.',
}),

extras['wildgod'] = new MonsterType ({
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
            extras['crow'],
            new MonsterType ({
                name: 'pit viper',
                attack: [1,0,0,0,4,0,],
                defense: [6,0,0,0,0,0,],
                hitpoints: 20,
                level: 1,
                info: 'A venomous black viper.',
            }),
            extras['boa constrictor'],
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
            new MonsterType ({
                name: 'moose',
                attack: [1,0,7,0,0,0,],
                defense: [0,9,10,0,2,0,],
                hitpoints: 20,
                level: 2,
                info: 'A massive antlered mammal grinding a hoof against the ground in preparation to charge.',
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

extras['glass man'] = new MonsterType ({
    name: 'glass man',
    attack: [8,2,0,0,0,0,],
    defense: [12,0,12,12,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A thing in the shape of a man, made of white glass, approaching you.',
})

extras['laughing woman'] = new MonsterType ({
    name: 'laughing woman',
    attack: [8,2,0,0,0,0,],
    defense: [12,0,12,12,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A happy woman walking on seven foot legs like a colossal spider\'s, whose heart is beating with such force and size that you can see it straining against her ribs.',
})

extras['murderer\'s courage'] = new MonsterType ({
    name: 'murderer\'s courage',
    attack: [8,0,0,0,0,0,],
    defense: [7,12,12,2,2,2,],
    hitpoints: 20,
    level: 3,
    info: 'A ghost who wanders the earth to seize the hearts of those considering murder and provoke them.',
})

extras['screaming mechanical searcher'] = new MonsterType ({
    name: 'screaming mechanical searcher',
    attack: [5,0,0,2,0,0,],
    defense: [2,12,12,10,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A machine flying on three whirling blades screaming and shining a blinding searchlight at you. It\'s trying to pelt you with long hot obsidian thorns shot at high speeds.',
})

extras['half-goat soldier'] = new MonsterType ({
    name: 'half-goat soldier',
    attack: [4,7,0,0,0,0,],
    defense: [4,11,8,2,7,2,],
    hitpoints: 20,
    level: 3,
    info: 'A soldier armored in heavy iron, half-man and half-goat. The insignia carved into his breastplate looks like a eye with two perpendicular roads passing through it.',
    drop: [
        new Item (extras['goat\'s armor']),
    ]
})

extras['kraken'] = new MonsterType ({
    name: 'kraken',
    attack: [0,0,8,0,0,0,],
    defense: [8,11,12,10,12,11,],
    hitpoints: 20,
    level: 3,
    info: 'A oily-skinned black octopus the size of a mountain, one of its thousand-foot arms creeping inquisitively towards your feet.',
    drop: [
        new Item (extras['kraken\'s ink sac']),
    ]
})

extras['jelly leviathan'] = new MonsterType ({
    name: 'jelly leviathan',
    attack: [1,0,3,1,5,0,],
    defense: [9,3,12,5,12,6,],
    hitpoints: 20,
    level: 3,
    info: 'A jellyfish the size of a cathedral, with cnidoblasts in its colossal tentacles that deploy caustic venomous barbs as big as bicycles when it\'s startled or threatened.',
    drop: [
        new Item (extras['venomous barb']),
    ]
})

extras['seagod'] = new MonsterType ({
    name: 'seagod',
    attack: [11,0,0,0,0,0,],
    defense: [12,12,12,10,6,5,],
    hitpoints: 20,
    level: 3,
    info: 'A withered old man radiating divine energy, gathering the waves up around him defensively.',
    drop: [
        new Item (extras['pair of earthquake boots'])
    ]
})

extras['sandeater'] = new MonsterType ({
    name: 'sandeater',
    attack: [1,1,6,2,0,0,],
    defense: [12,12,0,12,0,12,],
    hitpoints: 20,
    level: 3,
    info: 'A red creature the size of a hippo, with dry cracked red skin and a gaping mouth that lazily munches sand. It eyes you greedily and moves to devour you.',
})

extras['shapeshifter'] = new MonsterType ({
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
        drawString(`With a noise like ${pick(['a colossal bullfrog\'s croak', 'a colossal bullfrog\'s croak', 'the screaming brakes of a fast-moving train', 'a howling rat-dog', 'a avalanche', 'a treetrunk snapping in two', 'a drowning elephant', 'a mauled hyena'])} the shapeshifter becomes a ${pickUnique(allMonsterTypes.map(mon => { return mon.name }).concat(Object.keys(extras).filter(ext => { return !!extras[ext].attack })), [targetType.name])}, a ${pickUnique(allMonsterTypes.map(mon => { return mon.name }).concat(Object.keys(extras).filter(ext => { return !!extras[ext].attack })), [targetType.name])}, then a ${targetType.name}`)
    }
})

extras['nagual'] = new MonsterType ({
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

extras['chained specter'] = new MonsterType ({
    name: 'chained specter',
    attack: [0,0,0,2,5,2,],
    defense: [12,12,12,0,12,0,],
    hitpoints: 20,
    level: 3,
    info: 'A oily black specter with its wrists locked in cold iron chains.',
})

extras['heart-eating fox'] = new MonsterType ({
    name: 'heart-eating fox',
    attack: [2,5,0,1,0,0,],
    defense: [9,1,5,0,0,12,],
    hitpoints: 20,
    level: 1,
    info: 'A red-tailed fox, tasked to execute the vengeance of the sun-god\'s predecessor by devouring the hearts of as many fellow earthly mammals as it has the chance to.',
})

extras['traitorous hand'] = new MonsterType ({
    name: 'traitorous hand',
    attack: [0,0,4,0,0,2],
    defense: [7,4,1,0,10,0,],
    hitpoints: 20,
    level: 1,
    info: `A olive-skinned hand broken off at the wrist. It can suspend itself in the air and grip with the strength of a ape.`,
    deathEvent: function () {
        let drop = new Item (extras['treacherous hand'], this.room)
        drop.bonus = drop.data.baseBonus
        drawString(`The treacherous hand goes limp in the air and drops to the ground.`)
        drop.ammo = this.data.ammo || 15
        this.room.items.push(drop)
        if (this.data.holding) {
            this.room.items.push(this.data.holding)
        }
    }
})

extras['strangling demon'] = new MonsterType ({
    name: 'strangling demon',
    attack: [0,0,12,0,0,0,],
    defense: [12,0,12,12,0,6,],
    hitpoints: 20,
    level: 3,
    info: `It\'s a tangle of many-elbowed arms ending in hands with six four-jointed fingers and two opposable thumbs each, emerging from a emaciated headless body wearing a mask on its chest that depicts a wide-eyed broad-smiling fanged woman. Its hands fumble blindly for your throat.`,
    drop: [
        new Item (itemByName(pick(['laughing mask', 'treacherous hand'])))
    ]
})

extras['looking demon'] = new MonsterType ({
    name: 'looking demon',
    attack: [0,0,0,0,0,12,],
    defense: [0,12,12,12,0,6,],
    hitpoints: 20,
    level: 3,
    info: `A creature in the shape of a eight foot tall corpulent man with every inch of its skin covered in eyeballs of every color which all blink in exact unison twice a minute.`,
    drop: [
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
        new Item (itemByName(pick(['evil eye', 'weeping eye', 'congealed eye', 'afflicted eye', 'watchful eye']))),
    ]
})

let bottles = ['bottle of violet powder', 'bottle of liquid swords', 'bottle of black goo', 'bottle of demon\'s blood', 'bottle of green acid', 'bottle of orange fumes', 'bottle of doughy fungus', 'bottle of wasps'].map(name => { return itemByName(name) })

extras['bottle demon'] = new MonsterType ({
    name: 'bottle demon',
    attack: [0,0,0,0,0,0,],
    defense: [12,12,0,12,12,6,],
    hitpoints: 20,
    level: 3,
    info: `A long-armed human-shaped demon with papery ${pick(['grey', 'gray'])} skin and a rectangular cavity in its torso like a shelf. Its insides are stuffed with brightly polished but disorganized glass jars and vials containing fluids and powders of every color.`,
    drop: [
        new Item (pick(bottles)),
        new Item (pick(bottles)),
        new Item (pick(bottles)),
        new Item (pick(bottles)),
        new Item (pick(bottles)),
        new Item (pick(bottles)),
        new Item (pick(bottles)),
    ],
    onInstantiate: function () {
        this.data.weaponTypes = bottles
        this.data.getWeapon = function () {
            this.data.weapon = new Item (pick(this.data.weaponTypes))
            this.attack = this.data.weapon.bonus
        }.bind(this)
        this.data.getWeapon()
    },
    fightEvent: function () {
        this.data.getWeapon()
        drawString(`The bottle demon siezes a ${this.data.weapon.name} out from inside its torso.`)
    }
})

extras['carcinogenic demon'] = new MonsterType ({
    name: 'carcinogenic demon',
    attack: [0,0,0,0,13,0,],
    defense: [12,0,12,12,0,6,],
    hitpoints: 20,
    level: 3,
    info: `A bone-white demon with huge black eyes and a crushed-looking chest cavity, with two lungs hanging on the outside of its body under its armpits, struggling and faltering as they rapidly inflate and deflate in ragged breaths. They're leaking black fumes as they contract.`,
    drop: [
        new Item (itemByName(pick(['pearl of concentrated pestilence'])))
    ]
})

extras['blood golem'] = new MonsterType ({
    name: 'blood golem',
    attack: [3,0,2,0,0,0,],
    defense: [12,3,5,0,0,12,],
    hitpoints: 20,
    level: 1,
    info: `Your blood combined with that of the razor demon's other victims to form a scarlet bubble the shape of a half-sized human that's coming fast at you.`,
})

extras['razor demon'] = new MonsterType ({
    name: 'razor demon',
    attack: [0,4,0,0,0,0,],
    defense: [12,12,12,12,6,6,],
    hitpoints: 20,
    level: 3,
    info: `A demon like a tall thin pink-skinned person with the eyelids and lips slashed off of its face. Steel razor blades hover in crowds near each of its fourteen fingers, ready to strike.`,
    drop: [
        new Item (itemByName(pick(['bottle of demon\'s blood'])))
    ],
    onInstantiate: function () {
        this.data.damageDone = 0
        this.data.eyes = true
    },
    fightEvent: function () {
        if (this.data.playerHp) {
            let difference = this.data.playerHp - game.player.stats.hitpoints
            this.data.damageDone += difference
            if (difference > 0) {
                drawString(`The demon's razors become bright gleaming red liquid streaks and fly into its ${this.data.eyes ? 'eyes' : 'eye sockets'}. Its fingernails become razors to replace them.`)
                while (this.data.damageDone >= 5) {
                    this.data.damageDone -= 5
                    if (this.data.eyes) {
                        drawString(`The razor demon's eyes pop from its head with a sound like corks from a wine bottle.`)
                        this.room.items.push(
                            new Item (itemByName('afflicted eye'), this.room),
                            new Item (itemByName('afflicted eye'), this.room)
                        )
                        this.data.eyes = false
                    }
                    drawString(`A creature made of blood crawls out of one of the razor demon's empty eye sockets and slumps to the floor.`)
                    this.room.monsters.push(new Monster (this.room, extras['blood golem']))
                }
            }
        }
        this.data.playerHp = game.player.stats.hitpoints
    },
})

extras['foolsfire'] = new MonsterType ({
    name: 'foolsfire',
    attack: [0,0,0,0,0,0,],
    defense: [12,12,7,12,12,12,],
    hitpoints: 20,
    level: 1,
    info: `It's a pale flickering flame hanging passively in the air.`,
    fightEvent: function () {
        if (this.attack[3] === 0) {
            let door = new Door ((game.player.room.doors.map(door => { return door.color }).includes('pale-lit') ? 'dim-lit' : 'pale-lit'), this.room, false, false)
            let newRoom = new Room ([door], 1 + dice(2))
            drawString(`The foolsfire passes through a door in the wall that you hadn't seen before, lit by a pale white light.`)
            newRoom.monsters = []
            door.to = newRoom
            this.room.doors.push(door)
            this.room.monsters = []
            let flightTo = new Room ([], dice(2))
            game.house.rooms.push(flightTo)
        }
        this.attack[3] += 1 + dice(2)
        this.defense[0] -= 1
        this.defense[1] -= 1
        this.defense[2] -= 1
        this.defense[5] -= 2
        this.defense.map((num, index) => {
            this.defense[index] = num < 0 ? 0 : num
        })
    }
})
