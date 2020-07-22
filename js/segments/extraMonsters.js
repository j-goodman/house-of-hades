var extras = extras ? extras : {}

// pierce, slash, crush, burn, poison, curse

extras['dragon'] = new MonsterType ({
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
            door.to = new Room ([], 5);
            door.to.monsters = []
            // door.to = new Room ([], 13);
            door.to.type = 'amphitheater with thirteen vaulted walls'
            door.to.items.push(
                new Item (itemByName(pick(['pike', 'obsidian axe', 'sacred tomohawk', 'paladin\'s shield', 'obsidian axe'])), door.to),
                new Item (itemByName(pick(['king\'s sword', 'king\'s sword', 'clergyman\'s dagger', 'dueling saber', 'dueling saber'])), door.to),
                new Item (itemByName(pick(['wand of oceans', 'golem\'s blood'])), door.to),
                new Item (itemByName('wizard\'s ring'), door.to),
                new Item (itemByName(pick(['bag of devil\'s gold', 'canned ghost'])), door.to),
                new Item (itemByName(pick(['cavalry shield', 'assassin\'s gun', 'purple orchid'])), door.to),
                new Item (itemByName(pick(['lion\'s hide', 'goat\'s armor'])), door.to),
                new Item (itemByName(pick(['archwizard\'s letter', 'demon king\'s note'])), door.to),
            )
            allMonsterTypes.push(extras['half-goat soldier'])
            allMonsterTypes.push(extras['swordwraith'])
            allMonsterTypes.push(extras['shapeshifter'])
            allMonsterTypes.push(extras['nagual'])
            allMonsterTypes.push(extras['big floating eyeball'])
            door.to.doors.map((innerDoor, index) => {
                innerDoor.color = innerDoor.color === 'trap' ? 'trap' : [
                    // 'colossal basalt',
                    'rune-inscribed stone',
                    // 'carved ebony',
                    // 'giant sandstone',
                    // 'huge steel',
                    // 'tiny circular',
                    // 'opaque glass',
                    'tall narrow ivory',
                    'thirteen-eyed',
                    // 'obsidian',
                    'ornate stained glass',
                    // 'polished marble',
                    'solid gold',
                ][index]
                innerDoor.locked = false
            })
            door.to.mana += 100;
            door.from.mana += 50;
            drawString('');
            drawString('    | YOU WIN |    ');
            drawString('');
        }
    }
})

extras['arcane merchant'] = Object.assign({}, monByName('weaghrai'))
extras['arcane merchant'].defense = monByName('weaghrai').defense.map(num => { return num })
extras['arcane merchant'].attack = monByName('weaghrai').attack.map(num => { return num })
extras['arcane merchant'].name = 'arcane merchant'
let randomNum = dice(5) - 1
extras['arcane merchant'].info = `A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. The ${['cat\'s eye', 'cat\'s eye', 'conch shell', 'corn husk', 'atalatl dart'][randomNum]} on his necklace marks him as a worshipper of ${['the night god Tezcatlipoca', 'the night god Tezcatlipoca', 'the wind god Quetzalcoatl', 'the flayed god Xipe Totec', 'the sun god Huitzilopochtli'][randomNum]}.`
extras['arcane merchant'].defense[5] = 10
extras['arcane merchant'].defense[2] = 10
extras['arcane merchant'].attack[2] = 4
extras['arcane merchant'].onInstantiate = function () {
    this.data.baseDefense = this.defense.map(stat => { return stat })
    this.data.baseAttack = this.attack.map(stat => { return stat })
    this.data.arsenal = [
        itemByName('sacred tomohawk'),
        itemByName('lich\'s eye'),
        itemByName('Byzantine murder ring'),
        itemByName('cosmic ball'),
        itemByName('djinn\'s sword'),
        itemByName('spidersilk sling'),
        itemByName('Greek\'s dagger'),
        itemByName('mithril vest'),
        itemByName('angel\'s armor'),
        itemByName('Swede\'s head'),
        itemByName('sunfire macana'),
        itemByName('dueling saber'),
        itemByName('gold-plated handgun'),
        itemByName('plague knight\'s sword'),
    ];
    this.data.notify = function () {
        drawString(`The merchant withdraws a ${this.data.item.name} from the folds of his velvety black coat.`);
        this.info = `A transdimensional pochtecatl who scours the known planes of being for strange and powerful artifacts and sells them in exchange for food and cosmic power. He's ${this.data.item.slot === 'weapon' ? 'armed with' : 'defending himself with' } with a ${this.data.item.name}.`;
    }.bind(this)
}

extras['Opel Manta'] = new MonsterType ({
    name: 'Opel Manta',
    attack: [0,0,8,3,0,0,],
    defense: [2,2,10,8,12,0,],
    hitpoints: 20,
    level: 3,
    info: 'It\'s a 1977 Opel Manta. A affordable four-door hatchback with a good safety rating but low gas mileage.',
})

extras['toxic snail'] = new MonsterType ({
    name: 'toxic snail',
    attack: [0,0,6,0,5,0,],
    defense: [3,3,7,0,5,0,],
    hitpoints: 20,
    level: 2,
    info: 'It\'s a yellow snail in a shell the size of a small European car, oozing venomous slime as it crawls at you.',
})

extras['gila moth'] = new MonsterType ({
    name: 'gila moth',
    attack: [2,0,0,3,3,0,],
    defense: [6,0,0,0,12,3,],
    hitpoints: 20,
    level: 2,
    info: 'It\'s a moth with a wingspan as wide as a man\'s, with red-hot glowing venom dripping from its piercing proboscis.',
})

extras['weaselcat'] = new MonsterType ({
    name: 'weaselcat',
    attack: [5,0,0,0,3,0,],
    defense: [4,0,1,2,5,1,],
    hitpoints: 20,
    level: 3,
    info: 'A long, small Amazonian wildcat known for its piercing bite. This one looks like it might be rabid, so be careful of poison. Try slashing or crushing it if you catch it.',
    onDeath: 'The weaselcat dies.'
})

extras['psychic ray'] = new MonsterType ({
    name: 'psychic ray',
    attack: [1,0,0,0,3,3,],
    defense: [8,1,10,0,0,0,],
    hitpoints: 20,
    level: 2,
    info: 'It\'s a stingray hovering in the air.',
})

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

