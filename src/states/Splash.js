import Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import satellites from "../satellites/satellites";

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        this.load.image('mushroom', 'assets/images/mushroom2.png');
        this.load.image('threshold', 'assets/images/threshold.png');
        this.load.image('planet', 'assets/images/planet.png');
        this.load.image('planet_01', 'assets/images/planets/planet_01.png');
        // this.load.image('starry_night', 'assets/images/backgrounds/starry_night.png');

        // Threshold
        this.load.image('threshold_bar', 'assets/images/threshold/threshold_bar.png');
        this.load.spritesheet('threshold_end', 'assets/images/threshold/threshold_end.png', 32, 32);
        this.load.spritesheet('starry_night', 'assets/images/backgrounds/starry_night.png', 64, 64);

        satellites.forEach((s) => {
            this.load.image(s.id, `assets/images/satellites/${s.asset}`);
        });
    }

    create () {
        this.state.start('Game');
    }
}
