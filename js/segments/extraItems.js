var extras = extras ? extras : {}

extras['lich\'s eye'] = new ItemType (
    'lich\'s eye', 'weapon',
    [0,0,0,0,10,0],
    '9',
    'The lich\'s eye rots away to sludge in the same manner any living thing would with time.',
    'A green eye with the power to kill those it looks upon.'
)

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
    'A impossibly dense sphere made of a mattle black substance that absorbs all light. Despite its great mass, it\'s as easy to hold and throw as a much lighter ball would be. It\'s held at the end of a long white chain.'
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
    'The beak of a abominable being you encountered beyond the shadow of time. It wriggles in your hands seeking breathing flesh to kill.'
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
    'A vest of shining white metal linked together into chainmail in the subterranean forges hidden deep beneath the Tilwezembe Mine in Central Africa.'
)

extras['angel\'s armor'] = new ItemType (
    'angel\'s armor', 'shield',
    [2,2,3,0,8,8],
    9,
    'Your angel\'s armor turns into sunlight and vanishes.',
    'Armor forged by the almighty himself to protect his most loyal representatives.',
    null,
    null,
    function () {
        this.info = `Armor forged by the almighty himself to protect his most loyal representatives ${pick([
          `during the Undoing Wars of the sixtieth century BC.`,
          `during the war against the Titans and the Gigantes, when the hekatonkheires were slain.`,
          `during the Gravity Wars.`,
          `when the ten planets rose in revolt against their creator.`,
          `from the fires of the suns they were tasked with forging.`,
          `from the fires of the suns they were tasked with forging.`,
          `from the crushing deeps of the gravity wells through which they travel the universe.`,
          `from the crushing deeps of the gravity wells through which they travel the universe.`,
          `from the murderous grandeur of his divine presence.`,
          `from the ravages of Death, whose domain is the whole of creation.`,
        ])}`
    }
)

extras['Greek\'s dagger'] = new ItemType (
    'Greek\'s dagger', 'weapon',
    [6,0,0,0,6,6],
    15,
    'The Greek\'s dagger falls to the earth and shatters into dust with a rattling clang.',
    'Used during the Athenian uprising against the Roman General Sulla, after which its owner was cursed by the death-god Pluto, that he should always have the power to kill the ones he hated.'
)

extras['Swede\'s head'] = new ItemType (
    'Swede\'s head', 'shield',
    [0,0,0,0,8,11],
    13,
    'The Swede\'s head bites you and escapes into the folds between space.',
    'The severed head of a old Viking mystic, taken off his body by king Harald Bluetooth for conspiring to bring the Swedish armies against him, then preserved and given the power of speech by a priestess of the cursed god Ve so that future generations could benefit from its wisdom.'
)

extras['venomous barb'] = new ItemType (
    'venomous barb', 'weapon',
    [3,0,0,1,9,0],
    7,
    'Your venomous barb breaks.',
    'A huge spearlike organic barb from a jelly leviathan, swollen with caustic venom.'
)

extras['harpoon'] = new ItemType (
    'harpoon', 'weapon',
    [10,0,0,0,0,0],
    5,
    'Your harpoon breaks',
    'A old iron whaling harpoon.'
)

extras['sunfire macana'] = new ItemType (
    'sunfire macana', 'weapon',
    [1,0,7,9,0,1],
    9,
    'A dried and shriveled corpse descends through the ceiling in a shower of sun-dew -- the mummified remains of Pachacuti Inka. He thiefs the macana from out your hand and ascends again to the realm of the sun-god.',
    'A weapon forged by Pachacuti the Earthshaker and used in his conquest of the Andes, a light wooden shaft ending in a solid gold star-shaped head imbued with the solar fire of Inti.'
)

extras['primordial glob'] = new ItemType (
    'primordial glob', 'weapon',
    [0,0,1,0,8,3],
    3,
    'The primordial glob bursts, diffusing its being over the entirety of the universe, and in so doing becoming dispersed enough that its presence can be only slightly felt.',
    'A squirming unstable glob of organic matter. Its composition is so different from any other known living matter that its very presence is a corrupting power. You can throw it at your enemies.'
)

