var display = {};

window.onload = () => {
    display.main = new Block ('block');
    display.main.addToPage();
    display.main.text('HOUSE OF HADES');

    let description = `You're in a ${game.player.room.type}.`;
    display.room = new Block ('bubble', description);

    display.room.update = () => {
        let roomDescription = `You're in a ${game.player.room.type}.`;

        display.room.content = roomDescription;
        display.room.node.innerText = display.room.node.className.includes('small') ?
            display.room.type:
            display.room.type + ' *';
        var item;
        var monster;
        var door;
        display.room.childBlocks = [];

        game.player.room.monsters.map(mon => {
            monster = new Block ('bubble', mon.name);
            monster.content = mon.info;
            display.room.childBlocks.push(monster);
        });

        game.player.room.items.map(ob => {
            item = new Block ('bubble', ob.name);
            item.content = ob.info;
            display.room.childBlocks.push(item);
        });

        // let march = new Block ('bubble', 'March');
        // march.content = `What adjacent territory do you want to march your unit to?`;
        // march.childBlocks = [];
        // game.player.unit.location.borderNames.map((name) => {
        //     block = new Block ('bubble', name);
        //     block.content = `Our scouts aren't reporting any signs of enemy action in ${name}.`;
        //     action = new Block (
        //         'action',
        //         `Go to ${name}.`,
        //         game.player.unit.goTo.bind(game.player.unit, name),
        //     );
        //     block.childBlocks = []
        //     block.childBlocks.push(action);
        //     march.childBlocks.push(block);
        // });
        // display.room.childBlocks = [];
        // display.room.childBlocks.push(march);
    }
    display.main.nest(
      display.room,
      // display.player,
    )
    display.update();
}

display.update = () => {
    display.room.update();
    // display.player.update();
}
