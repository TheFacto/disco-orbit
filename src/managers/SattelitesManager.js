import Satellite from '../sprites/Satellite';
import { getRandomInt } from '../utils';

export const createNewSatellites = (state, frequency) => {
    if (getRandomInt(0, frequency)) {
        return [];
    }
    const satellite = new Satellite({
        game: state,
        x: 0,
        y: getRandomInt(0, 200),
        asset: 'mushroom',
        speed: 1
    });
    state.game.add.existing(satellite);
    return satellite;
};