extras['phantom\'s blood'] = new ItemType (
    'phantom\'s blood', 'shield',
    [12,12,12,12,12,0],
    1,
    'You black out for an unknown period of time. When you wake up the phantom\'s blood is gone.',
    'The plasmic essence of a being returned from beyond the wall of death. Transfused into you it can make you briefly immune to all physical harm.'
)

extras['crusader\'s shield'] = new ItemType (
    'crusader\'s shield', 'shield',
    [0,10,5,0,0,0],
    11,
    'Your shield breaks.',
    'A white shield blazoned with a scarlet cross.'
)

extras['throwing knife'] = new ItemType (
    'throwing knife', 'weapon',
    [3,5,0,0,0,0],
    9,
    'Your throwing knife breaks.',
    'A bright silver throwing knife with a counterbalancing black-taped handle.'
)

extras['machete'] = new ItemType (
    'machete', 'weapon',
    [0,5,1,0,0,0],
    30,
    'Your machete breaks.',
    'A versatile tool used for cutting crops, trees, or building materials, also functioning as a improvised weapon.'
)

extras['treacherous hand'] = new ItemType (
    'treacherous hand', 'weapon',
    [0,0,6,0,0,3],
    22,
    'The veins on the treacherous hand pulsate and blacken, then it withers to a inanimate skeletal paw.',
    'A olive-skinned hand broken off at the wrist. It can suspend itself in the air and grip with the strength of a ape. It seems willing to be used as a weapon.',
    null,
    function () { // On use
        if (this.data.holding && !(dice(4) - 1)) {
            this.data.betray()
        }
    },
    function () { // On instantiate
        this.data.baseBonus = this.bonus
        this.data.betray = function () {
            drawString(`The treacherous hand leaps out of your grasp and turns against you!`)
            this.room = game.player.room
            game.player.weapon = null
            let monsterVersion = new Monster (this.room, extras['traitorous hand'])
            monsterVersion.data.holding = this.data.holding
            monsterVersion.data.ammo = this.ammo
            monsterVersion.info += `${this.data.holding ? ` It's armed with a ${this.data.holding.name}.` : ''}`
            monsterVersion.attack = this.bonus
            monsterVersion.name = this.name
            this.room.monsters.push(monsterVersion)
        }.bind(this)
    },
    function () { // On drop
        var choice = false
        if (this.data.holding || !this.room) {
            return false
        }
        let powerCheck = (item) => {
            let sum = 0
            item.bonus.map(num => {
                sum += num
            })
            return sum
        }
        this.room.items.filter(item => {
            return (item.slot === 'weapon' && item.name !== 'treacherous hand')
        }).map(item => {
            if (!choice) {
                choice = item
            } else {
                if (powerCheck(item) > powerCheck(choice)) {
                    choice = item
                }
            }
        })
        if (choice) {
            drawString(`The treacherous hand grabs the ${choice.name}!`)
            var single = true
            this.room.items = this.room.items.filter(item => {
                if (single && (item === choice)) {
                    single = false
                    return false
                }
                return true
            })
            choice.bonus.map((num, index) => {
                this.bonus[index] = num + this.data.baseBonus[index]
            })
            this.data.holding = choice
            this.info = `A olive-skinned hand grasping a ${choice.name}.`
        }
    }
)

extras['king\'s sword'] = new ItemType (
    'king\'s sword', 'weapon',
    [6,12,0,0,0,0],
    30,
    'Your sword breaks at the handle.',
    'A two-handed longsword with a gold hilt and a blade of gleaming black steel.'
)

extras['wizard\'s ring'] = new ItemType (
    'wizard\'s ring', 'shield',
    [4,4,4,4,4,4],
    99,
    'Your wizard\'s ring melts, scalding your ring finger.',
    `A magic ring stolen from the Archwizard of ${pick(['Sao Paolo', 'Lima', 'Quito', 'Havana', 'Kingston', 'Veracruz'])} before he succumbed to the rabid insanity that ravaged his kind, hidden under the dragon\'s roost to protect it.`
)

