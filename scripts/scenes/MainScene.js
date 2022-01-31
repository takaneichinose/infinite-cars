"use strict";

import * as Constants from "../includes/Constants.js";
import * as Methods from "../includes/Methods.js";

export default class MainScene extends Phaser.Scene {
	constructor() {
		super("Main");
	}
	
	addBanner() {
		const color = "#ffd541";
		const stroke = "#df3e23";
		
		Methods.addText(this, Constants.SCREEN_WIDTH / 2, 128, "Infinite Cars", "40px")
			.setDepth(Constants.SCREEN_HEIGHT)
			.setOrigin(0.5)
			.setScrollFactor(0)
			.setColor(color)
			.setStroke(stroke, 8);
		
		Methods.addText(this, Constants.SCREEN_WIDTH / 2, 176, "Infinite Cars", "24px")
			.setDepth(Constants.SCREEN_HEIGHT)
			.setOrigin(0.5)
			.setScrollFactor(0)
			.setColor(color)
			.setStroke(stroke, 8);
	}
	
	addStartButton() {
		Methods.log("Creating start button...");
		
		const startButton = Methods.createText(this, "Press anywhere");
		
		Methods.log(`startButton added to ${startButton.x}, ${startButton.y}`);
		
		this.input.once("pointerdown", (evt) => {
			Methods.log("startButton is pressed");
			
			this.selectSound.play();
			
			Methods.moveScene(this, "Game");
		});
	}
	
	initialize() {
		Methods.createMap(this);
		Methods.placeCharacter(this, false);
		Methods.addSoundControl(this);
		Methods.addAudios(this);
		
		this.addBanner();
		this.addStartButton();
	}
	
	create() {
		Methods.sceneEntry(this);
		
		this.initialize();
	}
}
