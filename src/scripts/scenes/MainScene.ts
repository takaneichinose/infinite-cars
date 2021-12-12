import * as Constants from "../includes/Constants";
import Methods from "../includes/Methods";

/**
 * Scene for the main screen
 */
export default class MainScene extends Phaser.Scene {
	constructor() {
		super("Main");
	}
	
	create() {
		Methods.sceneEntry(this);
		
		Methods.addButton(this, Constants.SCREEN_WIDTH / 2, Methods.getButtonY(2),
			"Start Game", "Game");
		
		Methods.addButton(this, Constants.SCREEN_WIDTH / 2, Methods.getButtonY(1),
			"Instructions", "Instructions");
	}
}