extras['obsidian axe'] = new ItemType (
    'obsidian axe', 'weapon',
    [0,8,0,2,0,2],
    7,
    'Your obsidian axe explodes into smoke, dissipating through the mansion\'s walls with a cry like a speared boar dying.',
    'A one-handed obsidian axe decorated with crowsfeathers. Deals very powerful slash damage and stays silent.'
)

extras['lion\'s hide'] = new ItemType (
    'lion\'s hide', 'shield',
    [8,10,2,0,2,0],
    21,
    'Your lion\'s hide withers away.',
    'The impervious hide of a enormous lion. There are scorch marks around its front as if the beast that once wore it was killed by fire.'
)

extras['weeping eye'] = new ItemType (
    'weeping eye', 'weapon',
    [0,0,0,6,0,0],
    5,
    'Your weeping eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'obsidian-black', 'brown', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eyeball that weeps scalding hot fluid.`
)

extras['congealed eye'] = new ItemType (
    'congealed eye', 'weapon',
    [0,0,0,0,6,0],
    5,
    'Your congealed eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'red', 'bloodshot', 'cloudy', 'brown'])} eyeball with some kind of toxic coagulated fluid coating its conjunctiva.`
)

extras['afflicted eye'] = new ItemType (
    'afflicted eye', 'weapon',
    [6,0,0,0,0,0],
    5,
    'Your afflicted eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'bloodshot', 'bloodshot', 'green', 'violet', 'black', 'yellow', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eyeball so plagued with painful affliction that it passes its suffering on to those over whom its piercing gaze passes.`
)

extras['watchful eye'] = new ItemType (
    'watchful eye', 'weapon',
    [0,0,6,0,0,0],
    5,
    'Your afflicted eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'black', 'brown', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eye whose ever-present scrutinizing gaze becomes a physically constricting presence with its overbearing attention.`
)

extras['wraith\'s sword'] = new ItemType (
    'wraith\'s sword', 'weapon',
    [7,7,0,0,0,0],
    12,
    'The swordwraith returns in a whirl of black wind, seizing its sword from your hand. Having been defeated once already, it flees, vanishing into the walls of the house.',
    `A long curved blade of white light. Given by the ancient king Mahabali to his most loyal and skillful warriors in a vain attempt to protect himself from the justice of the fifth avatar of Vishnu, cursing them to plague the earth as wraiths for eternity.`
)

extras['bottle of liquid swords'] = new ItemType (
    'bottle of liquid swords', 'weapon',
    [0,9,0,0,0,0],
    1,
    'The flask shatters.',
    `A erlenmeyer flask filled with a transparent viscous liquid that slashes everything it touches to pieces with fifty-two simultaneous fatal strikes.`
)

extras['bottle of black goo'] = new ItemType (
    'bottle of black goo', 'weapon',
    [0,0,0,11,0,0],
    1,
    'The bottle shatters as the black goo ignites into bright blue flame.',
    `A round-bottomed flask filled with a thick black tarrish substance that spontaneously bursts into fire when it strikes something.`
)

extras['bottle of demon\'s blood'] = new ItemType (
    'bottle of demon\'s blood', 'weapon',
    [0,0,0,0,0,9],
    1,
    'The bottle shatters spilling demon\'s blood everywhere.',
    `A bottle full of the pulpy dark purplish-red blood of a demon. It\'s been biologically engineered over the course of time by sixteen generations of Demon Kings to curse all who spill it.`
)

extras['bottle of green acid'] = new ItemType (
    'bottle of green acid', 'weapon',
    [0,0,0,5,0,0],
    1,
    'The bottle of green acid shatters.',
    `A bottle full of a burning frog-green acid.`
)

extras['bottle of orange fumes'] = new ItemType (
    'bottle of orange fumes', 'weapon',
    [0,0,0,0,9,0],
    1,
    'The bottle of orange fumes shatters.',
    `A tightly sealed jar pumped full with thick orange fumes.`
)

