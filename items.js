var ItemType = function (name, slot, bonus, ammo, spentMessage, info) {
    this.name = name;
    this.bonus = bonus;
    this.ammo = ammo;
    this.info = info;
    this.slot = slot;
    this.spentMessage = spentMessage;
};

var Item = function (type) {
    this.name = type.name;
    this.slot = type.slot;
    this.bonus = type.bonus;
    this.ammo = type.ammo;
    this.spentMessage = type.spentMessage;
    this.info = type.info;
};

var allItemTypes = [
    // pierce, slash, crush, burn, poison, curse


    /*///
    WEAPONS
    /*///

    new ItemType (
        'revolver', 'weapon',
        [6,0,0,1,0,0],
        6,
        'Your revolver\'s chamber spins and clicks -- you\'re out of bullets.',
        'It\'s a old-fashioned six-shooter. Deals powerful pierce damage.'
    ),
    new ItemType (
        'crowbar', 'weapon',
        [0,0,3,0,0,0],
        '12',
        'Your crowbar breaks in your hand. It was pretty rusty anyway.',
        'A crowbar! Deals moderate crush damage.'
    ),
    new ItemType (
        'antique saber', 'weapon',
        [1,3,0,0,0,0],
        '12',
        'The saber breaks into two pieces as you wield it. That thing really was old.',
        'A old steel cavalry saber. Deals moderate slash damage.'
    ),
    new ItemType (
        'hunting knife', 'weapon',
        [2,2,0,0,0,0],
        '16',
        'Your hunting knife goes blunt.',
        'It\'s a steel hunting knife with a wood handle. Not too powerful, but deals slash and pierce damage and should last you a while.'
    ),
    new ItemType (
        'cursed pistol', 'weapon',
        [4,0,0,0,0,4],
        4,
        'As your pistol\'s chamber spins to the fifth slot a violet ghost drips out of the barrel, weeping and sinking into the floor like a puddle while the gun leaks scalding water and disintegrates.',
        'It\'s a revolver with some kind of miasmic shade emanating from it. Deals powerful pierce and curse damage.'
    ),
    new ItemType (
        'firebomb', 'weapon',
        [0,0,2,8,0,0],
        1,
        'The smoke from the firebomb clears leaving a dark crater.',
        'A crude homemade firebomb. Only good for one use, but should deal poweful burn damage.'
    ),
    new ItemType (
        'poison crossbow', 'weapon',
        [4,0,0,0,4,0],
        4,
        'The poison crossbow is out of bolts.',
        'A crossbow with four bolts coated in a foul-smelling green venom. Deals powerful pierce and poison damage.'
    ),
    new ItemType (
        'sacred tomohawk', 'weapon',
        [0,5,0,1,0,7],
        5,
        'Your tomohawk explodes into smoke, dissipating through the mansion\'s walls with a cry like a speared boar dying.',
        'A obsidian tomohawk decorated with dragonfeathers. Deals very powerful slash and curse damage, and also whispers reckless advice very quietly.'
    ),
    new ItemType (
        'woodaxe', 'weapon',
        [0,3,2,0,0,0],
        12,
        'Your woodaxe breaks in your hand.',
        'A old axe for splitting wood. Deals moderate slash damage.'
    ),
    new ItemType (
        'evil eye', 'weapon',
        [0,0,0,0,0,4],
        5,
        'Your evil eye amulet turns into fire and vanishes with a whistling sound like a kettle.',
        'A jet black amulet with a curious eye painted on it. Adds moderate curse damage to your attacks.'
    ),
    new ItemType (
        'blowgun', 'weapon',
        [0,0,0,0,7,0],
        3,
        'You\'re out of darts.',
        'A breath powered dart gun with three venemous projectiles. Deals severe poison damage.'
    ),
    new ItemType (
        'atalatl', 'weapon',
        [4,0,0,0,0,0],
        7,
        'You\'re out of atalatl spears.',
        'A spear thrower with seven spears. Deals moderate pierce damage.'
    ),
    new ItemType (
        'ghostcandle', 'weapon',
        [0,0,0,5,0,0],
        4,
        'The ghostcandle burns down to nothing and vanishes with a mournful whale\'s call.',
        'A fire spirit confined to a black wax candle. Adds moderate burn damage to all your attacks.'
    ),
    new ItemType (
        'torch', 'weapon',
        [0,0,2,3,0,0],
        7,
        'Your torch breaks in two.',
        'A long wooden torch. You can wield it like a club to deal moderate crush and burn damage.'
    ),
    new ItemType (
        'hand grenade', 'weapon',
        [4,1,5,3,0,0],
        1,
        'The pieces of the grenade rattle into stillness on the floor.',
        'It\'s a military issue hand grenade.'
    ),
    new ItemType (
        'laughing mask', 'weapon',
        [0,0,0,0,0,16],
        1,
        'The mask\'s mouth bites into its own upper lip and then it eats itself while still laughing like a drunk.',
        'A powerful cursed object that\'s struggling to keep back a high-pitched squealing laugh.'
    ),
    new ItemType (
        'thompson gun', 'weapon',
        [8,0,0,2,0,0],
        3,
        'Your thompson gun is out of ammo.',
        'A mass-market submachine gun, favorite of rumrunners and colonial enforcers. It spends a lot of ammo at once, so you\'ll only get three bursts out of it.'
    ),
    new ItemType (
        'case of chemical bombs', 'weapon',
        [0,1,0,4,5,0],
        3,
        'You\'re out of chemical bombs.',
        'Three bombs fueled with volatile caustic chemicals.'
    ),
    new ItemType (
        'silver rifle', 'weapon',
        [8,0,0,0,0,8],
        3,
        'Your rifle\'s out of silver bullets.',
        'A chrome-painted rifle loaded with three silver bullets. Deals powerful pierce and curse damage.'
    ),
    new ItemType (
        'executioner\'s sword', 'weapon',
        [0,9,0,0,0,0],
        9,
        'Your sword breaks at the handle.',
        'A massive stainless steel blade that deals powerful slashing damage.'
    ),
    // pierce, slash, crush, burn, poison, curse

    /*///
    SHIELDS
    /*///

    new ItemType (
        'riot shield', 'shield',
        [0,4,4,0,0,0],
        14,
        'Your shield breaks.',
        'It\'s a paramilitary riot shield.'
    ),
    new ItemType (
        'wand of oceans', 'shield',
        [0,0,0,9,0,0],
        7,
        'The wand of oceans bursts into flames and turns to ash.',
        'The wand reacts to heat by spitting oceanwater. It\'ll be useful to defend against fire attacks.'
    ),
    new ItemType (
        'antidote crown', 'shield',
        [0,2,0,0,8,0],
        10,
        'The antidote crown breaks and falls from your head in pieces.',
        'Said to be the crown of the legendary Antidote Queen. Protects the wearer from poisons.'
    ),
    new ItemType (
        'canned ghost', 'shield',
        [1,1,1,1,1,7],
        5,
        'Your canned ghost bursts free during the fight. He flies west to murder all his still-living descendants.',
        'A hermetically sealed ghost who will protect you from curse attacks in exchange for vague promises to free him at some point.'
    ),
    new ItemType (
        'suit of bronze armor', 'shield',
        [1,2,3,0,0,1],
        9,
        'Your armor cracks and breaks, falling apart.',
        'A hoplite\'s armor, forged out of bronze. It\'s become decayed as if over millenia, but it could provide some defense against slashing and crushing.'
    ),
    new ItemType (
        'posessed bible', 'shield',
        [8,3,1,0,0,0],
        3,
        'The bible falls to the ground inert and stays still for ten full minutes then turns into a goldfish which dies.',
        'This posessed bible will dive in front of you to defend against piercing attacks.'
    ),
    new ItemType (
        'life-giving herb', 'shield',
        [1,3,3,0,4,0],
        7,
        'Your life-giving herb rots away to nothing.',
        'A wizard used his magic to steal the life force from a child and store it in this herb. Wear it to increase your resistance to poison and physical damage.'
    ),
    new ItemType (
        'bag of devil\'s gold', 'shield',
        [5,4,0,7,0,0],
        5,
        'You\'re out of devil\'s gold.',
        'Somebody won this gold from the devil. Use it to bribe fire and sharp objects out of harming you.'
    ),
    new ItemType (
        'oak stick', 'shield',
        [0,7,3,0,0,0],
        20,
        'Your oak stick splinters into three pieces.',
        'A sturdy oak branch. Use it to block slashing and crushing attacks.'
    ),
    // pierce, slash, crush, burn, poison, curse
];
