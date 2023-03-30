var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

const TILE_SCALE = 1.8;                             
const SPEED = 100;

var player;
var game = new Phaser.Game(config);

var controls;
function preload() {
    // this.load.image("tiles", "./images/scene.png");
    this.load.tilemapTiledJSON('test', "test.json")

    this.load.image("tile1", "./images/tiles-0.png");
    this.load.image("tile2", "./images/tiles-1.png");
    this.load.image("tile3", "./images/tiles-2.png");
    this.load.image("tile4", "./images/tiles-3.png");
    this.load.image("tile5", "./images/tiles-4.png");
    this.load.image("tile6", "./images/tiles-5.png");
    this.load.image("tile7", "./images/tiles-6.png");
    this.load.image("tile8", "./images/tiles-7.png");
    this.load.image("tile9", "./images/tiles-8.png");

    // this.load.tilemapTiledJSON('map', "map-puzzle-quest.json");

    this.load.spritesheet("moveRight", "./images/moveRight.png", {
         frameWidth: 24, frameHeight: 24
        });
    this.load.spritesheet("moveLeft", "./images/moveLeft.png", { 
        frameWidth: 24, frameHeight: 24
    });
    this.load.spritesheet("moveUp", "./images/moveUp.png", { 
        frameWidth: 24, frameHeight: 24
    });
    this.load.spritesheet("moveDown", "./images/moveDown.png", { 
        frameWidth: 24, frameHeight: 24
    });
}


function create() {
    const map = this.make.tilemap ({ key: "test" });

    const tileset1 = map.addTilesetImage("Tile-1", "tile1");
    const tileset2 = map.addTilesetImage("Tile-2", "tile2");
    const tileset3 = map.addTilesetImage("Tile-3", "tile3");
    const tileset4 = map.addTilesetImage("Tile-4", "tile4");
    const tileset5 = map.addTilesetImage("Tile-5", "tile5");
    const tileset6 = map.addTilesetImage("Tile-6", "tile6");
    const tileset7 = map.addTilesetImage("Tile-7", "tile7");
    const tileset8 = map.addTilesetImage("Tile-8", "tile8");
    const tileset9 = map.addTilesetImage("Tile-9", "tile9");

    const Floors = map.createLayer("Floors", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const WallBot = map.createLayer("Wall-bot", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const WallMid = map.createLayer("Wall-mid", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const WallTop = map.createLayer("Wall-top", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const PropsBot = map.createLayer("Props-bot", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const PropsMid = map.createLayer("Props-mid", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    const PropsTop = map.createLayer("Props-top", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    // const PropsMid = map.createLayer("Props-midle", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE); // magic number / magic value  TILE_SCALE
    // const PropsBot = map.createLayer("Props-bottom", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    // const WallMid = map.createLayer("Wall-midle", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE); 
    // const WallBot = map.createLayer("Wall-bottom", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    // const Foundations = map.createLayer("Foundations", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE);
    // const collisionLayer = map.createLayer("Collision", [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8, tileset9], 0, 0).setScale(TILE_SCALE).setAlpha(0);
    
    // // collisionLayer.setCollisionBetween(0, 500)
    // // this.physics.add.collider(player, collisionLayer);
    
    // player = this.physics.add.sprite(180, 470, 'moveDown', 1).setScale(TILE_SCALE - 1);
    // //setup camera
    // this.cameras.main.setBounds(0, 0, map.widthInPixels  * TILE_SCALE, map.heightInPixels * TILE_SCALE);
    // this.cameras.main.startFollow(player);

    // // setup world bounds
    // // this.physics.world.setBounds(0, 0, map.widthInPixels * 2.5, map.heightInPixels *2.5);
    // // player.setCollideWorldBounds(true)


    // var config_left = {
    //     key: 'left', //anims key
    //     frames: this.anims.generateFrameNumbers('moveLeft', { start: 0, end: 3 }), // bn anh trong sprites
    //     frameRate: 4, // fps
    //     repeat: -1, // so lan lap < 0 lap vo tan
    // }
    // var config_up = {
    //     key: 'up',
    //     frames: this.anims.generateFrameNumbers('moveUp', { start: 0, end: 3 }),
    //     frameRate: 4,
    //     repeat: -1,
    // }
    // var config_down = {
    //     key: 'down',
    //     frames: this.anims.generateFrameNumbers('moveDown', { start: 0, end: 3 }),
    //     frameRate: 4,
    //     repeat: -1,
    // }
    // var config_right = {
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('moveRight', { start: 0, end: 3 }),
    //     frameRate: 4,
    //     repeat: -1,
    // }
    // var config_turn_down = {
    //     key: 'turn-down',
    //     frames: [ { key: 'moveDown', frame: 0 }],
    //     frameRate: 4,
    //     repeat: 1
    // }
    // var config_turn_up = {
    //     key: 'turn-up',
    //     frames: [ { key: 'moveUp', frame: 0 }],
    //     frameRate: 4,
    //     repeat: 1
    // }
    // var config_turn_right = {
    //     key: 'turn-right',
    //     frames: [ { key: 'moveRight', frame: 0 }],
    //     frameRate: 4,
    //     repeat: 1
    // }
    // var config_turn_left = {
    //     key: 'turn-left',
    //     frames: [ { key: 'moveLeft', frame: 0 }],
    //     frameRate: 4,
    //     repeat: 1
    // }
    


    // this.anims.create(config_left);
    // this.anims.create(config_up);
    // this.anims.create(config_down);
    // this.anims.create(config_right);
    // this.anims.create(config_turn_down);
    // this.anims.create(config_turn_left);
    // this.anims.create(config_turn_right);
    // this.anims.create(config_turn_up);

    // cursors = this.input.keyboard.createCursorKeys();


    var cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setZoom(0.24);

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.04,
        drag: 0.0005,
        maxSpeed: 0.9
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}
let lastDirection = 'down'
function update(time, delta) {
    controls.update(delta);

    // player.body.setVelocity(0);
    
    // if (cursors.left.isDown)
    // {
    //     player.body.setVelocityX(-100);
    // }
    // else if (cursors.right.isDown)
    // {
    //     player.body.setVelocityX(100);
    // }

    // // Vertical movement
    // if (cursors.up.isDown)
    // {
    //     player.body.setVelocityY(-100);
    // }
    // else if (cursors.down.isDown)
    // {
    //     player.body.setVelocityY(100);
    // }

    // // Update the animation last and give left/right animations precedence over up/down animations
    // if (cursors.left.isDown)
    // {
    //     player.anims.play('left', true);
    // }
    // else if (cursors.right.isDown)
    // {
    //     player.anims.play('right', true);
    // }
    // else if (cursors.up.isDown)
    // {
    //     player.anims.play('up', true);
    // }
    // else if (cursors.down.isDown)
    // {
    //     player.anims.play('down', true);
    // }
    // else
    // {
    //     player.anims.stop();
    // }
    
}