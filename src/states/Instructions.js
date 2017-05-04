import Phaser from 'phaser';

const text = [
    "Turn up your speakers.",
    "",
    "Hit <spacebar> whenever a ",
    "satellite approaches the box.",
    " ",
    "Good luck!",
    " ",
    " ",
    "(spacebar to continue)"
];

export default class Instructions extends Phaser.State {

    create () {
        // register the enter key
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // stop this key from propagating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        this.game.stage.backgroundColor = "black";

        const bmptext = this.add.bitmapText(0, 0, 'pixelfont-small', text.join("\n"), 7);
        bmptext.position.x = this.world.centerX - bmptext.width / 2;
        bmptext.position.y = this.world.centerY - bmptext.height / 2;
        bmptext.align = "center";
    }

    update () {
        if (this.spaceKey.isDown) {
            this.state.start('Game');
        }
    }
}
