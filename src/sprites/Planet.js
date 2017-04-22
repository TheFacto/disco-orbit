import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y}) {
        super(game, x, y);

        var graphics = game.add.graphics(0, 0);

        graphics.lineStyle(2, 0xffd900, 1);

        graphics.beginFill(0x0000FF, 1);
        graphics.drawCircle(x, y, 100);
    }
}

