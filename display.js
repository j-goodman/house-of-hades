var display = {};

window.onload = () => {
    display.main = new Block ('block');
    display.main.addToPage();
    display.main.text('HOUSE OF HADES');

    display.location = new Block ('bubble', 'LOCATION');
    display.location.update = () => {
        var march;
        var block;
        var action;
        var locationDescription = 'Your unit is in the ' + COPY.territoryDescriptors[game.player.unit.location.biome] + ' of ' + game.player.unit.location.name.toUpperCase() + '. On your borders are ';
        locationDescription += commaList(game.player.unit.location.borderNames) + '.';
        display.location.content = locationDescription;
        display.location.node.innerText = display.location.node.className.includes('small') ?
            display.location.title:
            display.location.content;
        march = new Block ('bubble', 'March');
        march.content = `What adjacent territory do you want to march your unit to?`;
        march.childBlocks = [];
        game.player.unit.location.borderNames.map((name) => {
            block = new Block ('bubble', name);
            block.content = `Our scouts aren't reporting any signs of enemy action in ${name}.`;
            action = new Block (
                'action',
                `Go to ${name}.`,
                game.player.unit.goTo.bind(game.player.unit, name),
            );
            block.childBlocks = []
            block.childBlocks.push(action);
            march.childBlocks.push(block);
        });
        display.location.childBlocks = [];
        display.location.childBlocks.push(march);
    }

    display.troops = new Block ('bubble', 'TROOPS');
    display.troops.update = () => {
        var block;
        var unitList = 'You have ' + game.player.unit.troops.filter((soldier) => {
            return soldier.division === 'infantry'
        }).length + ' infantry, ' + game.player.unit.troops.filter((soldier) => {
            return soldier.division === 'cavalry'
        }).length + ' cavalry, and ' + game.player.unit.troops.filter((soldier) => {
            return soldier.division === 'artillery'
        }).length + ' artillery.'
        display.troops.childBlocks = []
        game.player.unit.troops.map((soldier) => {
            block = new Block ('bubble', soldier.name + ', ' + capitalize(soldier.division));
            block.content = `${soldier.rank} ${soldier.name}
            ${capitalize(soldier.division)}.

            ${soldier.injuries[0] ? soldier.injuries[0].ongoing : 'Healthy'}.

            From the ${soldier.home.type} of ${soldier.home.name}.
            Speaks ${commaList(Object.keys(soldier.languages).map((lang) => {
              return soldier.languages[lang] + ' ' + (capitalize(lang));
            }))}.
            `
            display.troops.childBlocks.push(block);
        });
        display.troops.content = unitList;
    }

    display.main.nest(
        display.location,
        display.troops,
    )
    display.update();
}

display.update = () => {
    display.location.update();
    display.troops.update();
}
