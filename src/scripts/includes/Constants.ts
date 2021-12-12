import "./Interfaces";

export const SCREEN_WIDTH: number = 320;
export const SCREEN_HEIGHT: number = 480;
export const MIN_SCREEN_WIDTH: number = SCREEN_WIDTH / 8;
export const MIN_SCREEN_HEIGHT: number = SCREEN_HEIGHT / 8;
export const MAX_SCREEN_WIDTH: number = SCREEN_WIDTH * 4;
export const MAX_SCREEN_HEIGHT: number = SCREEN_HEIGHT * 4;

export const SCREEN_TRANSITION_TIME: number = 512;

export const CELL_SIZE: number = 32;

export const FONT_COLOR: string = "#ffffff";
export const FONT_FAMILY: string = `"Open Sans", sans-serif`;
export const FONT_SIZE: number = 24; // Used for some UI elements
export const TEXT_SIZE: number = 16; // Used for typography

export const BUTTON_WIDTH: number = 176;
export const BUTTON_HEIGHT: number = 48;

export const CHARACTER_WIDTH: number = 24;
export const CHARACTER_HEIGHT: number = 56;
export const CHARACTER_DEFAULT_Y: number = SCREEN_HEIGHT - CHARACTER_HEIGHT - 10;

export const INITIAL_SPEED: number = 160;
export const TERIMINAL_SPEED: number = 320;
export const ACCELERATION: number = 32;
export const ACCELERATE_TIME: number = 10000;
export const MOVE_SPEED: number = 64;

export const GAME_START_TIME: number = 4000;
export const GAME_END_TIME: number = 5000;

export const MIN_COMPUTER_SPEED: number = 50;
export const MAX_COMPUTER_SPEED: number = 100;

export const COMPUTER_RNG: number = 20;
export const ROAD_CONE_RNG: number = 40;

export const ASSETS_PATH: string = "https://assets.codepen.io/430361";

export const ASSETS: Assets = {
	Image: [{
		Name: "character",
		Link: "infinite-cars-character.png",
	}, {
		Name: "computer",
		Link: "infinite-cars-computer.png",
	}, {
		Name: "middle-road",
		Link: "infinite-cars-middle-road.png",
	}, {
		Name: "left-road",
		Link: "infinite-cars-left-road.png",
	}, {
		Name: "right-road",
		Link: "infinite-cars-right-road.png",
	}, {
		Name: "left-gutter",
		Link: "infinite-cars-left-gutter.png",
	}, {
		Name: "right-gutter",
		Link: "infinite-cars-right-gutter.png",
	}, {
		Name: "left-road-turn-left",
		Link: "css-maze-barrel.png",
	}, {
		Name: "right-road-turn-left",
		Link: "css-maze-barrel.png",
	}, {
		Name: "left-road-turn-right",
		Link: "css-maze-door.png",
	}, {
		Name: "right-road-turn-right",
		Link: "css-maze-door.png",
	}, {
		Name: "tree",
		Link: "infinite-cars-tree.png",
	}, {
		Name: "grass",
		Link: "infinite-cars-grass.png",
	}, {
		Name: "flower",
		Link: "infinite-cars-flower.png",
	}, {
		Name: "road-cone",
		Link: "infinite-cars-road-cone.png",
	}],
	SpriteSheet: [{
		Name: "explosion",
		Link: "infinite-cars-explosion.png",
		FrameWidth: 32,
		FrameHeight: 32,
	}, {
		Name: "stop-light",
		Link: "infinite-cars-stop-light.png",
		FrameWidth: 96,
		FrameHeight: 240,
	}],
};

export const ROAD_LAYOUT: Array<string> = [
	"grass",
	"grass",
	"left-gutter",
	"left-road",
	"middle-road",
	"middle-road",
	"right-road",
	"right-gutter",
	"grass",
	"grass",
];
export const ROAD_REPEAT_Y: number = 16;

export const IS_DEBUG: boolean = false;
