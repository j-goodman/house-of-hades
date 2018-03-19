var display = {};

window.onload = () => {
    display.main = new Block ('block');
    display.main.addToPage();
    display.main.text('HOUSE OF HADES');

    let description = `You're in a ${game.player.room.type}.`;
    display.room = new Block ('bubble', description);

    display.room.update = () => {
        let roomDescription = `You're in a ${game.player.room.type}.`;

        display.room.title = roomDescription;
        display.room.content = roomDescription;
        display.room.node.innerText = display.room.node.className.includes('small') ?
            display.room.title:
            display.room.content;
        var item;
        var monster;
        var door;
        display.room.childBlocks = [];

        game.player.room.monsters.map(mon => {
            monster = new Block ('bubble', mon.name);
            monster.content = mon.info;
            monster.childBlocks = [];
            let action = new Block ('action', `Fight the ${mon.name}.`, game.player.fight.bind(game.player, mon.name));
            monster.childBlocks.push(action);
            display.room.childBlocks.push(monster);
        });

        game.player.room.items.map(ob => {
            item = new Block ('bubble', ob.name);
            item.content = ob.info;
            item.childBlocks = [];
            let action = new Block ('action', `Equip the ${ob.name}.`, game.player.get.bind(game.player, ob.name));
            item.childBlocks.push(action);
            action = new Block ('action', `Hold the ${ob.name}.`, game.player.hold.bind(game.player, ob.name));
            item.childBlocks.push(action);
            display.room.childBlocks.push(item);
        });

        game.player.room.doors.map(doorway => {
            door = new Block ('bubble', `${doorway.color} door`);
            door.content = '';
            door.childBlocks = [];
            let action = new Block ('action', `Go through the ${doorway.color} door.`, game.player.goTo.bind(game.player, `${doorway.color} door`));
            door.childBlocks.push(action);
            display.room.childBlocks.push(door);
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
