import * as Phaser from "phaser";

import * as Constants from "./Constants";

export default class Methods {
	// Console log for debugging purposes
	static log(...message: Array<any>): void {
		if (Constants.IS_DEBUG) {
			console.log(...message);
		}
	}
	
	// Check whether an object is null or undefined
	static isNullOrUndefined(obj: any) {
		return obj === undefined || obj === null;
	}
	
	// Produces random digits
	static random(min: number, max: number, flt?: number): number {
		flt = this.isNullOrUndefined(flt) ? 0 : flt;
		flt = 10 ** flt;
		min *= flt;
		max *= flt;

		return Math.round(Math.random() * (max - min) + min) / flt;
	}
	
	// Add "Click the screen to start" text on the scene
	static addClickText(scene: Phaser.Scene, nextSceneName: string): void {
		let startText: Phaser.GameObjects.DOMElement = this.addText(
			scene,
			Constants.SCREEN_WIDTH / 2,
			Constants.SCREEN_HEIGHT * 0.75,
			"Click the screen to start",
		);
		
		startText.alpha = 0.3;
		
		scene.tweens.add({
			targets: startText,
			alpha: 1,
			duration: 1024,
			yoyo: true,
			loop: -1,
		});
		
		scene.input.once("pointerup", (): void => {
			scene.tweens.killAll();
			
			this.sceneExit(scene, nextSceneName);
		});
	}
	
	// Exit the current scene by fading out
	static sceneExit(scene: Phaser.Scene, nextSceneName: string): void {
		this.log(`Exiting "${scene.scene.key}" scene`);
		this.log(`Moving to "${nextSceneName}" scene`);
		
		scene.scene.transition({
			target: nextSceneName,
			duration: Constants.SCREEN_TRANSITION_TIME,
			onUpdate: (progress: number): void => {
				// My workaround for camera fadeOut
				for (let child of scene.children.getChildren()) {
					let image: Phaser.GameObjects.Image = <Phaser.GameObjects.Image> child;

					image.setAlpha(1 - progress);
				}
			}
		});
		
		// I'd like to do this way, but it seems that it doessn't work
		// for DOM elements, so I tried find for a workaround.
		// scene.cameras.main.fadeOut(SCREEN_TRANSITION_TIME);
	}
	
	static sceneEntry(scene: Phaser.Scene): void {
	// Enter the new scene by fading in
		this.log(`Entering "${scene.scene.key}" scene`);
		
		scene.events.on("transitionstart", (): void => {
			// HACK: Workaround
			for (let child of scene.children.getChildren()) {
				let image: Phaser.GameObjects.Image = <Phaser.GameObjects.Image> child;

				image.setAlpha(0);
			}
		}, scene);
		
		scene.events.on("transitioncomplete", (): void => {
			// HACK: Workaround
			scene.tweens.add({
				targets: scene.children.getChildren(),
				alpha: {
					from: 0,
					to: 1,
				},
				duration: Constants.SCREEN_TRANSITION_TIME,
				ease: "none",
			});
		}, scene);
	}
	
	// Create a button to the scene
	static addText(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string,
		width?: number,
		height?: number,
		fontSize?: number,
		color?: string
	): Phaser.GameObjects.DOMElement {
		this.log(`Adding text to ${JSON.stringify({ x: x, y: y })}`);

		fontSize = this.isNullOrUndefined(fontSize) ? Constants.FONT_SIZE : fontSize;
		color = this.isNullOrUndefined(color) ? Constants.FONT_COLOR : color;
		
		const textElm: Phaser.GameObjects.DOMElement = scene.add.dom(x, y, "span", {
			color: color,
			fontFamily: Constants.FONT_FAMILY,
			fontSize: `${fontSize}px`,
			width: this.isNullOrUndefined(width) ? "auto" : `${width}px`,
			height: this.isNullOrUndefined(height) ? "auto" : `${height}px`,
		}, text);
		
		textElm.setClassName("game-ui-text");
		
		return textElm;
	}
	
	// Create a button to the scene
	static addButton(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string,
		nextSceneName: string
	): Phaser.GameObjects.DOMElement {
		this.log(`Adding '${text}' button to ${JSON.stringify({ x: x, y: y })}`);
		
		const buttonElm: Phaser.GameObjects.DOMElement = scene.add.dom(x, y, "button", {
			fontFamily: Constants.FONT_FAMILY,
			fontSize: `${Constants.FONT_SIZE}px`,
			width: `${Constants.BUTTON_WIDTH}px`,
			height: `${Constants.BUTTON_HEIGHT}px`,
		}, text);
		
		buttonElm.setClassName("game-ui-button");
		buttonElm.addListener("click");
		buttonElm.once("click", (): void => {
			this.sceneExit(scene, nextSceneName);
		});
		
		return buttonElm;
	}

	// Get the X axis center of an object based on the screen size
	static getCenterX(obj: number | Phaser.GameObjects.Image): number {
		let width = (typeof obj !== "number") ? obj.width : obj;
		
		return (Constants.SCREEN_WIDTH / 2) - (width / 2);
	}

	// Get the Y axis center of an object based on the screen size
	static getCenterY(obj: number | Phaser.GameObjects.Image): number {
		let height = (typeof obj !== "number") ? obj.height : obj;
		
		return (Constants.SCREEN_HEIGHT / 2) - (height / 2);
	}
	
	// Get the Y position of button from the screen based on nth value of button
	static getButtonY(nth: number): number {
		return Constants.SCREEN_HEIGHT - (Constants.BUTTON_HEIGHT * (nth - 1 + 0.5)) - (30 * nth);
	}
}
