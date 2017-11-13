var game = {};
game.player = new Gorlo ();
game.house = new House (game.player);
game.player.welcome();

var goTo = game.player.goTo.bind(game.player);
var goto = game.player.goTo.bind(game.player);
var get = game.player.get.bind(game.player);
var fight = game.player.fight.bind(game.player);
var heal = game.player.heal.bind(game.player);
var check = game.player.lookAround.bind(game.player);
var stats = game.player.showStats.bind(game.player);
var info = game.player.info.bind(game.player);
