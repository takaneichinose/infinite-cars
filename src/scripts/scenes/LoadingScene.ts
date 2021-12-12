import * as Phaser from "phaser";

import * as Constants from "../includes/Constants";
import Methods from "../includes/Methods";

/**
 * Scene for loading screen
 */
export default class LoadingScene extends Phaser.Scene {
	constructor() {
		super("Loading");
	}
	
	preload() {
		Methods.sceneEntry(this);
		
		const PRELOADER_WIDTH: number = 192;
		const PRELOADER_HEIGHT: number = 32;
		const PRELOADER_PADDING: number = 4;
		
		let allAssetsCount: number = 0;
		let loadedAssetsCount: number = 0;
		
		// Assets to be loaded
		for (let image of Constants.ASSETS.Image) {
			const fileName: string = `${Constants.ASSETS_PATH}/${image.Link}`;
			
			this.load.image(image.Name, fileName);
			
			allAssetsCount++;
		}
		
		for (let spriteSheet of Constants.ASSETS.SpriteSheet) {
			const fileName: string = `${Constants.ASSETS_PATH}/${spriteSheet.Link}`;
			
			this.load.spritesheet(spriteSheet.Name, fileName, {
				frameWidth: spriteSheet.FrameWidth,
				frameHeight: spriteSheet.FrameHeight,
			});
			
			allAssetsCount++;
		}
		
		// Create preloader element
		const progressBar: Phaser.GameObjects.Graphics = this.add.graphics();
		const progress: Phaser.GameObjects.Graphics = this.add.graphics();
		
		// Style of the main progress bar
		progressBar.fillStyle(0xffffff, 1);
		progressBar.fillRect(
			Methods.getCenterX(PRELOADER_WIDTH),
			Methods.getCenterY(PRELOADER_HEIGHT),
			PRELOADER_WIDTH,
			PRELOADER_HEIGHT);
		
		// Loading Text
		const loadingText: Phaser.GameObjects.DOMElement = Methods.addText(
			this,
			Constants.SCREEN_WIDTH / 2,
			(Constants.SCREEN_HEIGHT / 2) - (Constants.FONT_SIZE * 1.5),
			"Loading..."
		);
		
		// Events
		this.load.on("progress", (value: number): void => {
			// Style the progress
			progress.clear();
			progress.fillStyle(0x39e600, 1);
			progress.fillRect(
				Methods.getCenterX(PRELOADER_WIDTH) + PRELOADER_PADDING,
				Methods.getCenterY(PRELOADER_HEIGHT) + PRELOADER_PADDING,
				(PRELOADER_WIDTH - (PRELOADER_PADDING * 2)) * value,
				PRELOADER_HEIGHT - (PRELOADER_PADDING * 2));
		});
		
		this.load.on("fileprogress", (file: Phaser.Loader.File): void => {
			Methods.log(`Loading asset key: ${file.key}`);
			
			loadedAssetsCount++;
		});
		
		this.load.on("complete", (): void => {
			Methods.log(`${loadedAssetsCount}/${allAssetsCount} assets loaded!`);
			
			loadingText.setText("Loading Complete!");
			
			Methods.addClickText(this, "Main");
		});
	}
}
