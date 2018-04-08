var extras = extras ? extras : {}

extras['lich\'s eye'] = new ItemType (
    'lich\'s eye', 'weapon',
    [0,0,0,0,10,0],
    '9',
    'The lich\'s eye rots away to sludge in the same manner any living thing would with time.',
    'A green eye with the power to kill those it looks upon.'
),

extras['Byzantine murder ring'] = new ItemType (
    'Byzantine murder ring', 'weapon',
    [0,13,0,0,0,0],
    '7',
    'The murder ring shrinks suddenly, slicing off your finger from your hand before diminishing out of sight with a stench like methane. It\'s gone.',
    'A bronze ring embedded with a mosaic of brightly colored near-microscopic stones. Imbued by the holy men of ancient Constantinople with the power to summon throat-cutting demons against one\'s enemies.'
)

extras['cosmic ball'] = new ItemType (
    'cosmic ball', 'weapon',
    [0,0,10,0,0,0],
    '12',
    'The cosmic ball seems to reaccrue its natural weightiness all at once. It plummets through the floor, vanishing into the earth.',
    'An impossibly dense sphere made of a mattle black substance that absorbs all light. Despite its great mass, it\'s as easy to hold and throw as a much lighter ball would be.'
)

extras['djinn\'s sword'] = new ItemType (
    'djinn\'s sword', 'weapon',
    [0,5,0,7,0,0],
    '13',
    'The djinn\'s sword becomes fire in your hands, returning to the plane of its creator.',
    'The curved blazing blade of a fire-born djinn, given to one of Saladin\'s lietenants to help defend Jerusalem against the western Crusaders.'
)

extras['spidersilk sling'] = new ItemType (
    'spidersilk sling', 'weapon',
    [7,0,7,0,0,0],
    '11',
    'The spidersilk sling is worn out after centuries of use and dissipates.',
    'A throwing sling woven by the Norse craftsmen of Greenland and the native people of Canada working in concert, later used in the war between the two.'
)

extras['black stone idol'] = new ItemType (
    'black stone idol', 'shield',
    [1,1,1,1,9,9],
    14,
    'With a shriek like the grinding of a mountain out from the mantle the earth, the strange black stone idol you\'re carrying seems to slip between a fold or a crack in the thin air and it falls into a hole of sickly orange light. It\'s gone.',
    'A carved idol in the likeness of a octopus-like deity. You can\'t recognize what the stone is made of but it\'s engraved with runes promising protection to all worshippers.'
)

extras['razor-sharp bone'] = new ItemType (
    'razor-sharp bone', 'weapon',
    [1,7,0,1,0,0],
    13,
    'The razor-sharp bone you\'re carrying splinters into a dozen pieces with a shower of white sparks.',
    'A four foot long white bone that\'s either been sharpened or naturally comes to a razor-honed edge. You could hold one end and use it as a weapon.'
)

extras['laughing key'] = new ItemType (
    'laughing key', 'shield',
    [1,1,1,1,1,1],
    32,
    'Your laughing key sighs and is silent, then rusts away to dust.',
    'It\'s laughing because it doesn\'t unlock anything.'
)

extras['molar'] = new ItemType (
    'molar', 'weapon',
    [0,0,0,0,0,1],
    1,
    'The molar breaks.',
    'A human molar tooth.'
)

extras['death\'s beak'] = new ItemType (
    'death\'s beak', 'weapon',
    [dice(12), dice(5), dice(3) + dice(3), dice(3), dice(6) + dice(6) + dice(6), dice(3) - 1],
    dice(6) + dice(6) + dice(6) + dice(6) + dice(6) + dice(6),
    'DEATH\'S BEAK IS UNDONE.',
    'The beak of an abominable being you encountered beyond the shadow of time. It wriggles in your hands seeking breathing flesh to kill.'
)

extras['kraken\'s ink sac'] = new ItemType (
    'kraken\'s ink sac', 'weapon',
    [0,0,0,7,15,0],
    1,
    'The ink sac explodes on impact.',
    'An inky-black pouch near bursting with briny and corrosive fluid.'
)

extras['pair of earthquake boots'] = new ItemType (
    'pair of earthquake boots', 'weapon',
    [0,0,14,0,0,0],
    24,
    'The soles of the sea-god\'s earthquake boots wear through and they stop working.',
    'The boots of the sea-god, cobbled out of the skin of the Earthserpent and adorned with the eyes of Maltis. Stomp in them to shake the earth.',
)

extras['goat\'s armor'] = new ItemType (
    'goat\'s armor', 'shield',
    [4,11,8,2,7,2,],
    19,
    'Your goat\'s armor breaks.',
    'Tightly-crafted black armor engraved with a eye with two perpendicular roads passing through it.',
)

extras['mithril vest'] = new ItemType (
    'mithril vest', 'shield',
    [12,3,0,0,0,0],
    90,
    'You\'ve run out of mithril.',
    'A vest of shining white metal linked together into chainmail in the subterranean forges of the mountain dwarves of Central Africa.'
)
