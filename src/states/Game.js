/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createSatelliteGroup } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

const setupSatelliteGroup = (state) => {
    state.satelliteGroup = createSatelliteGroup(state, state.beats, state.thresholdDistance, state.satelliteSpeed);
    state.satelliteGroup.position.y = 0;

    state.game.add.existing(state.satelliteGroup);
    state.game.physics.arcade.enable(state.satelliteGroup);

    // add physics to group
    state.satelliteGroup.enableBody = true;
    state.satelliteGroup.enableBodyDebug = true;
    state.satelliteGroup.physicsBodyType = Phaser.Physics.Arcade;
};

const setupOrbitalGroup = (state) => {
    state.orbitGroup = new Phaser.Group(state);
    state.game.add.existing(state.orbitGroup);
};

const calculateTwinkle = (bpm) => {
    return (bpm / 60);
};

const setupThresholdEnds = (state) => {
    const end01 = state.add.sprite(16, state.thresholdDistance, 'threshold_end');
    end01.anchor.setTo(0.5);
    end01.animations.add('pulse');
    end01.animations.play('pulse', calculateTwinkle(orbitalSong.bpm), true);

    const end02 = state.add.sprite(state.world.width - 16, state.thresholdDistance, 'threshold_end');
    end02.anchor.setTo(0.5);
    end02.animations.add('pulse');
    end02.animations.play('pulse', calculateTwinkle(orbitalSong.bpm), true);
};

const setupThreshold = (state) => {
    const threshold = new Threshold({
        game: state,
        x: 0,
        y: state.thresholdDistance,
        asset: 'threshold_bar'
    });
    state.threshold = threshold;
    state.game.add.existing(threshold);

    setupThresholdEnds(state);
};


const setupStaticGraphics = (state) => {
    // Background
    const stars = state.add.tileSprite(0, 0, state.game.world.width, state.game.world.height, 'starry_night');
    stars.animations.add('twinkle');
    stars.animations.play('twinkle', calculateTwinkle(orbitalSong.bpm), true);

    state.planet = new Planet({
        game: state,
        x: state.world.centerX,
        y: 50
    });
    setupThreshold(state);
    state.game.add.existing(state.planet);
    state.game.add.existing(state.threshold);
};

const playMusic = (state) => {
    state.music = state.add.audio(orbitalSong.id);
    state.musicStartTime = state.game.time.totalElapsedSeconds();
    state.music.play();
};

export default class extends Phaser.State {
    init () {
        this.beats = orbitalSong.ticks;
        this.thresholdDistance = 100;
        this.satelliteSpeed = 200;
    }

    preload () {
    }

    create () {
        setupStaticGraphics(this);
        setupSatelliteGroup(this);
        setupOrbitalGroup(this);
        playMusic(this);

        this.lastFrameTime = this.game.time.totalElapsedSeconds();

        // set-up the physics bodies
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.threshold);

    }

    render() {
        //this.game.debug.body(this.threshold);
        //this.satelliteGroup.forEach((a) => {
        //    this.game.debug.body(a)
        //});
    }

    update () {
        // Update satellite group
        const delta = this.game.time.totalElapsedSeconds() - this.lastFrameTime;
        this.satelliteGroup.position.y -= this.satelliteSpeed * delta;
        this.lastFrameTime = this.game.time.totalElapsedSeconds();

        if (this.game.physics.arcade.collide(this.threshold, this.satelliteGroup, this.collisionHandler, this.processHandler, this)) {

        }
    }

    processHandler(threshold, satellite) {
        return true;
    }

    collisionHandler(threshold, satellite) {
        if (this.hitcount == undefined) {
            this.hitcount = 0;
        } else {
            this.hitcount++;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.activePointer.isDown) {
            console.log("spacebar pressed while in threshold zone");

            // Update orbit
            const orbitGroup = this.orbitGroup;
            const planet = this.planet;
            const satGroup = this.satelliteGroup;
            const toRemove = [];
            toRemove.push(satellite);

            toRemove.forEach((satellite) => {
                satGroup.remove(satellite);
                satellite.enterOrbit(planet);
                orbitGroup.add(satellite);
            });
        }

        //console.log("hitcount: " + this.hitcount);
    }

    getTick() {
        return this.game.time.totalElapsedSeconds() - this.musicStartTime;
    }
}
