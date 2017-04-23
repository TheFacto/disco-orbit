import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { scaleFactor } from '../utils';

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#EDEEC9';
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(scaleFactor(), scaleFactor());
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    }

    preload () {
        WebFont.load({
            google: {
                families: ['Bangers']
            },
            active: this.fontsLoaded
        });

        let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', {
            font: '16px Arial',
            fill: '#dddddd',
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);

        this.load.image('loaderBg', './assets/images/loader-bg.png');
        this.load.image('loaderBar', './assets/images/loader-bar.png');

    }

    render () {
        if (this.fontsReady) {
            this.state.start('Splash');
        }
    }

    fontsLoaded () {
        this.fontsReady = true;
    }
}
