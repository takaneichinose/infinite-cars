import Methods from "../includes/Methods";

/**
 * Scene for the game over
 */
export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super("GameOver");
	}
	
	create() {
		Methods.sceneEntry(this);
		
		Methods.addClickText(this, "Main");
	}
}
