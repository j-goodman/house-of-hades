var instantiateNewGame = () => {
    window.game = {};
    game.player = new Player ();
    game.house = new House (game.player);

    window.goTo = game.player.goTo.bind(game.player);
    window.goto = goTo;
    window.get = game.player.get.bind(game.player);
    window.hold = game.player.hold.bind(game.player);
    window.drop = game.player.drop.bind(game.player);
    window.fight = game.player.fight.bind(game.player);
    window.recover = game.player.recover.bind(game.player, true);
    window.check = game.player.lookAround.bind(game.player);
    window.holding = game.player.showHolding.bind(game.player);
    window.stats = game.player.showStats.bind(game.player);
    window.info = game.player.info.bind(game.player);
    window.use = game.player.use.bind(game.player);

    window.addEventListener('load', () => {
        if (window.loadImages) {
            loadImages(game.player.welcome.bind(game.player));
        } else {
            game.player.welcome.bind(game.player);
        }
    });
}

instantiateNewGame()
