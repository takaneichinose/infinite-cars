import * as Phaser from "phaser";

import * as Constants from "../includes/Constants";
import Methods from "../includes/Methods";

/**
 * Scene for the instructions
 */
export default class InstructionsScene extends Phaser.Scene {
	constructor() {
		super("Instructions");
	}
	
	create() {
		Methods.sceneEntry(this);
		
		const TEXT_PADDING: number = 50;
		
		this.addDescription(TEXT_PADDING);
		this.addControls(TEXT_PADDING);
		
		Methods.addButton(this, Constants.SCREEN_WIDTH / 2, Methods.getButtonY(1),
			"Back", "Main");
	}
	
	// Add the description on the scene
	addDescription(textPadding: number): void {
		Methods.log("Adding description...");
		
		let description: Array<string> = [];
		
		description = [...description, "Description:\n"];
		description = [...description, "This is an endless racing game."];
		description = [...description, "It means that no matter long you"];
		description = [...description, "drive, you're not going to meet"];
		description = [...description, "the end point. Just try to increase"];
		description = [...description, "the score as high as you can."];
		description = [...description, "Also as the game passes by, the speed"];
		description = [...description, "of the car increases."];
		
		Methods.addText(
			this,
			Constants.SCREEN_WIDTH / 2,
			110,
			description.join(" "),
			Constants.SCREEN_WIDTH - textPadding,
			null,
			Constants.TEXT_SIZE);
	}
	
	// Add the controls on the scene
	addControls(textPadding: number): void {
		Methods.log("Adding controls...")
		
		let controls: Array<string> = [];
		
		controls = [...controls, "Instructions:"];
		controls = [...controls, "Press the directional keys to move"];
		controls = [...controls, "Avoid other cars"];
		controls = [...controls, "Avoid the obstacles"];
		controls = [...controls, "Controls:"];
		controls = [...controls, "'Up' key to accelerate"];
		controls = [...controls, "'Down' key to decelerate"];
		controls = [...controls, "'Left' key to move to the left"];
		controls = [...controls, "'Right' key to move to the right"];
		
		Methods.addText(
			this,
			Constants.SCREEN_WIDTH / 2, 285,
			controls.join("\n"),
			Constants.SCREEN_WIDTH - textPadding,
			null,
			Constants.TEXT_SIZE);
	}
}