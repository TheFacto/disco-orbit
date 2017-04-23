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
        this.game.stage.backgroundColor = "black";

        /* text.forEach(
            (text, i) =>
                this.add.bitmapText(0, (30 * i), 'pixelfont-medium', text, 9)
                ); */
        const bmptext = this.add.bitmapText(0, 0, 'pixelfont-small', text.join("\n"), 7);
        bmptext.position.x = this.world.centerX - bmptext.width / 2;
        bmptext.position.y = this.world.centerY - bmptext.height / 2;
        bmptext.align = "center";
    }

    update () {
    }
}
