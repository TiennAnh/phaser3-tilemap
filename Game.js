var config = {
    type: Phaser.AUTO,
    width: 800,
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

var player;
var game = new Phaser.Game(config);

function preload() {
    this.load.image("tiles", "./images/scene.png");
    this.load.tilemapTiledJSON('map', "tilemap3.json")

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
    const map = this.make.tilemap ({ key: "map" });
    const tileset = map.addTilesetImage("ground-tileset", "tiles");

    const sealayer = map.createLayer("Sea", tileset, 0, 0).setScale(4)
    const islandlayer = map.createLayer("Island", tileset, 0, 0).setScale(2.5); 
    const objectlayer = map.createLayer("Object", tileset, 0, 0).setScale(2.5);
    const collisionLayer = map.createLayer("Collision", tileset, 0, 0).setScale(2.5).setAlpha(0.6);
    collisionLayer.setCollisionBetween(0, 500)
    player = this.physics.add.sprite(200, 200, 'moveDown', 1).setScale(2);
    this.physics.add.collider(player, collisionLayer);
    

    var config_left = {
        key: 'left', //anims key
        frames: this.anims.generateFrameNumbers('moveLeft', { start: 0, end: 3 }), // bn anh trong sprites
        frameRate: 4, // fps
        repeat: -1, // so lan lap < 0 lap vo tan
    }
    var config_up = {
        key: 'up',
        frames: this.anims.generateFrameNumbers('moveUp', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
    }
    var config_down = {
        key: 'down',
        frames: this.anims.generateFrameNumbers('moveDown', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
    }
    var config_right = {
        key: 'right',
        frames: this.anims.generateFrameNumbers('moveRight', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
    }
    var config_turn_down = {
        key: 'turn-down',
        frames: [ { key: 'moveDown', frame: 0 }],
        frameRate: 4,
        repeat: 1
    }
    var config_turn_up = {
        key: 'turn-up',
        frames: [ { key: 'moveUp', frame: 0 }],
        frameRate: 4,
        repeat: 1
    }
    var config_turn_right = {
        key: 'turn-right',
        frames: [ { key: 'moveRight', frame: 0 }],
        frameRate: 4,
        repeat: 1
    }
    var config_turn_left = {
        key: 'turn-left',
        frames: [ { key: 'moveLeft', frame: 0 }],
        frameRate: 4,
        repeat: 1
    }
    


    this.anims.create(config_left);
    this.anims.create(config_up);
    this.anims.create(config_down);
    this.anims.create(config_right);
    this.anims.create(config_turn_down);
    this.anims.create(config_turn_left);
    this.anims.create(config_turn_right);
    this.anims.create(config_turn_up);

    cursors = this.input.keyboard.createCursorKeys();
}
let lastDirection = 'down'
function update() {
    
    if (cursors.left.isDown) {
        player.x -= 4;
        player.anims.play('left', true);
        lastDirection = 'left'
    } 
    else if (cursors.right.isDown) {
        player.x += 4;
        player.anims.play('right', true);
        lastDirection = 'right'
    }
     else if (cursors.up.isDown) {
        player.y -= 4;
        player.anims.play('up', true);
        lastDirection = 'up'
    } else if (cursors.down.isDown) {
        player.y += 4
        player.anims.play('down', true);
        lastDirection = 'down'
    } else {
        console.log("here");
        player.anims.play('turn-' + lastDirection, true);
    }
    
}