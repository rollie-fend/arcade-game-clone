// Enemies our player must avoid
var Enemy = function(x,y,speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = -93;						// for bug to start entering the frame, use -93
										// and for it to leave the frame, use 493 
	this.y = 68;							// this is the lane before the water 
	this.speed = 30;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Note: rightward movement by 30 pixels * dt takes a bug approx 20 secs to cross the frame
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if (this.x < 493) {						// while enemy bug has not yet left the frame
		this.x += 30 * dt;					// allow rightward movement by 30 pixels * dt (takes 20 secs to cross)
	}else{									// or else
		this.x = -93;						// reset enemy bug to starting position
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

let enemy0 = new Enemy();
let allEnemies = [];
allEnemies.push(enemy0);
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
