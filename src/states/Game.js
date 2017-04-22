/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createNewSatellites } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

export default class extends Phaser.State {
    init () {
        this.satellites = [];
        this.beats = orbitalSong.ticks;
        this.thresholdDistance = this.world.width - 300;
    }

    preload () {
        this.load.audio(orbitalSong.id, [`assets/music/${orbitalSong.asset}`]);
    }

    create () {
        this.debugText = this.game.add.text(this.world.centerX, this.world.centerY, "test");
        this.planet = new Planet({
            game: this,
            x: this.world.width - 150,
            y: this.world.centerY
        });
        this.threshold = new Threshold({
            game: this,
            x: this.thresholdDistance,  // TODO: Calculate actual placement
            y: this.world.centerY,
            asset: 'threshold'
        });

        this.music = this.add.audio(orbitalSong.id);
        this.musicStartTime = this.game.time.totalElapsedSeconds();
        this.game.add.existing(this.planet);
        this.game.add.existing(this.threshold);

        const secondsPerBeat = (60 / orbitalSong.bpm) * 1000;
        this.beatCount = 0;
        this.time.events.loop(secondsPerBeat, () => {
            console.log(`Beat: ${this.beatCount}`);
            // Give 4 beats buffer
            if(this.beatCount === 4) {
                this.musicStartTime = this.game.time.totalElapsedSeconds();
                this.music.play();
            }
            this.beatCount++;
        }, this);

    }

    update () {
        this.satellites =
            this.satellites.concat(
                createNewSatellites({
                    state: this,
                    beats: this.beats,
                    currentTick: this.getTick(),
                    distanceToThreshold: this.thresholdDistance
                })
            );
        this.debugText.setText(this.getTick());
    }

    getTick() {
        return this.game.time.totalElapsedSeconds() - this.musicStartTime;
    }
}
