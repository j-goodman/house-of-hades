let primarySegments = [

    /*      ANCIENT CASTLE      */
    (rooms) => {
        console.log('stones')
        buildLoopSegment({
            entryRoomTypes: ['huge open-air courtyard with long dry grass that brushes up against your knees'],
            entryDoors: [`huge curse-scrawled wooden`],
            guardianMonsters: ['mounted knight', 'griffin'],
            doorTypes: ['heavy oak', 'iron-braced', 'sturdy elmwood', 'barred iron'],
            roomTypes: ['long narrow stone-brick hallway through whose arrow-slit windows you can see rolling foggy moors'],
            nodeRooms: ['huge courtyard surrounded by thick stone walls', 'wide courtyard with a stream trickling into it and out through a drain in its huge stone walls', 'courtyard filled with sapling trees, surrounded by thick stone walls', 'cold damp courtyard surrounded by cold high stone walls'],
            nodeMonsters: ['mounted knight', 'dragon'],
            mainMonsters: ['black knight', 'guardian knight', 'drunken knight', 'holy knight', 'wyrm'],
            nodeItems: ['crystal ball', 'warhorn', 'king\'s shield'],
            finalMonsterTypes: ['ancient king'],
        })
    },

    /*      GOAT's LAIR      */
    (rooms) => {
        console.log('hoof')
        buildLoopSegment({
            entryRoomTypes: ['long stone hallway lined with statues of strange horned kings'],
            entryDoors: [`tall narrow wooden`],
            guardianMonsters: ['half-goat soldier', 'ghoul'],
            doorTypes: [pick(['green-painted', 'blue-painted', 'red-painted']), 'white-painted', 'black-painted', pick(['gold-painted', 'silver-painted', 'starry-painted'])],
            roomTypes: ['long narrow marble hallway'],
            nodeRooms: ['vast atrium with a huge domed ceiling and a sand-filled floor'],
            nodeMonsters: ['goat-knight'],
            mainMonsters: ['wyrm', 'ghoul', 'sandeater', 'wyrm', 'ghoul', 'sandeater', 'rabid bear'],
            nodeItems: ['blade of grass', 'goat-priest\'s rattle', 'goat\'s mace', 'green\'s spear', 'battleaxe', 'cavalry shield', 'witch\'s rod'],
            finalMonsterTypes: ['witch queen', 'goat-knight', 'half-goat soldier'],
          })
      },

    /*      PRISMATIC JAIL      */
    (rooms) => {
        console.log('rainbow')
        buildLoopSegment({
            entryRoomTypes: ['a all-white room with beams of scattered many-colored light refracting into it through a door-sized prism'],
            entryDoors: [`prismatic`],
            guardianMonsters: ['prismatic jailer'],
            doorTypes: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'],
            roomTypes: ['long immense black void with a beam of refracted light cast between two doors'],
            nodeRooms: ['chasm of blooming white light'],
            nodeMonsters: ['four-faced god'],
            mainMonsters: ['paranoid summoner', 'bottle demon', 'laughing woman', 'ice walker', 'door mumbler'],
            nodeItems: ['blade of grass',],
            finalMonsterTypes: ['witch queen'],
          })
      },
  ]
