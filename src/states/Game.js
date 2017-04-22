/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createNewSatellites } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

export default class extends Phaser.State {
    init () {
        this.satellites = [];
    }

    preload () {
        this.load.audio(orbitalSong.id, [`assets/music/${orbitalSong.asset}`]);
    }

    create () {
        this.planet = new Planet({
            game: this,
            x: this.world.width - 150,
            y: this.world.centerY
        });
        this.threshold = new Threshold({
            game: this,
            x: this.world.width - 300,  // TODO: Calculate actual placement
            y: this.world.centerY,
            asset: 'threshold'
        });

        this.music = this.add.audio(orbitalSong.id);
        this.music.play();

        this.game.add.existing(this.planet);
        this.game.add.existing(this.threshold);

        this.time.events.loop(Phaser.Timer.SECOND, () => {
            console.log("Timer event");
        }, this);
    }

    update() {

    }

    render () {
        this.satellites =
            this.satellites.concat(createNewSatellites(this, 100));
    }
}
