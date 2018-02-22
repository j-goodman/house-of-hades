var MonsterType = function (ob) {
    var i;
    this.name = ob.name;
    this.attack = ob.attack;
    this.defense = ob.defense;
    this.hitpoints = ob.hitpoints;
    this.info = ob.info;
    this.level = ob.level;
    this.onDeath = ob.onDeath;
    this.deathEvent = ob.deathEvent;
};

var Monster = function (room, type) {
    this.room = room;
    this.name = type.name;
    this.attack = type.attack;
    this.defense = type.defense;
    this.hitpoints = type.hitpoints;
    this.level = type.level;
    this.info = type.info;
    this.onDeath = type.onDeath;
    this.deathEvent = type.deathEvent;
};

Monster.prototype.die = function () {
    var i;
    drawString(this.onDeath || 'It\'s dead.');
    if (this.deathEvent) {
      this.deathEvent();
    }
    this.room.mana += 4;
    for (i=0 ; i<this.room.monsters.length ; i++) {
        if (this === this.room.monsters[i]) {
            this.room.monsters = this.room.monsters.slice(0,i).concat(this.room.monsters.slice(i+1,this.room.monsters.length));
        }
    }
};
// levels go from 1-3, most should be 3.
var allMonsterTypes = [
    new MonsterType ({
        name: 'dragon',
        attack: [0,6,6,12,0,1],
        defense: [12,10,9,12,3,12],
        hitpoints: 20,
        level: 3,
        info: 'It\'s a feathered serpentine animal the size of a passenger jet. Conventional attacks would be risky, and even if you could try to poison it, you\'d probably end up roasted first.',
        onDeath: 'The dragon rears its head back and shrieks to rattle the foundations of the mighty house. Dust showers down from the rafters as it collapses onto the floor dead.'
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
        attack: [4,0,0,0,2,6,],
        defense: [0,8,8,3,12,12,],
        hitpoints: 20,
        level: 3,
        info: 'Immune to poisons and curses, and supposedly only killable by piercing its heart.',
        onDeath: 'The vampire hisses in agony before attempting to turn into a bat and dieing mid-transformation.'
    }),
    new MonsterType ({
        name: 'werewolf',
        attack: [1,7,4,0,0,0,],
        defense: [3,4,4,2,1,3,],
        hitpoints: 20,
        level: 2,
        info: 'A creature like a mangy flea-ridden wild dog reared to her hind legs with a look of ferocious hunger in her eyes.',
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
    }),
    new MonsterType ({
        name: 'ghoul',
        attack: [2,3,0,0,1,0,],
        defense: [2,1,0,0,8,0,],
        hitpoints: 20,
        level: 2,
        info: 'A emaciated human with blood and stringy raw meat clinging around his mouth and in his teeth and an expression of lunatic hunger on his face. It reeks of dead flesh.',
    }),
    new MonsterType ({
        name: 'bee person',
        attack: [3,0,0,0,3,0,],
        defense: [6,3,0,0,1,0,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s part bee but also part person.',
    }),
    new MonsterType ({
        name: 'fire elemental',
        attack: [0,0,0,8,0,0,],
        defense: [4,4,4,12,2,0,],
        hitpoints: 20,
        level: 3,
        info: 'When it holds a single shape for a flickering moment it\'s that of a woman with blazing eyes and mouth. Most vulnerable to magic attacks.',
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
        attack: [5,0,0,0,4,0,],
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
    }),
    new MonsterType ({
        name: 'wendigo',
        attack: [7,7,7,0,0,0,],
        defense: [10,10,10,0,0,0,],
        hitpoints: 20,
        level: 3,
        info: 'A savagely deadly creature of the boreal forests, the tortured body of one who was forced to eat their own kind to survive, and now must continue or die. Its body is numb to pain and can weather most physical attacks.',
    }),
    new MonsterType ({
        name: 'rabid wizard',
        attack: [0,0,0,0,0,9,],
        defense: [6,1,2,0,0,4,],
        hitpoints: 20,
        level: 3,
        info: 'He looks like he\'s not used to being around other people. His eyes are constantly moving around the room and his beard is wild and matted. His fingers and ears are crackling with hairswidth bolts of black lightning.',
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
        attack: [0,0,1,0,1,2,],
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
    }),
    new MonsterType ({
        name: 'mad gasser',
        attack: [0,0,0,0,8,0,],
        defense: [4,0,5,0,10,1,],
        hitpoints: 20,
        level: 3,
        info: 'It\'s too cowardly to attack up close so it protects its face with a gas max and sprays toxic fumes at anything it sees breathing. It\'s vulnerable to slashing and fire.',
    }),
    new MonsterType ({
        name: 'fanged ghost',
        attack: [3,0,2,0,0,0,],
        defense: [9,8,0,7,10,2,],
        hitpoints: 20,
        level: 2,
        info: 'Only its teeth can still interact with the material plane.',
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
    }),
    new MonsterType ({
        name: 'mechanical bear',
        attack: [0,4,7,0,0,0,],
        defense: [4,2,2,0,7,0,],
        hitpoints: 20,
        level: 2,
        info: 'A monstrous automaton the size and shape of a North American Grizzly Bear. It spits acrid black smoke from its mouth, nose, and eyes as it bears down on you.',
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
