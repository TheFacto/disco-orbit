import Satellite from '../sprites/Satellite';
import { getRandomInt } from '../utils';
import Phaser from 'phaser';
import satellites from '../satellites/satellites';

const randomAsset = () => satellites[Math.floor(Math.random() * satellites.length)];

const createSatellites = (game, beats, thresholdX, speed) =>
    beats.map(
        (beat) => new Satellite({
            game: game,
            y: thresholdX + beat * speed,
            x: getRandomInt(0, game.world.width),
            asset: randomAsset().id,
            speed: 0
        })
    );

export const createSatelliteGroup = (game, beats, thresholdX, speed) => {
    const group = new Phaser.Group(game);

    createSatellites(game, beats, thresholdX, speed)
        .forEach((s) => group.add(s));
    return group;
};
