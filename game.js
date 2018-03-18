var game = {};
game.player = new Player ();
game.house = new House (game.player);

var goTo = game.player.goTo.bind(game.player);
var goto = goTo;
var get = game.player.get.bind(game.player);
var hold = game.player.hold.bind(game.player);
var drop = game.player.drop.bind(game.player);
var fight = game.player.fight.bind(game.player);
var recover = game.player.recover.bind(game.player, true);
var check = game.player.lookAround.bind(game.player);
var holding = game.player.showHolding.bind(game.player);
var stats = game.player.showStats.bind(game.player);
var info = game.player.info.bind(game.player);
var use = game.player.use.bind(game.player);

window.addEventListener('load', () => {
  game.player.welcome.bind(game.player);
});


/*

1.
Description of the room, items monsters and doors are buttons.

ITEM -> description, GET
MONSTER -> description, FIGHT, CHECK
DOOR -> GO THROUGH

2.
YOU
Stats -> Weapon (drop), Shield (drop), stats
Inventory -> Items (drop, conditionally use)

*/