extras['old old man'] = new MonsterType ({
    name: 'old old man',
    attack: [0,0,2,0,0,0,],
    defense: [0,0,0,0,0,0,],
    hitpoints: 20,
    level: 3,
    info:`It's a ${pick(['99', '88', '91', '96', '95', '101', '100', '85', '130', '1000', '1003', '1005', '155', '180'])} year old man, moving in desperation to attack you.`,
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
        new Item (extras['DEATH\'S BEAK']),
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
        drawString('The paranoid summoner escapes.')
    },
    deathEvent: function () {
        drawString('The fabric of space seems to stretch into a claw that rips open the torso of the paranoid summoner releasing a murder of crows and killing her. The crows fly out and shake themselves clean, and the rift pulses but remains open.')
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

extras['albatross'] = new MonsterType ({
    // pierce, slash, crush, burn, poison, curse
    name: 'albatross',
    attack: [1,0,2,0,0,0,],
    defense: [12,0,0,0,0,0,],
    hitpoints: 20,
    level: 1,
    info: 'A white seabird.',
})

extras['boa constrictor'] = new MonsterType ({
    name: 'boa constrictor',
    attack: [0,0,9,0,0,0,],
    defense: [7,0,5,0,3,0,],
    hitpoints: 20,
    level: 1,
    info: 'A massive green serpent that crushes its prey to death in its muscular coils.',
})

extras['pit viper'] = new MonsterType ({
    name: 'pit viper',
    attack: [1,0,0,0,4,0,],
    defense: [6,0,0,0,0,0,],
    hitpoints: 20,
    level: 1,
    info: 'A venomous black viper.',
})

extras['cosmic parasite'] = new MonsterType ({
    name: 'cosmic parasite',
    attack: [4,0,0,0,4,0,],
    defense: [3,0,12,12,12,0,],
    hitpoints: 20,
    level: 2,
    info: 'A inky-black toothy wriggling thing, immune to the crushing black depths of eternity. This one has crawled its way out of non-being to feed on the will to exist of that which is real.',
})

extras['door mumbler'] = new MonsterType ({
    // pierce, slash, crush, burn, poison, curse
    name: 'door mumbler',
    attack: [0,2,8,1,0,0],
    defense: [9,4,10,1,3,8],
    hitpoints: 20,
    level: 3,
    info: 'A seller and manufacturer of very strange trick doors, dressed in comfortable looking olive coveralls.',
    onDeath: 'The door mumbler is killed.',
})

extras['hawk'] = new MonsterType ({
    name: 'hawk',
    attack: [1,4,0,0,0,0,],
    defense: [12,0,0,0,0,0,],
    hitpoints: 20,
    level: 1,
    info: 'A fierce brownfeathered bird of prey.',
})

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
            monByName('griffin'),
            monByName('rattlesnake'),
            monByName('angry triceratops'),
            monByName('riverwolf'),
            monByName('weaselcat'),
            monByName('rabid bear'),
            extras['crow'],
            extras['albatross'],
            extras['boa constrictor'],
            extras['pit viper'],
            extras['hawk'],
            extras['owl of shadows'],
            extras['moose'],
            new MonsterType ({
                name: 'wild boar',
                attack: [2,0,5,0,0,0,],
                defense: [0,5,10,0,0,0,],
                hitpoints: 20,
                level: 2,
                info: 'A black-haired boar with freshly bloodied white tusks.',
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
                name: 'cougar',
                attack: [3,5,2,0,0,0,],
                defense: [6,2,4,0,0,0,],
                hitpoints: 20,
                level: 1,
                info: 'A grey wildcat.',
            }),
            new MonsterType ({
                name: 'hippopotamus',
                attack: [0,0,15,0,0,0,],
                defense: [0,9,10,1,4,0,],
                hitpoints: 20,
                level: 2,
                info: 'A huge barrel-shaped grey riverhorse with a huge mouth and large tusk-like canine teeth.',
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

extras['moose'] = new MonsterType ({
    name: 'moose',
    attack: [1,0,7,0,0,0,],
    defense: [0,9,10,0,2,0,],
    hitpoints: 20,
    level: 2,
    info: 'A massive antlered mammal grinding a hoof against the ground in preparation to charge.',
})


extras['glass man'] = new MonsterType ({
    name: 'glass man',
    attack: [8,2,0,0,0,0,],
    defense: [12,0,12,12,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A thing in the shape of a man, made of white glass, approaching you.',
})

extras['drake'] = new MonsterType ({
    name: 'drake',
    attack: [0,6,6,8,0,1],
    defense: [12,10,4,9,3,12],
    hitpoints: 20,
    level: 3,
    info: 'It\'s a long feathered serpentine animal the size of a rhino.',
    onDeath: 'The drake dies and blood steams out from its body.',
})

extras['wyrm'] = new MonsterType ({
    name: 'wyrm',
    attack: [5,5,5,0,2,0],
    defense: [10,0,10,10,10,0],
    hitpoints: 20,
    level: 3,
    info: 'A blind writhing subterranean wyrm with a lamprey\'s mouth lined with razor-pointed black teeth.',
    onDeath: 'The wyrms splits open and its guts spill out of it.',
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

extras['half-goat swordsman'] = new MonsterType ({
    name: 'half-goat swordsman',
    attack: [4,10,2,0,0,0,],
    defense: [4,11,8,2,7,2,],
    hitpoints: 20,
    level: 3,
    info: 'A half-goat soldier bearing a great green longsword.',
    drop: [
        new Item (itemByName('grass sword'))
    ]
})

extras['rabid bear'] = new MonsterType ({
    name: 'rabid bear',
    attack: [0,4,7,0,7,0,],
    defense: [8,4,1,0,12,0,],
    hitpoints: 20,
    level: 2,
    info: 'A furious Grizzly Bear frothing and spitting bloody foam from its mouth as it bears down on you.',
})

extras['minobear'] = new MonsterType ({
    name: 'minobear',
    attack: [5,0,13,0,0,0,],
    defense: [2,9,7,8,3,0,],
    hitpoints: 20,
    level: 2,
    info: 'A wild hairy-chested giant naked man with the head of a furious grizzly bear.',
})

extras['half-goat bowman'] = new MonsterType ({
    name: 'half-goat bowman',
    attack: [20,0,0,0,0,0,],
    defense: [4,11,8,2,7,2,],
    hitpoints: 20,
    level: 3,
    info: 'A half-goat soldier bearing a great green longbow.',
    drop: [
        new Item (itemByName('longbow'))
    ]
})

extras['centaur'] = new MonsterType ({
    name: 'centaur',
    attack: [11,0,7,0,0,0,],
    defense: [4,11,8,2,7,2,],
    hitpoints: 20,
    level: 3,
    info: 'A half-man half-horse warrior with a long yew bow and a quiver filled with flint arrows.',
    drop: [
        new Item (itemByName('longbow'))
    ]
})

extras['half-goat soldier'] = new MonsterType ({
    name: 'half-goat soldier',
    attack: [0,0,6,0,0,0,],
    defense: [4,11,8,2,7,2,],
    hitpoints: 20,
    level: 3,
    info: 'A soldier armored in heavy iron, half-man and half-goat. The insignia carved into his breastplate looks like a eye with two perpendicular roads passing through it.',
    drop: [
        new Item (extras['goat\'s armor']),
    ],
    onInstantiate: function () {
        let newName = pick(['Goat', 'Binn', 'Bedivere', 'Palamedes', 'Kay', 'Gawain', 'Gaheris', 'Mordred', 'Arthur', 'Morgana', 'Michael', 'Raphael', 'Gabriel', 'Toros', 'Socrates', 'Hamilton', 'Artillery', 'Rattlesnake', 'Mushroom', 'Yukon', 'Cornelius', 'Santiago', 'Kraken'])
        nameMumbler.read(newName)
        nameMumbler.names.push(newName)
        game.goatClans = game.goatClans || []
        if (game.goatClans.length < 4) {
            game.goatClans.push(`${nameMumbler.mumble()}${pick(['', '', '', '', '', 'goat', 'goat', '-goat', 'horn', 'hoof', 'bone', 'clef', 'geist', 'nail', 'son', 'son'])}`)
        }
        this.data.clan = pick(game.goatClans)
        this.info = `A soldier armored in heavy iron, half-man and half-goat. The insignia carved into his breastplate looks like a eye with two perpendicular roads passing through it, with the insignia of the ${this.data.clan} Clan at its middle.`
        let choice = dice(6)
        this.attack[choice - 1] += 8
        let weaponNames = [
            'green\'s spear', // pierce bonus
            'blade of grass', // slash bonus
            'goat\'s mace', // crush bonus
            'liar\'s torch', // burn bonus
            'bow and venom-barbed arrows', // poison bonus
            'goat-priest\'s rattle', // curse bonus
        ]
        let drop = extras[weaponNames[choice - 1]]
        this.info += ` It's armed with a ${drop.info.slice(2, drop.length)}`
        this.drop.push(
            new Item (drop)
        )
    }
})

extras['kraken'] = new MonsterType ({
    name: 'kraken',
    attack: [0,0,14,0,0,0,],
    defense: [10,10,12,10,12,11,],
    hitpoints: 20,
    level: 3,
    info: 'A oily-skinned black octopus the size of a mountain, one of its thousand-foot arms creeping inquisitively towards your feet.',
    drop: [
        new Item (extras['kraken\'s ink sac']),
    ]
})

extras['jelly leviathan'] = new MonsterType ({
    name: 'jelly leviathan',
    attack: [1,0,10,1,5,0,],
    defense: [9,2,12,5,12,6,],
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
    defense: [12,12,12,0,0,12,],
    hitpoints: 20,
    level: 3,
    info: 'A sorceror who\'s spent years studying the art of shapeshifting, as signified by the necklace he wears made from the teeth of a thousand unique beasts. The proportions of his body are somewhat irregular, as if he\'s started to lose track of his original shape.',
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
        drop.bonus = [0,0,6,0,0,3]
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
    attack: [0,0,18,0,0,0,],
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
    attack: [0,0,0,12,0,12,],
    defense: [0,12,12,12,0,6,],
    hitpoints: 20,
    level: 3,
    info: `A creature in the shape of a eight foot tall corpulent man with every inch of its skin covered in eyeballs of every color which all blink in exact unison twice a minute. The mouths that are scattered randomly between his eyes breath loudly and belch fire.`,
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
    defense: [12,12,0,12,12,12,],
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
    attack: [0,0,0,0,30,0,],
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
    attack: [3,0,2,0,3,0,],
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
    drop: [
        new Item (extras['bottle of black goo']),
    ],
    fightEvent: function () {
        if (this.attack[3] === 0) {
            let door = new Door ((game.player.room.doors.map(door => { return door.color }).includes('pale-lit') ? 'dim-lit' : 'pale-lit'), this.room, false, false)
            let firstRoom = new Room ([door], 1)
            let secondRoom = new Room ([firstRoom.doors[1]], 0)
            firstRoom.type = `long ${pick(['candle-lit', 'fog-filled', 'deathly-smelling'])} hallway of black stone bricks ${pick(['', '', 'strewn with skeletons', 'strewn with the skeletons of those who passed through before you', 'with a badly burned corpse on the floor, his equipment spilled out across the hallway', 'with a broken-necked corpse on the floor, her equipment spilled out across the hallway'])}`
            secondRoom.type = 'tomb'
            drawString(`The foolsfire passes through a door in the wall that you hadn't seen before, lit by a pale white light.`)
            firstRoom.monsters = []
            door.to = firstRoom
            firstRoom.doors[1].to = secondRoom
            firstRoom.doors[1].color = 'black'
            firstRoom.items.push(
                new Item (pick(allItemTypes.filter(item => { return item.slot === 'weapon' })), firstRoom),
                new Item (pick(allItemTypes.filter(item => { return item.slot === 'shield' })), firstRoom),
            )
            firstRoom.mana += dice(3) + dice(4)
            secondRoom.items.push(
                new Item (pick(allItemTypes), secondRoom),
            )
            this.room.doors.push(door)
            this.room.monsters = []
            secondRoom.monsters = [this]
            this.room = secondRoom
            this.defense[0] -= dice(5)
            this.defense[1] -= dice(6)
            this.defense[2] -= (dice(4) - 1)
            this.defense[5] -= (dice(2) - 1)
        } else {
            if (this.attack[3] > 4) {
                this.name = 'fire golem'
                this.info = 'It\'s a sparking blue flame fuming black smoke as it shivers in the air before you.'
            }
            drawString(`The ${this.name} flares and swells into a larger, angrier looking blaze.`)
        }
        this.attack[3] += dice(2) + dice(3)
        this.defense[0] += dice(2)
        this.defense[1] += dice(2)
        this.defense[2] -= 1
        this.defense[5] -= (dice(6) - 4)
        this.defense.map((num, index) => {
            this.defense[index] = num < 0 ? 0 : num
            this.defense[index] = num > 12 ? 12 : num
        })
    }
})

extras['swordwraith'] = new MonsterType ({
    name: 'swordwraith',
    attack: [0,16,0,0,0,0,],
    defense: [12,12,12,10,12,3,],
    hitpoints: 20,
    level: 3,
    info: 'It\'s a incorporeal figure of swirling black smoke, cursing at you in Sanskrit with a hissing whisper as it prepares to strike with its blade of white light.',
    drop: [
        new Item (extras['wraith\'s sword'])
    ],
    onInstantiate: function () {
        this.data.progress = 0
        if (this.room && this.room.doors && this.room.doors[0]) {
            this.room.doors[0].locked = true
        }
    },
    fightEvent: function () {
        let slash = !!Math.round(Math.random())
        this.attack[0] = slash ? 0 : 16
        this.attack[1] = slash ? 16 : 0
        drawString(`The swordwraith winds around you like a whirlwind, waiting for an opening to ${slash ? 'slash' : 'stab'} at you.`)
    },
})

extras['big floating eyeball'] = new MonsterType ({
    name: 'big floating eyeball',
    attack: [0,0,3,9,0,0,],
    defense: [0,9,8,12,6,6,],
    hitpoints: 20,
    level: 3,
    info: 'It\'s a flying eyeball the size of a pumpkin, bloodshot and swollen with geothermal energy.',
    onDeath: 'The eyeball melts into molten rock, spilling into a puddle on the floor and hardening into black stone.',
    fightEvent: function () {
        drawString('The eyeball swells and steams, then erupts, a streak of red-hot molten lava jetting out from its iris.')
    }
})

extras['marble guardian'] = new MonsterType ({
    name: 'marble guardian',
    attack: [0,0,0,0,0,0,],
    defense: [12,12,12,12,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A marble colossus in the shape of a crocodile. Inscribed at its base is the message “By the word of the Seven Archwizards is the demon king behind this monument sealed.”',
    onDeath: 'The marble guardian splits in two with a crack like thunder.',
    fightEvent: function () {
        if (game.player.shield && game.player.shield.name === 'wizard\'s ring' && this.defense[2] === 12) {
            drawString('The wizard\'s ring glows with white light as you touch the surface of the marble guardian. The crocodile\'s maw creaks open, revealing a small marble door with a pearl knob.')
            this.defense[2] = 0
            let door = new Door ('pearl-handled marble', game.player.room, null);
            door.to = new Room ([door], 0);
            door.to.items = []
            door.to.monsters = []
            door.to.monsters.push(new Monster (door.to, extras['demon king']))
            door.to.type = 'ancient prison cell'
            game.player.room.doors.push(door)
        } else if (game.player.room.monsters.length === 1) {
            game.player.room.doors.map(door => {
                door.locked = false
                updateRoomContents()
            })
        }
    }
})

extras['demon king'] = new MonsterType ({
    name: 'demon king',
    attack: [0,0,0,5,7,3,],
    defense: [12,12,12,6,10,5,],
    hitpoints: 20,
    level: 3,
    info: 'A withered old man radiating divine energy, starved and emaciated by centuries of imprisonment. He\'s the king of demons.',
    drop: [
        new Item (itemByName('crown')),
        new Item (itemByName('knife')),
    ],
    fightEvent: function () {
        drawString('The demon king strikes the door you came in through with his hand.')
        this.room.doors[0].color = 'demon king\'s'
        this.room.doors[0].to = new Room ([this.room.doors[0]], 2)
        this.room.doors[0].to.doors.map(door => {
            door.locked = door.color !== 'demon king\'s'
        })
        if (this.room.doors[0].to.monsters.length === 0) {
            this.room.doors[0].to.monsters.push(
                new Monster (this.room.doors[0].to, extras[
                    pick([
                        'carcinogenic demon',
                        'bottle demon',
                        'looking demon',
                        'strangling demon',
                        'razor demon',
                        'old old man',
                    ])
                ])
            )
        }
    },
    deathEvent: function () {
        game.player.stats.baseAttack[2] = 0
        game.player.stats.baseAttack[3] = 15
        game.player.stats.baseDefense[0] = 0
        game.player.stats.baseDefense[1] = 0
        game.player.stats.baseDefense[2] = 0
        game.player.stats.baseDefense[4] = 12
        game.player.stats.baseDefense[5] = 12
        updateRoom()
        updateInventory()
        drawString('You\'ve killed the demon king.')
    },
})

extras['raven totem'] = new MonsterType ({
    name: 'raven totem',
    attack: [1,0,0,0,0,0,],
    defense: [12,12,12,11,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A raven-shaped totem twice your height, carved out of pitch black wood with some kind of slick finish. Its eyes are inset pale stones, as dead and motionless as the rest of its graven body.',
    onInstantiate: function () {
        this.room.doors[0].locked = true
    },
    fightEvent: function () {
        drawString('You\'re seized by a mild piercing sensation in your chest as you attack the raven totem.')
    }
})

extras['Behemoth spawn'] = new MonsterType ({
    name: 'Behemoth spawn',
    attack: [0,0,2,0,0,0,],
    defense: [10,12,12,12,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'One of the hundred children of the Behemoth of Job. It\'s a hairy brown creature the size of a mammoth, idly looking up at you with suspicion as it tries to sleep.',
    onInstantiate: function () {
        this.data.progress = 0
        this.room.doors[0].locked = true
    },
    fightEvent: function () {
        drawString([
            'The wooly colossus lazily swats at you with one of its long double-jointed arms.',
            'The Behemoth spawn lazily swats at you again, stirring anxiously as it tries to sleep.',
            'You feel the air pressure of the room change slightly as the Behemoth spawn inhales a huge breath and swats you, its brow furrowing and looking warningly at you.',
            'The Behemoth wakes and staggers to its feet, reaching out to swat you away.',
            'The Behemoth roars and strikes at you.',
        ][this.data.progress])
        if (this.data.progress < 3) {
            this.data.progress += 1
        } else {
            this.info = 'One of the hundred children of the Behemoth of Job. It\'s a hairy brown creature the size of a mammoth, fully awake now and fuming with frustration, the force of its hot breath hitting you like a gale.'
            this.defense[0] -= 1
            this.defense[1] -= 1
            this.defense[0] = this.defense[0] < 6 ? 6 : this.defense[0]
            this.defense[1] = this.defense[1] < 9 ? 9 : this.defense[1]
        }
        this.attack[2] += this.data.progress
        this.attack[2] = this.attack[2] > 20 ? 20 : this.attack[2]
    }
})

extras['sphinx'] = new MonsterType ({
    name: 'sphinx',
    attack: [0,20,10,0,0,0,],
    defense: [7,10,10,7,7,9,],
    hitpoints: 20,
    level: 3,
    info: `If you attack it and aren\'t prepared it will kill you with one strike. A lioness the size of a hippopotamus with claws like swords and the head of a dark-haired human woman. She has two great black feathered wings folded behind her back.`,
    onDeath: `The sphinx rears up and collapses, dead. There's a small round door on the floor beneath her.`,
    onInstantiate: function () {
        ['Hippolyta', 'Jocasta', 'Matlalcueye', 'Sobekneferu', 'Wadjet', 'Tawaret', 'Xiuhcuetzin', 'Isabella'].map(name => {
            nameMumbler.read(name)
        })
        this.info = `If you attack it and aren\'t prepared it will kill you with one strike. A lioness the size of a hippopotamus with claws like swords and the head of a dark-haired human woman. She has two great black feathered wings folded behind her back. Until the recent fall of the wizards the sphinxes spent the past two five-hundred-year generations of their kind in a loose alliance with them, brokered by ${capitalize(nameMumbler.mumble())} the Sphinx Queen and the Archwizard of ${pick(['Sao Paolo', 'Lima', 'Quito', 'Havana', 'Kingston', 'Veracruz', 'San Antonio'])}.`
    },
    fightEvent: function () {
        if (this.attack[0] === 10) {
            drawString('The sphinx blows fiery hot air at you with her great wings and simultaneously jabs at you with one of her huge claws.')
            if (game.player.shield && (game.player.shield[0] + game.player.shield[3]) > (game.player.shield[1] + game.player.shield[2]) && oneIn(2)) {
                drawString('The sphinx folds her wings back again and gets down on her haunches to strike.')
                this.attack[1] = 27
                this.attack[2] = 3
                this.attack[0] = 0
                this.attack[3] = 0
                this.defense[0] = 5
            }
        } else if (this.attack[1] === 20 && game.player.shield && game.player.shield.bonus[1] > 6 && game.player.shield.bonus[2] > 6 ) {
            drawString('The sphinx rears back warily, not satisfied with the efficacy of her attack.')
            this.attack[1] = 0
            this.attack[2] = 0
            this.attack[0] = 10
            this.attack[3] = 10
            this.defense[0] = 7
        }
    },

    deathEvent: function () {
        let door = new Door ('small round', this.room, false, false)
        let firstRoom = new Room ([door], 1)
        let secondRoom = new Room ([firstRoom.doors[1]], 1)
        let thirdRoom = new Room ([secondRoom.doors[1]], 1)
        let fourthRoom = new Room ([thirdRoom.doors[1]], 0)
        firstRoom.type = `narrow sandstone corridor`
        secondRoom.type = `sandstone atrium`
        thirdRoom.type = `narrow sandstone corridor`
        fourthRoom.type = `hidden chamber`
        door.to = firstRoom

        firstRoom.doors[1].to = secondRoom
        firstRoom.doors[1].color = 'sandstone'
        secondRoom.doors[1].to = thirdRoom
        secondRoom.doors[1].color = 'rune-etched sandstone'
        secondRoom.doors[1].locked = true
        thirdRoom.doors[1].to = fourthRoom
        thirdRoom.doors[1].color = 'sandstone'

        let allRooms = [firstRoom, secondRoom, thirdRoom, fourthRoom]

        allRooms.map(room => {
            room.items = []
            room.monsters = []
            room.mana += dice(3) + dice(4)
        })

        this.room.doors.push(door)

        secondRoom.monsters = [new Monster (secondRoom, monByName(pick([
            'strangling demon',
            'owl of shadows',
            'salt golem',
            'salt golem',
            'sulfur golem',
        ])))]
        thirdRoom.items = [new Item (itemByName(pick([
            'Greek\'s dagger',
            'archwizard\'s letter',
            'trident',
            'purple orchid',
            'pearl of concentrated pestilence',
            'laughing key',
            'djinn\'s sword',
            'angel\'s armor',
            'bottle of whiskey',
        ])), thirdRoom)]
        fourthRoom.monsters = [
            new Monster (fourthRoom, monByName('archwizard'))
        ]
    }
})

extras['archwizard'] = new MonsterType ({
    name: 'archwizard',
    attack: [3,4,4,4,4,9,],
    defense: [7,4,6,3,3,6,],
    hitpoints: 20,
    level: 3,
    info: `A dignified looking old man in black and silver robes with a expression of hateful disdain behind his crinkled greasy black beard. It's the Archwizard of ${pick(['Sao Paolo', 'Lima', 'Quito', 'Havana', 'Kingston', 'Veracruz', 'San Antonio'])}, squirreled away in a hidden bunker to survive the epidemic that claimed the rest of his kind.`,
    drop: [
        new Item (extras['knife']),
        new Item (extras['stake']),
    ],
    fightEvent: function () {
        if (game.player.shield) {
            game.player.shield.bonus = game.player.shield.bonus.map((num, index) => {
                return Math.ceil(num / 2)
            })
            drawString(`A dose of crackling black lightning pulses through your ${game.player.shield.name}, rendering it blackened and brittle.`)
        }
        updateInventory()
    },
    deathEvent: function () {
        game.player.stats.baseAttack[2] = 0
        game.player.stats.baseAttack[5] = 7
        game.player.stats.baseDefense[5] = 4
        updateRoom()
        updateInventory()
        drawString(`You've killed the last of the archwizards.`)
    }
})

extras['merman'] = new MonsterType ({
    name: 'merman',
    attack: [9,0,9,0,0,4],
    defense: [7,2,5,12,0,5,],
    hitpoints: 20,
    level: 3,
    info: `A bearded and gilled amphibian man, naked and clutching a razor-sharp shining trident protectively.`,
    drop: [
        new Item (extras['trident']),
    ]
})

extras['posessed furnace'] = new MonsterType ({
    name: 'posessed furnace',
    attack: [0,0,3,7,1,0,],
    defense: [9,0,3,10,12,1,],
    hitpoints: 20,
    level: 2,
    info: 'A common basement furnace system posessed and corrupted by some kind of malevolent shadowy figure.',
})

extras['salt golem'] = new MonsterType ({
    name: 'salt golem',
    attack: [0,6,24,10,0,0,],
    defense: [12,5,10,8,12,10,],
    hitpoints: 20,
    level: 3,
    info: 'A golem made of blocks of crystallized salt, standing at three times your height and ducking down to not hit its head on the ceiling. At the heart of the man of cubes is a flickering black heart of crackling energy that gives it its seismic strength.',
})

extras['prismatic jailer'] = new MonsterType ({
    name: 'prismatic jailer',
    attack: [0,5,0,0,0,0,],
    defense: [12,12,12,10,12,9,],
    hitpoints: 20,
    level: 3,
    info: 'A golem made of bouncing refracted rainbow light. It stands tall and still, holding a sword of light in its hands.',
    drop: [
        new Item (itemByName(pick(['beam of light', 'seed of light']))),
    ],
})

extras['dark jailer'] = new MonsterType ({
    name: 'dark jailer',
    attack: [0,0,15,0,3,3,],
    defense: [12,12,12,0,12,0,],
    hitpoints: 20,
    level: 3,
    info: 'A pitch-dark silhouette of man.',
    onInstantiate: function () {
        this.info = `A pitch-dark silhouette of a ${pick(['tall man', 'fat man', 'tall woman', 'short woman', 'tall wolfish creature', 'dragonlike creature of human stature', 'enormous bird', 'many-handed demon', 'half-goat sentinel'])}.`
    },
})

extras['evil fish-god'] = new MonsterType ({
    name: 'evil fish-god',
    attack: [0,0,7,0,11,3,],
    defense: [12,12,12,0,12,0,],
    hitpoints: 20,
    level: 3,
    info: 'A greasy dank-black fish god dragged back into existance from its blissfull sleep among the goo of the unbeing.',
    onInstantiate: function () {
        this.drop = [new Item(itemByName(pick(['beam of darkness', 'beam of darkness', 'counterfeit crown'])))]
    },
})

extras['four-faced god'] = new MonsterType ({
    name: 'four-faced god',
    attack: [0,5,0,0,0,0,],
    defense: [12,12,12,10,12,9,],
    hitpoints: 20,
    level: 3,
    info: 'A four-faced head made of winding fractals.',
    onInstantiate: function () {
        this.fightEvent()
    },
    fightEvent: function () {
        // this.drop = []
        this.faces = [
            {
                attack: [0,6,6,12,0,1],
                defense: [9,12,9,12,3,10],
                info: 'enraged crackling black-and-yellow snarl, its brow curled in comtempt as its teeth gnash and spark, preparing to immolate you in a beam of magmic fire',
            },
            {
                attack: [0,0,3,0,0,0],
                defense: [12,12,11,12,12,12],
                info: 'closed-mouthed and closed-eyed face of resigned peace',
            },
            {
                attack: [3,3,3,0,0,20],
                defense: [12,12,11,12,12,12],
                info: 'starry-eyed face of a thousand fates and eternal understanding',
            },
            {
                attack: [7,0,0,0,0,0],
                defense: [5,5,5,5,5,5],
                info: 'despairing open-mouthed grimace of fear and grief',
            },
        ]
        this.face = pick(this.faces)
        this.info = `A four-faced head made of winding fractals. The side facing you is a ${this.face.info}.`
        this.attack = this.face.attack
        this.defense = this.face.defense
    }
})

extras['sulfur golem'] = new MonsterType ({
    name: 'sulfur golem',
    attack: [0,4,20,12,8,0,],
    defense: [12,6,12,6,12,10,],
    hitpoints: 20,
    level: 3,
    info: 'A golem made of blocks of lemon-yellow sulfur, standing at three times your height and ducking down to not hit its head on the ceiling. At the heart of the sulfuric man is a flickering black heart of crackling energy that gives it its seismic strength.',
})

extras['owl of shadows'] = new MonsterType ({
    name: 'owl of shadows',
    attack: [5,12,7,0,0,0,],
    defense: [12,12,12,5,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'When you first look up, the room seems to be without a ceiling, opening into the wide night sky. Then the starry expanse folds into two vast wings, curled around the body of a owl so big it takes up your whole field of vision. The shadowy bird of prey spreads its wings again and swoops down at you.',
    onDeath: `The owl goes up in flames. As it devours the night raptor\'s feathery frame the fire becomes pale silver and emits a flashing glow like moonlight. The owl falls and smolders into thick black smoke, until all that\'s left is the half-digested remains of a ${pick(allMonsterTypes.map(mon => { return mon.name }))} and a spherical egg.`,
    drop: [
        new Item (itemByName('moon egg')),
    ],
})

extras['witch queen'] = new MonsterType ({
    name: 'witch queen',
    attack: [0,0,0,0,8,8,],
    defense: [5,10,8,1,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'The queen of the witches, she\'s crackling with elemental power.',
    drop: [new Item(itemByName(pick(['life-giving herb'])))],
    onInstantiate: function () {
        this.drop = [new Item(itemByName(pick(['magic sword', 'goat-priest\'s rattle', 'phantom\'s blood', 'black stone idol', 'lich\'s eye', 'bottle of demon\'s blood'])))]
    }
}),

extras['witch ranger'] = new MonsterType ({
    name: 'witch ranger',
    attack: [0,0,0,0,8,8,],
    defense: [5,10,8,1,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A witch-blooded night huntress, cloaked in dark leafy garb and wielding a bow.',
    drop: [new Item(itemByName(pick(['witch\'s bow'])))],
}),

extras['witch doctor'] = new MonsterType ({
    name: 'witch doctor',
    attack: [0,0,1,1,2,4,],
    defense: [6,1,2,1,12,12,],
    hitpoints: 20,
    level: 3,
    info: 'A practitioner of ancient herbal remedies and spells.',
    onDeath: 'A glowing white mist escapes through the witch doctor\'s nose and she dies.',
    deathEvent: function () {
        game.player.room.items.push(
            new Item (
                itemByName(pick(['necklace of murderers\' teeth'])),
                game.player.room,
            ),
            new Item (
                itemByName(pick(['assassin\'s gun', 'congealed eye', 'bottle of liquid swords', 'venomous barb', 'Byzantine murder ring', 'obsidian axe', 'demon king\'s note'])),
                game.player.room,
            ),
            new Item (
                itemByName(pick(['moon egg', 'moon egg', 'phantom pestle', 'pearl of concentrated pestilence'])),
                game.player.room,
            ),
        )
    }
})

extras['yeti'] = new MonsterType ({
    name: 'yeti',
    attack: [4,10,9,0,0,0,],
    defense: [9,8,12,0,2,3,],
    hitpoints: 20,
    level: 3,
    info: 'A ravenous devourer of human flesh the size of a polar bear, swathed in long matted white hair and with a wrinkled pink wind-burned face.',
    onDeath: `The yeti collapses dead.`,
    drop: [
        new Item (extras['yeti\'s hide']),
    ],
})

extras['ice walker'] = Object.assign({}, monByName('weaghrai'))
extras['ice walker'].defense = monByName('weaghrai').defense.map(num => { return num })
extras['ice walker'].attack = monByName('weaghrai').attack.map(num => { return num })
extras['ice walker'].name = 'ice walker'
extras['ice walker'].info = `A traveler of frozen plains. Something about its proportions, its long arms or its hunched slim body make it look eerily inhuman. It\'s covered from head to toe in heavy furs and wears slitted goggles to protect from snowblindness.`
extras['ice walker'].defense[5] = 10
extras['ice walker'].defense[1] = 9
extras['ice walker'].defense[4] = 0
extras['ice walker'].defense[3] = 1
extras['ice walker'].defense[2] = 9
extras['ice walker'].attack[0] = 2
extras['ice walker'].onInstantiate = function () {
    let places = ['Lang', 'Rlyeh', 'Nunavut', 'Nocturnalos', 'Carcosa', 'Sargosa', 'Nyarlathotep', 'Scoroso', 'Vladivostok', 'Novgorod', 'Lich', 'Ich']
    places.map(place => {
        if (!Math.round(Math.random())) {
            nameMumbler.read(place)
            nameMumbler.names.push(place)
        }
    })
    this.info = `A traveler of frozen plains who has traversed from the ${pick(['frozen plateau of', 'icy peaks of', 'snow-scoured ridges of'])} ${capitalize(nameMumbler.mumble())} to the ${pick(['land', 'continent', 'plains', 'tundras'])} of ${capitalize(nameMumbler.mumble())} where ${pick(['a cursed black aurora dominates the cold skies', 'the colors of the northern lights dance in the skies through day and night', 'black night rules eternal and the sun is unknown', 'during storms the air grows cold enough to freeze a man\'s blood in his veins'])}. Something about its proportions, its long arms or its hunched slim body make it look eerily inhuman. It\'s covered from head to toe in heavy furs and wears slitted goggles to protect from snowblindness.`
    this.data.baseDefense = this.defense.map(stat => { return stat })
    this.data.baseAttack = this.attack.map(stat => { return stat })
    this.data.arsenal = [
        itemByName('ice axe'), itemByName('ice axe'), itemByName('ice axe'), itemByName('ice axe'),
        itemByName('stick of dynamite'), itemByName('stick of dynamite'), itemByName('stick of dynamite'),
        itemByName('black stone idol'), itemByName('black stone idol'),
        itemByName('primordial glob'),
        itemByName('revolver'),
        itemByName('moon egg'),
        itemByName('bottle of lightning'),
        itemByName('bottle of black goo'),
    ];
    this.data.notify = function () {
        drawString(`The ice walker withdraws a ${this.data.item.name} from the tattered folds of its many-layered furs.`);
        this.info = `A traveler of frozen plains. Something about its proportions, its long arms or its hunched slim body make it look eerily inhuman. It\'s covered from head to toe in heavy furs and wears slitted goggles to protect from the glare of the snowy ground. It's ${this.data.item.slot === 'weapon' ? 'armed with' : 'defending itself with' } with a ${this.data.item.name}.`;
    }.bind(this)
}

extras['frozen corpse'] = new MonsterType ({
    name: 'frozen corpse',
    attack: [0,1,0,0,0,0,],
    defense: [12,10,7,5,12,12,],
    hitpoints: 20,
    level: 1,
    info: 'A walking frost-bitten corpse, its skin pale except for its blackened nose, ears, and fingers. Its tongue and eyes have been eaten out by scavengers; it paws blindly for your face.',
})

extras['frostbiter'] = new MonsterType ({
    name: 'frostbiter',
    attack: [2,0,0,0,0,2,],
    defense: [12,12,12,2,12,0,],
    hitpoints: 20,
    level: 3,
    info: `A icy-breathed wraith, the spirit of a ${pick(['mountain climber', 'hunter', 'shaman', 'explorer', 'ill-fated scientist', 'ill-fated kitchen worker'])} who died naked and frostbitten and is determined to pay its suffering forward to the living.`,
    onDeath: 'With a howl like a wolf the frostbiter dissipates.',
    drop: [new Item(extras['phantom\'s blood'])]
})

extras['chef\'s ghost'] = Object.assign({}, monByName('weaghrai'))
extras['chef\'s ghost'].name = 'chef\'s ghost'
extras['chef\'s ghost'].info = `The infuriated ghost of a cuisinier, levitating around the kitchen dressed in a white apron dotted with scarlet stab wounds, incurred when he was betrayed and murdered by his sous-chef.`
extras['chef\'s ghost'].attack = [0,0,0,0,0,0,]
extras['chef\'s ghost'].defense = [12,12,12,11,5,3,]
extras['chef\'s ghost'].onInstantiate = function () {
    this.data.baseDefense = this.defense.map(stat => { return stat })
    this.data.baseAttack = this.attack.map(stat => { return stat })
    this.data.arsenal = [
        itemByName('kitchen knife'),
        itemByName('paring knife'),
        itemByName('cleaver'),
        itemByName('cast iron pan'),
        itemByName('doughroller'),
        itemByName('hot hot dish'),
    ];
    this.data.notify = function () {
        drawString(`The chef ${pick(['cackles', 'screams'])} and withdraws a ${this.data.item.name}.`);
        this.info = `The infuriated ghost of a cuisinier, levitating around the kitchen dressed in a white apron dotted with scarlet stab wounds, incurred when he was betrayed and murdered by his sous-chef. He's getting ready to hurl a ${this.data.item.name} at you.`;
    }.bind(this)
}

extras['sous-chef\'s skeleton'] = new MonsterType ({
    name: 'sous-chef\'s skeleton',
    attack: [2,5,0,0,0,0,],
    defense: [12,0,0,6,12,0,],
    hitpoints: 20,
    level: 1,
    info: 'A reanimated human skeleton dressed in a white apron and wielding a kitchen knife, the bones of a traitorous sous-chef cursed to continue his shift long after his death.',
    drop: [
        new Item (itemByName('kitchen knife')),
    ],
})

extras['zombie'] = new MonsterType ({
    name: 'zombie',
    attack: [0,2,8,0,3,1,],
    defense: [12,0,8,0,12,8,],
    hitpoints: 20,
    level: 2,
    info: 'A sickly pale body with dark rings under its eyes and rot starting to creep in around its gums and lips. It\'s approaching with arms outstretched to strangle you.',
    onDeath: 'The zombie collapses. It\'s definitely dead.',
    onInstantiate: function () {
        this.data.fullHealth = 20
    },
    deathEvent: function () {
        if (this.data.fullHealth > 7) {
            let lockedDoors = game.player.room.doors.filter(door => {
                return door.locked
            })
            window.setTimeout(() => {
                let zombie = new Monster (
                    this.room, monByName('zombie')
                )
                lockedDoors.map(door => {
                    door.locked = true
                })
                this.room.monsters.push(zombie)
                drawString('The zombie staggers back to its feet.')
                zombie.data.fullHealth = dice(this.data.fullHealth - 2)
                zombie.hitpoints = zombie.data.fullHealth
                updateRoomContents()
            }, 1500)
        } else {
            window.setTimeout(() => {
                drawString('The zombie remains lifeless. A tarantula crawls out of its mouth.')
                this.room.monsters.push(new Monster (
                    this.room, monByName('tarantula')
                ))
                updateRoomContents()
            }, 2500)
        }
    }
})

extras['tarantula'] = new MonsterType ({
    name: 'tarantula',
    attack: [0,0,0,0,1,0,],
    defense: [12,0,0,0,0,0,],
    hitpoints: 20,
    level: 1,
    info: 'A hairy spider the size of your hand.',
})

extras['spider with hands'] = new MonsterType ({
    name: 'spider with hands',
    attack: [0,0,13,0,0,0,],
    defense: [8,0,3,2,9,1,],
    hitpoints: 20,
    level: 1,
    info: 'A giant spider with eight huge hairy white hands at the ends of its legs.',
})

extras['griffin'] = new MonsterType ({
    name: 'griffin',
    attack: [1,15,3,3,0,0,],
    defense: [1,8,7,4,12,3,],
    hitpoints: 20,
    level: 3,
    info: `A raging goggle-eyed barrel-chested beast with a long beak like a ibis. It's lashing wildly with its overly long lizard-like claws as it flaps its enormous feathery wings at you.`,
    onDeath: `The griffin collapses, its dying heart beating the beast\'s molten gold blood out onto the ground until it stops.`,
    drop: [
        new Item (extras['griffin\'s dollar']),
    ],
})

extras['ancient king'] = new MonsterType ({
    name: 'ancient king',
    attack: [0,0,0,0,3,0,],
    defense: [1,8,7,4,12,3,],
    hitpoints: 0,
    level: 3,
    info: `A impossibly old king crowned in gold feathers, with a long white beard and papery skin.`,
    onDeath: `The king collapses with the slightest touch and is dust now.`,
    drop: [
        new Item (itemByName('griffin sword')),
    ],
})

extras['holy knight'] = new MonsterType ({
    name: 'holy knight',
    attack: [3,7,1,0,0,9,],
    defense: [8,11,6,0,0,12,],
    hitpoints: 20,
    level: 3,
    info: `A paladin of an ancient kingdom, sworn to defend the cult of a long-dead god.`,
    onDeath: `The knight is killed. He mutters a prayer then dies.`,
    drop: [new Item(itemByName(pick([
        'paladin\'s shield', 'magic sword'
    ])))],
    onInstantiate: function () {
        this.info += ` His armor is emblazoned with ${pick(['a blood-red calf', 'a goat-shaman\'s rattle', 'silver hands', 'black hands', 'a white-eyed raven', 'stars', 'a image of the sun', 'stars', 'stars', 'stars'])}`
    }
})

extras['black knight'] = new MonsterType ({
    name: 'black knight',
    attack: [2,11,5,0,0,0,],
    defense: [8,11,6,12,0,0,],
    hitpoints: 20,
    level: 3,
    info: `A knight whose armor and shield have had been painted over with a thick inky black wax.`,
    onDeath: `The black knight is killed.`,
    drop: [new Item(itemByName(pick([
        'executioner\'s sword', 'black shield'
    ])))],
    onInstantiate: function () {
        this.info += ' ' + pick(['He\'s got to be at least seven feet tall', 'He\'s broad and study looking as a house.', 'He\'s lithe and quick, jumping between the balls of his feet, prepared for a fight.', 'The coating is a special mixture that protects him against fire.', 'The coating is a special mixture that protects him against fire.'])
    }
})

extras['drunken knight'] = new MonsterType ({
    name: 'drunken knight',
    attack: [1,8,1,0,0,0,],
    defense: [2,11,8,0,0,0,],
    hitpoints: 20,
    level: 3,
    info: `A tottering knight in hastily donned armor.`,
    onDeath: `The drunken knight is killed.`,
    drop: [new Item(itemByName('black shield'))],
    onInstantiate: function () {
        this.info += ` He smells like ${pick(['wine', 'sour beer', 'pear cider', 'spiced wine', 'plum liquor', 'apple wine'])}`
        this.drop = [new Item(itemByName(pick([
            'griffin\'s dollar', 'black shield', 'executioner\'s sword', 'magic sword', 'wraith\'s sword', 'djinn\'s sword', 'black shield', 'crusader\'s shield', 'paladin\'s shield', 'cavalry shield', 'plague knight\'s sword'
        ])))]
        let drop = this.drop[0]
        if (drop.slot === 'weapon') {
            this.attack = drop.bonus
        } else if (drop.slot === 'shield') {
            this.defense = drop.bonus
        }
        this.info += `, and he\'s armed himself with a ${drop.name}.`
    }
})

extras['guardian knight'] = new MonsterType ({
    name: 'guardian knight',
    attack: [9,10,4,0,0,0,],
    defense: [5,11,8,0,0,12,],
    hitpoints: 20,
    level: 3,
    info: `A tall knight.`,
    onDeath: `The knight is killed.`,
    drop: [new Item(itemByName('griffin shield'))],
    onInstantiate: function () {
        this.drop = [new Item(itemByName(pick([
            'griffin shield', 'magic sword', 'flaming sword', 'frost shield', 'lion\'s hide', 'archwizard\'s letter', 'yeti\'s hide', 'griffin shield', 'magic sword', 'flaming sword', 'frost shield', 'necromancer\'s sword',
        ])))]
        let drop = this.drop[0]
        if (drop.slot === 'weapon') {
            this.attack = drop.bonus
        } else if (drop.slot === 'shield') {
            this.defense = drop.bonus
        }
        this.info = `A tall knight sworn to keep the person of the Griffin King from death or else die himself. He bears a ${drop.name}.`
    }
})

extras['dismounted griffin knight'] = new MonsterType ({
    name: 'dismounted griffin knight',
    attack: [9,10,4,0,0,0,],
    defense: [5,12,12,0,0,12,],
    hitpoints: 20,
    level: 3,
    info: `A tall knight.`,
    onDeath: `The knight is killed.`,
    drop: [new Item(itemByName('griffin shield'))],
    onInstantiate: function () {
        this.drop = [new Item(itemByName(pick([
            'griffin shield',
        ])))]
        let drop = this.drop[0]
        this.info = `A tall knight sworn to keep the person of the Griffin King from death or else die himself.`
    }
})

extras['wizard knight'] = new MonsterType ({
    name: 'wizard knight',
    attack: [11,4,1,0,0,0,],
    defense: [5,11,8,0,0,12,],
    hitpoints: 20,
    level: 3,
    info: `A mad knight.`,
    onDeath: `The knight is killed.`,
    drop: [new Item(itemByName('goat-priest\'s rattle'))],
    onInstantiate: function () {
        this.drop = [new Item(itemByName(pick([
            'goat-priest\'s rattle', 'necromancer\'s sword', 'plague knight\'s sword', 'sorceled shield'
        ])))]
        let drop = this.drop[0]
        if (drop.slot === 'weapon') {
            this.attack = drop.bonus
        } else if (drop.slot === 'shield') {
            this.defense = drop.bonus
        }
        this.info = `A mad cackling knight. He carries a ${drop.name}.`
    }
})

extras['mounted knight'] = new MonsterType ({
    name: 'mounted knight',
    attack: [0,9,0,0,0,0,],
    defense: [0,6,7,0,0,0,],
    hitpoints: 10,
    level: 3,
    info: 'A knight astride a huge black warhorse.',
    onDeath: 'The horse tumbles to the ground and the knight leaps from his saddle.',
    deathEvent: function () {
        game.player.room.monsters.push(new Monster (
            game.player.room,
            this.knightType,
        ))
    },
    onInstantiate: function () {
        this.knightType = itemByName(pick([
            'black knight', 'holy knight', 'guardian knight', 'drunken knight', 'wizard knight'
        ]))
        this.info = `A ${this.knightType.name} astride a huge ${pick(['palomino', 'black', 'pale', 'black', 'iron-gray', 'brown', 'bronze-colored'])} warhorse.`
        this.attack = this.knightType.attack.map(num => { return num })
        this.defense = this.knightType.defense.map(num => { return num })
        this.defense[0] = 0
        this.defense[1] = 11
        this.defense[2] = 10
    }
})


extras['goat-knight'] = new MonsterType ({
    name: 'goat-knight',
    attack: [0,9,0,0,0,0,],
    defense: [0,6,7,0,0,0,],
    hitpoints: 10,
    level: 3,
    info: 'A half-goat knight astride a huge steed.',
    onDeath: 'The steed tumbles to the ground and the rider leaps from his saddle.',
    deathEvent: function () {
        game.player.room.monsters.push(new Monster (
            game.player.room,
            this.knightType,
        ))
    },
    onInstantiate: function () {
        this.steedType = monByName(pick([
            'angry triceratops', 'wyrm', 'mechanical bear', 'hellhound', 'moose', 'sandeater'
        ]))
        this.knightType = itemByName(pick([
            'half-goat swordsman', 'half-goat bowman'
        ]))
        this.info = `A ${this.knightType.name} riding a ${this.steedType.name}.`
        this.onDeath = `The ${this.steedType.name} falls dead and the ${this.knightType.name} leaps to his feet to fight.`
        this.attack = this.knightType.attack.map(num => { return num })
        this.defense = this.steedType.defense.map(num => { return num })
    }
})

extras['griffin knight'] = new MonsterType ({
    name: 'griffin knight',
    attack: [0,9,0,0,0,0,],
    defense: [0,6,7,0,0,0,],
    hitpoints: 10,
    level: 3,
    info: 'A knight astride a huge griffin.',
    onDeath: 'The griffin tumbles to the ground and the rider leaps from his saddle.',
    deathEvent: function () {
        game.player.room.monsters.push(new Monster (
            game.player.room,
            this.knightType,
        ))
        game.player.room.monsters.push(new Monster (
            game.player.room,
            this.steedType,
        ))
    },
    onInstantiate: function () {
        this.steedType = monByName(pick([
            'griffin'
        ]))
        this.knightType = itemByName(pick([
            'dismounted griffin knight'
        ]))
    }
})

extras['white lion'] = new MonsterType ({
    name: 'white lion',
    attack: [0,7,0,7,0,4,],
    defense: [7,7,7,7,7,7,],
    hitpoints: 20,
    level: 3,
    info: 'A lion made of light dancing in the void, you can\'t tell if it\'s the size of a cub or a planet.',
    onDeath: 'The lion is devoured by darkness.',
    fightEvent: function () {
        this.defense = this.attack.map((num, i) => {
            num -= 2
            let playerNum = game.player.stats.attack[i]
            if (playerNum > num) {
                num = playerNum
            }
            return num < 12 ? num : 12
        })
    }
})

extras['black lion'] = new MonsterType ({
    name: 'black lion',
    attack: [1,1,1,1,1,1,],
    defense: [8,8,8,4,8,8,],
    hitpoints: 20,
    level: 3,
    info: 'A lion made of shadow brooding in the void, you can\'t tell if it\'s the size of a cub or a planet.',
    onDeath: 'The lion is blinded and broken by many-colored light.',
    fightEvent: function () {
        this.attack = [0, 0, 0, 0, 0, 0]
        this.attack[Math.floor(Math.random() * 6)] += 10
        this.attack[Math.floor(Math.random() * 6)] += 6
    }
})

extras['procrustean tailor'] = new MonsterType ({
    name: 'procrustean tailor',
    attack: [1,1,1,1,1,1,],
    defense: [8,8,8,4,8,8,],
    hitpoints: 20,
    level: 3,
    info: 'A disgraced tailor who in his madness would not alter the clothes he made to fit his clients, instead insisting on altering his clients to fit their new  outfits. His sharply cut and perfectly fitting suit is splattered with blood.',
    onDeath: 'The tailor collapses, weeping and holding his face in his bloodsoaked hands, then dies.',
    drop: [
        new Item (extras['hacksaw']),
    ],
    onInstantiate: function () {
        this.drop = [
            new Item(itemByName(pick(['buzzsaw', 'hacksaw', 'sewing needle', 'scissors', 'bone cutter', 'scalpel', 'mithril vest', 'lion\'s hide', 'clergyman\'s dagger', 'straightrazor', 'revolver', ]))),
            new Item(itemByName(pick(['buzzsaw', 'hacksaw', 'sewing needle', 'scissors', 'bone cutter', 'ill-fitting suit', 'lunatic tome']))),
            new Item(itemByName(pick(['buzzsaw', 'hacksaw', 'bone cutter'])))
        ]
    },
})
