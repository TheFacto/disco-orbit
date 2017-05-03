import Phaser from 'phaser';

export default class extends Phaser.State {
    create () {
        // register the enter key
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // stop this key from propagating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        const START_TEXT = "Start Screen:\n"
            .concat("Turn your sound up and press spacebar\n")
            .concat("whenever the satellites get close to the bar.\n")
            .concat("Press space bar to start.");

        const text = this.add.text(this.world.centerX, this.world.centerY, START_TEXT, {
            font: '14px Arial',
            fill: '#000000',
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);
    }

    update () {
        if (this.spaceKey.isDown) {
            this.state.start("Game");

            //TODO: add pointer support for mobile
        }
    }
}
