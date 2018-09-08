// Enemies our player must avoid
var Enemy = function(x,y,speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
    this.x = x;									// Note: x increments by 101		
    this.y = y;									// Note: y increments by 83
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// the tiles' pixel positions are: 400, 317, 234, 151, 68 and -15 (botom up - y axis)
// and -2, 99, 200, 301, 402 (left to right - x axis)
// frame's left edge is -2 and the right edge is 402
// for bugs to enter and leave the frame, use -93 and 493 for left and right values respectively
const leftOut = -93;
const rightOut = 493;
const firstLane = 68;
const xIncrement = 101;
const yIncrement = 83;

// Note: rightward movement by 30 pixels * dt takes a bug approx 20 secs to cross the frame
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < rightOut) {					// while enemy bug has not yet left the frame
        this.x += this.speed * dt;				// allow rightward movement by value of speed
    }else{							    		// or else
        this.x = leftOut;						// reset enemy bug to starting position
    }
	this.checkCollisions();						// call checkCollisions() from update()
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if an enemy has collided with the player
Enemy.prototype.checkCollisions = function() {
    if (this.y === player.y){
        if (this.x < player.x && this.x+60 > player.x){		// add 2 to account for enemy's imprecise position
            player.reset();
	    }
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// 200 is the center tile on the x-axis and 400 is the bottommost tile on the y-axis
class Player {
	constructor() {
		this.startX = 200;
		this.startY = 400;
		this.x = this.startX;
		this.y = this.startY;
		this.sprite = 'images/char-boy.png';
	}

	reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(input) {
		if (input === 'up'&& this.y>-15) {				// if player  has not reached the last tile
			this.y -= 83;									// allow upward movement
		}else if (input === 'down' && this.y < 400){		// if player has not reached the first tile
			this.y += 83;									// allow downward movement
		}else if (input === 'right' && this.x < 402) {		// if player has not reached the right edge
			this.x += 101;									// allow rightward movement
		}else if (input === 'left' && this.x > 0){			// if player has not reached the left edge
			this.x -= 101;									// allow leftward movement
		}
   }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy0 = new Enemy(leftOut,firstLane,30);
let enemy1 = new Enemy(leftOut,(firstLane+yIncrement),50);
let enemy2 = new Enemy(leftOut,(firstLane+yIncrement*2),90);
let enemy3 = new Enemy(leftOut-xIncrement*2, firstLane+yIncrement,50);
let allEnemies = [];
allEnemies.push(enemy0,enemy1,enemy2,enemy3);
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	
    player.handleInput(allowedKeys[e.keyCode]);
});
