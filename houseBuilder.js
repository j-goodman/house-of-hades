houseBuilder = {};

houseBuilder.buildSpawn = function () {
  var colors = ['black', 'red', 'gold'];
  var spawnTypes = [
    'cavernous foyer lit by candlelight', 'gigantic greenhouse filled with strange barbed flowers', 'round dining room with a stained glass skylight', 'vast aquarium room', 'sprawling library filled with old leather-bound books', 'dimly-lit prisonlike corridor with barred windows', 'opulent dining room with a jeweled chandelier', 'museum-like room decorated with massive stuffed apes and bears', 'tile-decorated subterranean hotsprings', 'silent room decorated with painted vases and pots', 'high-ceilinged room decorated with the banners of ancient families', 'long, narrow room with a tapestry stretched across one wall depicting the rise and fall of a strange king', 'vast windowless ballroom', 'mausoleum room'
  ];
  var i;
  var spawn;
  spawn = new Room (null, 3);
  spawn.type = pick(spawnTypes);
  spawn.monsters = [];
  for (i=0 ; i<3 ; i++) {
      spawn.doors[i].color = colors[i];
      spawn.doors[i].to = new Room ([spawn.doors[i]], 2);
      spawn.doors[i].to.doors = [
          spawn.doors[i].to.doors[0],
          spawn.doors[i].to.doors[1]
      ];
      spawn.doors[i].to.monsters = [];
  }
  return spawn;
};
