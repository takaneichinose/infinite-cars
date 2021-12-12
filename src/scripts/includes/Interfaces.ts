/**
 * Definition of the image assets
 */
 interface ImageAsset {
	Name: string;
	Link: string;
}

/**
 * Definition of the sprite sheet assets
 */
interface SpriteSheetAsset {
	Name: string;
	Link: string;
	FrameWidth: number;
	FrameHeight: number;
}

/**
 * Assets that will be shown on the game
 */
interface Assets {
	Image: Array<ImageAsset>;
	SpriteSheet: Array<SpriteSheetAsset>;
}
