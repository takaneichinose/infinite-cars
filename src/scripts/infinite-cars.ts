import * as Phaser from "phaser";

import * as Constants from "./includes/Constants";

import LoadingScene from "./scenes/LoadingScene";
import MainScene from "./scenes/MainScene";
import InstructionsScene from "./scenes/InstructionsScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

/**
 * Phaser settings
 */
new Phaser.Game({
	type: Phaser.AUTO,
	parent: "infinite-cars",
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: Constants.IS_DEBUG,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
		min: {
			width: Constants.MIN_SCREEN_WIDTH,
			height: Constants.MIN_SCREEN_HEIGHT,
		},
		max: {
			width: Constants.MAX_SCREEN_WIDTH,
			height: Constants.MAX_SCREEN_HEIGHT,
		},
	},
	dom: {
		createContainer: true,
	},
	scene: [
		LoadingScene,
		MainScene,
		InstructionsScene,
		GameScene,
		GameOverScene,
	],
});
