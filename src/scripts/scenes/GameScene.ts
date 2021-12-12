import * as Phaser from "phaser";

import * as Enums from "../includes/Enums";
import * as Constants from "../includes/Constants";
import Methods from "../includes/Methods";

/**
 * Scene for the main itself
 */
export default class GameScene extends Phaser.Scene {
	road: Phaser.Physics.Arcade.Group;
	roadCone: Phaser.Physics.Arcade.Group;
	computer: Phaser.Physics.Arcade.Group;
	character: Phaser.Physics.Arcade.Image;
	grassObject: Phaser.Physics.Arcade.Group;
	
	// Game timers
	startTime: Phaser.Time.TimerEvent;
	accelerateTime: Phaser.Time.TimerEvent;
	
	// Movement count
	movementCount: number = 0;
	
	// Speed
	carSpeed: number = Constants.INITIAL_SPEED;
	
	// Is game over flag
	isGameOver: boolean = false;
	
	// The traveled score
	score: number = 0;
	
	constructor() {
		super("Game");
	}
	
	create() {
		Methods.sceneEntry(this);
		
		this.initialize();
	}
	
	update() {
		this.animate();
	}
	
	// Initialize the map for the beginning of the game
	initialize(): void {
		Methods.log("Initializing the game");
		
		this.placeCharacter();
		this.defineObjects();
		this.createMap();
		
		this.addColliders();
		
		this.carSpeed = Constants.INITIAL_SPEED;
		this.isGameOver = false;
		this.score = 0;
		
		this.startTime = this.time.addEvent({
			delay: Constants.GAME_START_TIME,
			callback: () => {
				this.physics.resume();
			}
		});
		
		this.accelerateTime = this.time.addEvent({
			delay: Constants.ACCELERATE_TIME,
			repeat: (Constants.TERIMINAL_SPEED - Constants.INITIAL_SPEED) / Constants.ACCELERATION,
			callback: () => {
				Methods.log("Accelerating the speed");
				
				// this.carSpeed += Constants.ACCELERATION;
			}
		});
		
		this.physics.pause();
	}
	
	// Define objects
	defineObjects(): void {
		Methods.log("Defining objects on the scene");
		
		this.road = this.physics.add.group();
		this.roadCone = this.physics.add.group();
		this.computer = this.physics.add.group();
		this.grassObject = this.physics.add.group();
	}
	
	// Define the map
	createMap(): void {
		Methods.log("Creating map with the layout:", Constants.ROAD_LAYOUT);
		
		const roadCountY: number = Constants.SCREEN_HEIGHT / Constants.CELL_SIZE;
		
		for (let y: number = - 1; y < roadCountY; y++) {
			const Y: number = y * Constants.CELL_SIZE;

			if (y < Constants.SCREEN_HEIGHT / Constants.CELL_SIZE / 2) {
				// First half of the screen

				this.createRoad(Y, true);
			}
			else {
				// Another half of the screen

				this.createRoad(Y, false);
			}
		}
	}

	// Create a row of a road
	createRoad(Y: number, addObject: boolean): void {
		for (let x: number = 0; x < Constants.ROAD_LAYOUT.length; x++) {
			const X: number = x * Constants.CELL_SIZE;
			const texture: string = Constants.ROAD_LAYOUT[x];
			
			this.road
				.create(X, Y, texture)
				.setOrigin(0)
				.setDepth(0)
				.setVelocityY(this.carSpeed);
		}

		if (addObject) {
			this.addComputer(Y);
			this.addRoadCone(Y);
		}

		this.addGrassObject(Y);
	}
	
	// Add a grass object at the side of the road
	addGrassObject(y: number): void {
		for (let i: number = 0; i < Constants.ROAD_LAYOUT.length; i++) {
			if (Constants.ROAD_LAYOUT[i] !== "grass") {
				continue;
			}
			
			const grassObject: number = Methods.random(0, 2);
			
			if (Methods.random(0, 1) === 0 || grassObject === Enums.GrassObject.none) {
				continue;
			}
			
			let texture: string = null;

			if (grassObject === Enums.GrassObject.tree) {
				Methods.log("Adding tree to the scene");

				texture = "tree";
			}
			else if (grassObject === Enums.GrassObject.flower) {
				Methods.log("Adding flower to the scene");

				texture = "flower";
			}
			
			const x: number = i * Constants.CELL_SIZE;

			this.grassObject
				.create(x, y, texture)
				.setOrigin(0)
				.setDepth(1)
				.refreshBody()
				.setVelocityY(this.carSpeed);
		}
	}
	
	// Add a computer into the screen
	addComputer(y: number): void {
		for (let i: number = 0; i < Constants.ROAD_LAYOUT.length; i++) {
			if (Constants.ROAD_LAYOUT[i].indexOf("road") < 0) {
				continue;
			}
			else if (Methods.random(0, Constants.COMPUTER_RNG) > 0) {
				continue;
			}

			Methods.log("Adding computer car to the scene");

			const x: number = i * Constants.CELL_SIZE;
			const speed: number =
						Methods.random(Constants.MIN_COMPUTER_SPEED, Constants.MAX_COMPUTER_SPEED);

			this.computer
				.create(x + (Constants.CELL_SIZE / 2), y, "computer")
				.setOrigin(0.5, 0)
				.refreshBody()
				.setDepth(Constants.CELL_SIZE * 2 + 1)
				.setVelocityY(speed);
		}
	}
	