extras['bottle of doughy fungus'] = new ItemType (
    'bottle of doughy fungus', 'weapon',
    [0,0,15,0,0,0],
    1,
    'The bottle of doughy fungus shatters.',
    `A tightly sealed glass bottle with a doughy fungus growing inside it and straining against the glass, trying to use its expansive crushing power to break free.`
)

extras['bottle of wasps'] = new ItemType (
    'bottle of wasps', 'weapon',
    [5,0,0,0,0,0],
    1,
    'The bottle of wasps shatters.',
    `A spherical glass bottle occupied by a thousand tiny wasps.`
)

extras['pearl of concentrated pestilence'] = new ItemType (
    'pearl of concentrated pestilence', 'weapon',
    [0,0,0,0,4,0],
    6,
    `Your pearl of concentrated pestilence bursts.`,
    `A gleaming black pearl the size of a acorn made up of toxic and carcinogenic materials crammed into a toxic sphere. It becomes more potent each time you use it.`,
    null,
    function () { // On use
        this.bonus[4] = Math.round(this.bonus[4] * 1.4)
        if (this.ammo > 1) {
            drawString(`The pearl swells with a quiet noise like a million tiny screams.`)
        } else {
            drawString(`Your pearl looks like it's about to burst, you might only get one more use out of it.`)
        }
        this.data.size += 1
        this.info = `A gleaming black pearl the size of a ${this.data.sizes[this.data.size]} made up of toxic and carcinogenic materials crammed into a toxic sphere. It becomes more potent each time you use it.`
    },
    function () { // On instantiate
        this.data.sizes = ['acorn', 'billiard ball', 'plum', 'baseball', 'desktop globe', 'bloated pumpkin', 'wrecking ball', 'wrecking ball', 'wrecking ball']
        this.data.size = 0
    }
)

extras['bottle of violet powder'] = new ItemType (
    'bottle of violet powder', 'weapon',
    [0,0,0,0,7,0],
    1,
    'The vial of violet powder shatters.',
    `A tall corked glass vial of fine purple crushed powder.`
)

extras['green\'s spear'] = new ItemType (
    'green\'s spear', 'weapon',
    [7,0,0,0,0,0],
    17,
    'Your green\'s spear breaks.',
    `A long spear made of gleaming green steel with two leather-wrapped handles.`
)

extras['blade of grass'] = new ItemType (
    'blade of grass', 'weapon',
    [0,7,0,0,0,0],
    17,
    'Your blade of grass breaks.',
    `A spearlike weapon ending in a foot-long slashing blade forged out of shining green steel.`
)

extras['goat\'s mace'] = new ItemType (
    'goat\'s mace', 'weapon',
    [0,0,7,0,0,0],
    17,
    'Your goat\'s mace breaks.',
    `A hooked and cragged mace made of heavy blunt-forged blue iron.`
)

extras['liar\'s torch'] = new ItemType (
    'liar\'s torch', 'weapon',
    [0,0,0,7,0,0],
    17,
    'Your liar\'s torch breaks.',
    `A intricate zinc and copper mechanism that takes in air and spits it out as globs of bright blue fire.`
)

extras['bow and venom-barbed arrows'] = new ItemType (
    'bow and venom-barbed arrows', 'weapon',
    [0,0,0,0,7,0],
    17,
    'You\'re out of venom-barbed arrows.',
    `A bow equipped with small arrows too light to do much damage on their own, but tipped with venom drawn from more than a million individual harvester ants.`
)

extras['goat-priest\'s rattle'] = new ItemType (
    'goat-priest\'s rattle', 'weapon',
    [0,0,0,0,0,7],
    17,
    'The goat-priest\'s rattle breaks.',
    `A blue iron staff ending in a small cage filled with the bones of the ancestors of some long-ago goat-shaman.`
)

// extras['faker\'s arm'] = new ItemType (
//     'faker\'s arm', 'weapon',
//     [0,0,0,0,0,0],
//     12,
//     '',
//     ``
// )
