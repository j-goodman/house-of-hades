var extras = extras ? extras : {}

extras['lich\'s eye'] = new ItemType (
    'lich\'s eye', 'weapon',
    [0,3,0,1,7,1],
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
    [0,0,9,2,0,0],
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

let firstNames = ['Cristobal', 'Catherine', 'Armin', 'Armando', 'Aaron', 'Elizabeth', 'Yeung', 'Chantel', 'David', 'Charles', 'Lee', 'Mia', 'Maria', 'Fatima', 'Alexander', 'Xicotencatl', 'Achilles', 'Jesus', 'Lars', 'Abraham', 'Iris', 'Diego', 'Francisco', 'Atahualpa', 'Huascar', 'Ariana', 'Ariadne', 'Tycho', 'Brahe', 'Javier', 'Emil', 'Henri', 'Mariana', 'Julia', 'Ana Lilia', 'Emilio', 'Luis', 'Angela', 'Moon', 'Arlingtonius', 'Miranda', 'Roscoe', 'Jupiter', 'Helene', 'Rajesh', 'Deshawn', 'Leo', 'Paul', 'Bicycle', 'Polyphemus', 'Virginia', 'Nebraska', 'Xitlali']
extras['assassin\'s gun'] = new ItemType (
    'assassin\'s gun', 'weapon',
    [0,0,0,5,7,0],
    4,
    'You\'re out of darts.',
    `A breath powered dart gun with four pinpoint-sharp projectiles. Scores of thousands of these fiery darts were made, but most were sunk during the blockade after the rebel army took Florida. This blowgun was used to assassinate two people.`,
    null,
    null,
    function () { // On instantiate
        let name = pick(firstNames)
        nameMumbler.read(name)
        nameMumbler.read(pick(firstNames))
        nameMumbler.read(pick(firstNames))
        nameMumbler.read(pick(firstNames))
        nameMumbler.names.push(name)
        this.info = `A breath powered dart gun with four pinpoint-sharp projectiles. There were originally scores of thousands of these darts made, but most were sunk during the blockade after the rebel army took Florida. This one was used to assassinate ${capitalize(nameMumbler.mumble()) + ' ' + capitalize(nameMumbler.mumble())}.`
    }
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

extras['DEATH\'S BEAK'] = new ItemType (
    'DEATH\'S BEAK', 'weapon',
    [dice(12), dice(5), dice(3) + dice(3), dice(3), dice(6) + dice(6) + dice(6), dice(3) - 1],
    dice(6) + dice(6) + dice(6) + dice(6) + dice(6) + dice(6),
    'DEATH\'S BEAK IS UNDONE.',
    'The beak of a abominable being you encountered beyond the shadow of time. It wriggles in your hands seeking breathing flesh to kill.'
)

extras['kraken\'s ink sac'] = new ItemType (
    'kraken\'s ink sac', 'weapon',
    [0,0,0,7,13,0],
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
    [2,8,7,2,5,2,],
    11,
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
    [7,2,4,7,7,5],
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
    [8,0,1,0,0,0],
    3 + dice(2),
    'Your harpoon breaks',
    'A old iron whaling harpoon.'
)

extras['sunfire macana'] = new ItemType (
    'sunfire macana', 'weapon',
    [1,0,7,9,0,1],
    11,
    'A dried and shriveled corpse descends through the ceiling in a shower of sun-dew -- the mummified remains of Pachacuti Inka. He thiefs the macana from out your hand and ascends again to the realm of the sun-god.',
    'A weapon forged by Pachacuti the Earthshaker and used in his conquest of the Andes, a light wooden shaft ending in a solid gold star-shaped head imbued with the solar fire of Inti.'
)

extras['primordial glob'] = new ItemType (
    'primordial glob', 'weapon',
    [0,0,1,0,7,3],
    2,
    'The primordial glob bursts, diffusing its being over the entirety of the universe, and in so doing becoming dispersed enough that its presence can be only slightly felt.',
    'A squirming unstable glob of organic matter. Its composition is so different from any other known living matter that its very presence is a corrupting power. You can throw it at your enemies.'
)

extras['phantom\'s blood'] = new ItemType (
    'phantom\'s blood', 'shield',
    [12,12,12,12,12,0],
    1,
    'You black out for a unknown period of time. When you wake up the phantom\'s blood is gone.',
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
        this.data.baseBonus = this.bonus.map(num => { return num })
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
                if (this.bonus[index] > 30) {
                    this.bonus[index] = 30
                }
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
    299,
    'Your wizard\'s ring melts, scalding your ring finger.',
    `A magic ring stolen from the Archwizard of ${pick(['Sao Paolo', 'Lima', 'Quito', 'Havana', 'Kingston', 'Veracruz', 'San Antonio'])} before he succumbed to the rabid insanity that ravaged his kind, hidden under the dragon\'s roost to protect it.`
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
    [0,0,0,6,1,0],
    5,
    'Your weeping eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'obsidian-black', 'brown', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eyeball that weeps scalding hot fluid.`
)

extras['congealed eye'] = new ItemType (
    'congealed eye', 'weapon',
    [0,1,0,0,6,0],
    5,
    'Your congealed eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'red', 'bloodshot', 'cloudy', 'brown'])} eyeball with some kind of toxic coagulated fluid coating its conjunctiva.`
)

extras['afflicted eye'] = new ItemType (
    'afflicted eye', 'weapon',
    [6,0,1,0,0,0],
    5,
    'Your afflicted eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'bloodshot', 'bloodshot', 'green', 'violet', 'black', 'yellow', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eyeball so plagued with painful affliction that it passes its suffering on to those over whom its piercing gaze passes.`
)

extras['watchful eye'] = new ItemType (
    'watchful eye', 'weapon',
    [0,0,6,0,0,1],
    5,
    'Your afflicted eye turns into fire and vanishes with a whistling sound like a kettle.',
    `A ${pick(['blue', 'brown', 'green', 'violet', 'black', 'brown', 'hazel', 'cloudy', 'grey', 'blue', 'brown'])} eye whose ever-present scrutinizing gaze becomes a physically constricting presence with its overbearing attention.`
)

extras['wraith\'s sword'] = new ItemType (
    'wraith\'s sword', 'weapon',
    [8,8,0,0,0,0],
    12,
    'The swordwraith returns in a whirl of black wind, seizing its sword from your hand. Having been defeated once already, it flees, vanishing into the walls of the house.',
    `A long curved blade of white light. Given by the ancient king Mahabali to his most loyal and skillful warriors in a vain attempt to protect himself from the justice of the fifth avatar of Vishnu, cursing them to plague the earth as wraiths for eternity.`
)

extras['bottle of liquid swords'] = new ItemType (
    'bottle of liquid swords', 'weapon',
    [2,9,0,1,1,0],
    1,
    'The flask shatters.',
    `A erlenmeyer flask filled with a transparent viscous liquid that slashes everything it touches to pieces with fifty-two simultaneous fatal strikes.`
)

extras['bottle of black goo'] = new ItemType (
    'bottle of black goo', 'weapon',
    [0,0,0,9,5,0],
    1,
    'The bottle shatters as the black goo ignites into bright blue flame.',
    `A round-bottomed flask filled with a thick black tarrish substance that spontaneously bursts into fire when it strikes something.`
)

extras['bottle of demon\'s blood'] = new ItemType (
    'bottle of demon\'s blood', 'weapon',
    [0,0,0,5,5,14],
    1,
    'The bottle shatters spilling demon\'s blood everywhere.',
    `A bottle full of the pulpy dark purplish-red blood of a demon. It\'s been biologically engineered over the course of time by sixteen generations of Demon Kings to curse all who spill it.`
)

extras['bottle of green acid'] = new ItemType (
    'bottle of green acid', 'weapon',
    [0,0,0,11,11,0],
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
    [0,0,20,0,0,0],
    1,
    'The bottle of doughy fungus shatters.',
    `A tightly sealed glass bottle with a doughy fungus growing inside it and straining against the glass, trying to use its expansive crushing power to break free.`
)

extras['bottle of wasps'] = new ItemType (
    'bottle of wasps', 'weapon',
    [5,0,0,0,5,0],
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
        this.bonus = this.bonus.map(num => { return num })
        this.data.sizes = ['acorn', 'billiard ball', 'plum', 'baseball', 'desktop globe', 'bloated pumpkin', 'wrecking ball', 'wrecking ball', 'wrecking ball']
        this.data = Object.assign({}, this.data)
        this.data.size = 0
    }
)

extras['bottle of violet powder'] = new ItemType (
    'bottle of violet powder', 'weapon',
    [1,2,0,0,6,0],
    1,
    'The vial of violet powder shatters.',
    `A tall corked glass vial of fine purple crushed powder.`
)

extras['green\'s spear'] = new ItemType (
    'green\'s spear', 'weapon',
    [7,2,0,0,0,0],
    17,
    'Your green\'s spear breaks.',
    `A long spear made of gleaming green steel with two leather-wrapped handles.`
)

extras['blade of grass'] = new ItemType (
    'blade of grass', 'weapon',
    [0,7,0,2,0,0],
    17,
    'Your blade of grass breaks.',
    `A spearlike weapon ending in a foot-long slashing blade forged out of shining green steel.`
)

extras['goat\'s mace'] = new ItemType (
    'goat\'s mace', 'weapon',
    [0,0,7,0,0,2],
    17,
    'Your goat\'s mace breaks.',
    `A hooked and cragged mace made of heavy blunt-forged blue iron with a long narrow handle.`
)

extras['liar\'s torch'] = new ItemType (
    'liar\'s torch', 'weapon',
    [0,0,0,7,2,0],
    17,
    'Your liar\'s torch breaks.',
    `A intricate zinc and copper mechanism that takes in air and spits it out as globs of bright blue fire.`
)

extras['bow and venom-barbed arrows'] = new ItemType (
    'bow and venom-barbed arrows', 'weapon',
    [2,0,0,0,7,0],
    17,
    'You\'re out of venom-barbed arrows.',
    `A bow equipped with small arrows too light to do much damage on their own, but tipped with venom drawn from a million ants.`
)

extras['goat-priest\'s rattle'] = new ItemType (
    'goat-priest\'s rattle', 'weapon',
    [0,0,2,0,0,7],
    17,
    'The goat-priest\'s rattle breaks.',
    `A blue iron staff ending in a small cage filled with the bones of the ancestors of some long-ago goat-shaman.`
)

extras['kitchen knife'] = new ItemType (
    'kitchen knife', 'weapon',
    [1,3,0,0,0,0],
    11,
    'Your kitchen knife breaks.',
    'It\'s a steel kitchen knife with a wood handle.'
)

extras['paring knife'] = new ItemType (
    'paring knife', 'weapon',
    [1,2,0,0,0,0],
    9,
    'Your paring knife breaks.',
    'It\'s a steel paring knife with a black handle.'
)

extras['cleaver'] = new ItemType (
    'cleaver', 'weapon',
    [0,5,1,0,0,0],
    11,
    'Your cleaver breaks.',
    'A large stainless-steel meat cleaver.'
)

extras['cast iron pan'] = new ItemType (
    'cast iron pan', 'weapon',
    [0,0,7,0,0,0],
    5,
    'The pan breaks. Cast iron kitchenware is much heavier than the steel equivalent but it\'s also much more brittle, so this is no surprise.',
    'A heavy black cast-iron pan. The cast iron lets it build up years of absorbed flavors, which there\'s really no substitute for.'
)

extras['doughroller'] = new ItemType (
    'doughroller', 'weapon',
    [0,0,4,0,0,0],
    5,
    'The doughroller breaks.',
    'A wooden doughroller.'
)

extras['wrench'] = new ItemType (
    'wrench', 'weapon',
    [0,1,4,0,0,0],
    7,
    'The wrench breaks in your hand.',
    'A adjustable steel wrench. Deals moderate crush damage.'
),

extras['purple orchid'] = new ItemType (
    'purple orchid', 'weapon',
    [0,0,0,0,2,0],
    15,
    'The purple orchid wilts and rots.',
    'It\'s a vibrantly purple orchid with a single sharp barb emerging from its center.',
    null,
    function (player, enemy) { // on use
        enemy.attack.map((num, index) => {
            if (num > 0) {
                this.bonus[index] += dice(5)
                if (this.bonus[index] > num) {
                    this.bonus[index] = num
                }
            } else {
                this.bonus[index] -= dice(3)
            }

            if (this.bonus[index] < 0) {
                this.bonus[index] = 0
            }
        })
        drawString(`As the purple orchid infects the ${enemy.name} its pedals twist, changing to reflect the being it\'s attacking.`)
    },
    function () { // on instantiate
        this.bonus = this.bonus.map(num => { return num })
    }
)

extras['bottle of whiskey'] = new ItemType (
    'bottle of whiskey', 'weapon',
    [0,3,0,1,1,0],
    1,
    'The bottle of whiskey is shattered.',
    'A bottle of inexpensive barrel-aged Kentucky bourbon.',
)

extras['weird viol'] = new ItemType (
  'weird viol', 'shield',
  [0,0,4,0,4,9],
  9,
  'Your weird viol breaks.',
  'A German-made string instrument carved from oak, played to ward off or appease terrors from beyond the veil of common space.',
  null,
  function () { // on use
      drawString([
          `The creaking discordant notes of the viol fill the ${game.player.room.type} as you pull the bow across its strings.`,
          `A sound almost like a chord rings out from the viol and fills the ${game.player.room.type}.`,
          `You draw the bow of the viol across its strings and long, low chord reverberates from the instrument.`,
          `The eerie music of the viol fills the ${game.player.room.type}.`,
      ][this.data.experience])
      this.data.experience += 1
      this.data.experience = this.data.experience > 3 ? 3 : this.data.experience
  },
  function () { // on instantiate
      this.data.experience = 0
  }
)

extras['clergyman\'s dagger'] = new ItemType (
    'clergyman\'s dagger', 'weapon',
    [5,2,0,0,0,3],
    11,
    'The clergyman\'s dagger breaks.',
    'A thin dagger blessed with holy water, held close by clerics, friars, and nuns to protect from the evils of the secular world.'
)

extras['letter opener'] = new ItemType (
    'letter opener', 'weapon',
    [1,2,0,0,0,0],
    6,
    'The letter opener breaks.',
    'A small aluminium letter opener.'
)

extras['straightrazor'] = new ItemType (
    'straightrazor', 'weapon',
    [0,3,0,0,0,0],
    7,
    'The straightrazor breaks.',
    'A stainless steel shaving razor.'
)

extras['inkwell'] = new ItemType (
    'inkwell', 'weapon',
    [0,2,3,0,0,0],
    1,
    'The inkwell shatters as you throw it.',
    'A small glass bottle filled with black ink.'
)

extras['fountain pen'] = new ItemType (
    'fountain pen', 'weapon',
    [2,0,0,0,0,0],
    dice(5),
    'The fountain pen breaks.',
    'A fancy gold-nibbed fountain pen.'
)

extras['cigarette lighter'] = new ItemType (
    'cigarette lighter', 'weapon',
    [0,0,0,2,0,0],
    7,
    'Your lighter is out of fuel.',
    'A old fashioned silver cigarette lighter.'
)

extras['old iron chain'] = new ItemType (
    'old iron chain', 'weapon',
    [0,0,6,0,0,0],
    6,
    'The iron chain breaks.',
    'A heavy rusted iron chain about four feet long.'
)

extras['makeshift stabbing implement'] = new ItemType (
    'makeshift stabbing implement', 'weapon',
    [5,0,0,0,2,0],
    4,
    'The stabbing implement breaks.',
    'A crudely made stabbing implement whittled down from some fibrous hard white material you don\'t recognize.'
)

extras['battleaxe'] = new ItemType (
    'battleaxe', 'weapon',
    [0,6,4,0,0,0],
    13,
    'Your battleaxe breaks.',
    'A gleaming iron battleaxe with a handle wrapped in soft black leather.'
)

extras['pike'] = new ItemType (
    'pike', 'weapon',
    [7,0,2,0,0,0],
    13,
    'Your pike breaks.',
    'A long wooden pike ending in a barbed iron spike.'
)

extras['cavalry shield'] = new ItemType (
    'cavalry shield', 'shield',
    [0,6,7,3,0,0],
    11,
    'Your shield breaks.',
    `A steel shield, made for use by a mounted knight. There\'s a ${pick(['badger', 'bear', 'kraken', 'lightning-struck tower', 'crowned skull', 'image of the stormgod Tlaloc', 'image of the constellations of the northern skies'])} painted on it.`
)

extras['paladin\'s shield'] = new ItemType (
    'paladin\'s shield', 'shield',
    [0,5,5,0,1,8],
    11,
    'Your shield breaks.',
    `A steel shield with a ${pick(['eel', 'bear', 'crow', 'lightning-struck tower', 'horned skull', 'image of the flayed god Xipe Totec', 'image of the constellations of the southern skies'])} painted on it.`
)

extras['knife'] = new ItemType (
    'knife', 'weapon',
    [2,4,0,0,0,0],
    17,
    'The knife breaks.',
    `A black steel knife.`
)

extras['stake'] = new ItemType (
    'stake', 'weapon',
    [8,0,0,0,0,14],
    7,
    'The stake breaks.',
    `A ash wood stake.`
)

extras['crown'] = new ItemType (
    'crown', 'shield',
    [0,1,1,0,0,0],
    29,
    'The crown breaks.',
    `A plain black crown.`
)

extras['archwizard\'s letter'] = new ItemType (
    'archwizard\'s letter', 'shield',
    [0,0,1,1,0,3],
    3,
    'The wizard\'s note is torn into pulp.',
    `A worn scrap of paper torn from a old book. "Know that you were sent here for a reason," it reads, "not to slay dragons but to seek out and kill the king of the demons, imprisoned within these walls, who is the source of all the evil that lurks within this curséd house."`
)

extras['demon king\'s note'] = new ItemType (
    'demon king\'s note', 'weapon',
    [0,0,0,2,0,2],
    3,
    'The demon\'s note is torn into pulp.',
    `A worn scrap of paper torn from a old book. "Know that you were sent here for a reason," it reads, "not to slay dragons but to seek out and kill the last of the Archwizards, whose allies are the sphinxes and who cowers within these walls, the greatest source of evil left to walk this curséd Earth."`
)

let moreFirstNames = ['Leonardo', 'Zheng', 'Li', 'Emily', 'Aaron', 'Sancho', 'Isabella', 'Cantlay', 'Muhammad', 'Qui', 'Odysseus', 'Sinbad', 'Meiji', 'Matthew', 'Mark', 'Luke', 'John']
extras['dueling saber'] = new ItemType (
    'dueling saber', 'weapon',
    [7,3,0,0,1,1],
    13,
    `Your saber breaks at the handle.`,
    'A long steel black-hilted saber used by the victor in a long-ago fateful duel.',
    null,
    null,
    function () { // On instantiate
        let name = pick(moreFirstNames)
        nameMumbler.read(name)
        nameMumbler.names.push(name)
        name = pick(nameMumbler.names)
        let secondName = capitalize(nameMumbler.mumble())
        nameMumbler.read(secondName)
        nameMumbler.names.push(secondName)
        this.info = `A long steel black-hilted saber used by the ${pick(['victor in', 'loser of'])} the fateful duel between ${pick(nameMumbler.names) + ' ' + capitalize(nameMumbler.mumble())} and ${name + ' ' + capitalize(nameMumbler.mumble())}.`
    }
)

extras['trident'] = new ItemType (
    'trident', 'weapon',
    [11,0,11,0,0,0],
    17,
    'The trident turns into seafoam.',
    'A three-pronged fishing spear.'
)

extras['gold-plated handgun'] = new ItemType (
    'gold-plated handgun', 'weapon',
    [5,0,2,2,0,0],
    6,
    'Your gold-plated handgun is out of bullets.',
    'It\'s a snub-nosed Beretta pistol that\'s been plated with solid gold.'
)

extras['plague knight\'s sword'] = new ItemType (
    'plague knight\'s sword', 'weapon',
    [1,6,0,0,7,0],
    9,
    `The plague-knight's sword breaks at the handle.`,
    'A rusty longsword, used by a long-dead plague knight.',
    null,
    null,
    function () { // On instantiate
        let name = pick(firstNames)
        nameMumbler.read(name)
        nameMumbler.names.push(name)
        this.info = `A rusty longsword, used by the long-dead plague knight ${capitalize(nameMumbler.mumble())} when he wandered the ${pick(['Iberian coasts', 'German forests', 'French countryside', 'British Isles', 'former Crusader States', 'eastern steppe', 'Mongolian steppe'])} in the fourteenth century fanatically finishing off lingering victims of the Black Death.`
    }
)

extras['moon egg'] = new ItemType (
    'moon egg', 'shield',
    [0,0,5,3,0,12],
    15,
    'The moon egg cracks.',
    'It\'s a perfectly round egg like a tiny moon.',
    null,
    null,
    null,
    function () {
        drawString(`The moon egg ${pick(['quivers', 'shivers', 'shakes', 'rattles', 'rolls around', 'shines with silver light', 'quivers'])} when you drop it.`)
        if (dice(7) === 7) {
            game.player.room.items = game.player.room.items.filter(item => { return item.name !== 'moon egg' })
            game.player.room.monsters.push(new Monster (game.player.room, monByName('owl of shadows')))
            updateRoom()
            drawString('The moon egg has burst!')
        }
    }
)

extras['pumpkin'] = new ItemType (
    'pumpkin', 'weapon',
    [0,0,2,0,0,0],
    1,
    'The pumpkin bursts when you throw it.',
    `It's a ${pick(['orange', 'yellow', 'orange-yellow', 'rotting', 'orange', 'orange', 'grinning', 'grinning', 'grimacing'])} pumpkin.`
)

extras['basket of jujube seeds'] = new ItemType (
    'basket of jujube seeds', 'shield',
    [0,0,0,5,7,0],
    5,
    'You\'re out of jujube seeds',
    'It\'s a very small basket, containing a few seeds used by those with ancient medicinal knowledge to protect from venom and flame.'
)

extras['necklace of murderers\' teeth'] = new ItemType (
    'necklace of murderers\' teeth', 'shield',
    [8,9,0,0,0,7],
    15,
    'Your necklace of murderer\'s teeth breaks.',
    'A necklace of strung-together human molars, ostensibly all from those who have killed unjustly. Protects against the ill wishes of those who would stab, cut, or curse the wearer.'
)

extras['phantom pestle'] = new ItemType (
    'phantom pestle', 'weapon',
    [0,5,6,2,0,4],
    6,
    'The phantom pestle breaks.',
    'The brittle pounding stone from a mortar and pestle, shimmering with a ghostly luminescent translucency. Used to grind supernatural substances that would be otherwise atomic before all earthly force.'
)

// extras['faker\'s arm'] = new ItemType (
//     'faker\'s arm', 'weapon',
//     [0,0,0,0,0,0],
//     12,
//     '',
//     ``
// )