	// Add a road cone into the screen
	addRoadCone(y: number): void {
		for (let i: number = 0; i < Constants.ROAD_LAYOUT.length; i++) {
			if (Constants.ROAD_LAYOUT[i].indexOf("road") < 0) {
				continue;
			}
			else if (Methods.random(0, Constants.ROAD_CONE_RNG) > 0) {
				continue;
			}
			
			Methods.log("Adding road cone to the scene");

			const x: number = i * Constants.CELL_SIZE;

			this.roadCone
				.create(x + (Constants.CELL_SIZE / 2), y, "road-cone")
				.setOrigin(0.5, 0)
				.refreshBody()
				.setDepth(Constants.CELL_SIZE * 2 + 1)
				.setVelocityY(this.carSpeed);
		}
	}
	
	// Place the character on the road
	placeCharacter(): void {
		const c = Constants.CELL_SIZE;
		const x = Methods.random(3, 6) * c + (c / 2);
		const y = Constants.CHARACTER_DEFAULT_Y;
		
		Methods.log(`Adding the main character to`, JSON.stringify({ x: x, y: y }));
		
		this.character =
			this.physics.add.image(x, y, "character")
				.setCollideWorldBounds(true)
				.setDepth(Constants.CELL_SIZE * 2 + 1);
		
		const boundary: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle(
			Constants.CELL_SIZE * 3,
			0,
			Constants.CELL_SIZE * 4,
			Constants.SCREEN_HEIGHT
		);

		const characterBody: Phaser.Physics.Arcade.Body =
			this.character.body as Phaser.Physics.Arcade.Body;
		
		characterBody.setBoundsRectangle(boundary);
		
		this.physics.world.on("collide", (a, b, c) => {
			Methods.log(a, b, c);
		});
		
		if (Constants.IS_DEBUG) {
			this.add.graphics()
				.lineStyle(10, 0xff0000, 0.5)
				.strokeRectShape(characterBody.customBoundsRectangle);
		}
	}
	
	// Add collision with the character and objects
	addColliders(): void {
		Methods.log("Adding colliders of the objects");
		
		this.physics.add.collider(this.computer, this.computer);
		this.physics.add.collider(this.computer, this.roadCone);
		this.physics.add.collider(this.roadCone, this.roadCone);
		
		this.physics.add.collider(this.character, this.computer, () => {
			this.setGameOver();
		});
		this.physics.add.collider(this.character, this.roadCone, () => {
			this.setGameOver();
		});
	}
	
	// Animate all the objects on the screen
	animate(): void {
		if (this.isGameOver) {
			return;
		}
		
		this.repositionRoad();
		this.destroyOffScreen(this.road);
		this.destroyOffScreen(this.computer);
		this.destroyOffScreen(this.roadCone);
		this.destroyOffScreen(this.grassObject);
		this.addCharacterEvents();
		
		this.setScore();
	}

	// Add a row of road at the top
	repositionRoad(): void {
		const children: Array<Phaser.GameObjects.GameObject> = this.road.getChildren();
		const firstRoad: Phaser.GameObjects.Image = children[0] as Phaser.GameObjects.Image;

		if (firstRoad.y < 0) {
			return;
		}

		for (const i in this.road.getChildren()) {
			const road: Phaser.GameObjects.Image = children[i] as Phaser.GameObjects.Image;

			road.setY(road.y - Constants.CELL_SIZE);
		}

		const Y: number = Constants.CELL_SIZE * -1;

		this.addComputer(Y);
		this.addRoadCone(Y);
		this.addGrassObject(Y);
	}

	// Destroy objects that are out of screen
	destroyOffScreen(objects: Phaser.Physics.Arcade.Group | Phaser.GameObjects.Group): void {
		for (const object of objects.getChildren()) {
			let obj: Phaser.GameObjects.Image = object as Phaser.GameObjects.Image;

			if (obj.y > Constants.SCREEN_HEIGHT) {
				obj.destroy();
			}
		}
	}
	
	// Add events and controls to the character
	addCharacterEvents(): void {
		const cursors = this.input.keyboard.createCursorKeys();
		
		if (cursors.left.isDown) {
			this.character.setVelocityX(Constants.MOVE_SPEED * -1);
		}
		else if (cursors.right.isDown)  {
			this.character.setVelocityX(Constants.MOVE_SPEED);
		}
		else {
			this.character.setVelocityX(0);
		}
		
		if (cursors.up.isDown) {
			this.character.setVelocityY(Constants.MOVE_SPEED * -1);
		}
		else if (cursors.down.isDown)  {
			this.character.setVelocityY(Constants.MOVE_SPEED);
		}
		else {
			this.character.setVelocityY(0);
		}
	}
	
	// Set the current score displayed
	setScore(): void {
		// Methods.log(this.score);
	}
	
	// Set the game into game over state, then move the scene
	setGameOver(): void {
		Methods.log("Collided with other object");
		
		// Pause the physics animation
		this.physics.pause();
		
		// Remove the game timer
		this.time.removeEvent(this.startTime);
		this.time.removeEvent(this.accelerateTime);
		
		this.isGameOver = true;
		
		// Redirect to game over scene
		this.time.addEvent({
			delay: Constants.GAME_END_TIME,
			callback: () => {
				Methods.sceneExit(this, "GameOver");
			}
		});
	}
}