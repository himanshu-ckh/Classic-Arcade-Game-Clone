var count = 0;
var move = document.getElementById('moves');
var life = 3;

// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if(this.x>505){
        this.x = -50;
        this.speed = 150 + Math.floor(Math.random() * 200);
    }
     if (player.x < this.x + 30 &&
        player.x + 30 > this.x &&
        player.y < this.y + 50 &&
        50 + player.y > this.y) {
        player.reset();
        player.lives();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(pSpeed, x, y){
    this.speed = pSpeed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if(this.x<0){
        this.x=0;
    }
    if(this.x>=420)
    {
        this.x = 420;
    }
    if(this.y > 400){
        this.y = 400;
    }
    if(this.y < -10){
        this.reset();
    }
};

Player.prototype.reset = function(){
    move.innerHTML = '0';
    this.x = 200;
    this.y = 400;
    count = 0;
};

/*Function to decrease the life if it player collides with enemies*/
Player.prototype.lives = function(){
    life = life-1;
    if(life == 0){
        alert("You have no lives left :( Play Again!!");
    }
}

Player.prototype.handleInput = function(key){
    if(key == 'left'){
        this.x = this.x-30;
        count = count + 1;
    } else if(key == 'right') {
        this.x = this.x + 30;
        count = count + 1;
    } else if(key == 'up') {
        this.y = this.y - 30;
        count = count + 1;
    } else if(key == 'down'){
        this.y = this.y + 30;
        count = count + 1;
    }
    move.innerHTML = count;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var bug;
[60,145,230].forEach(function(yPosi) {
    bug = new Enemy(100 + Math.floor(Math.random  () * 400), 0, yPosi);
    allEnemies.push(bug);
});

// Place the player object in a variable called player
var player = new Player(20, 200, 400);

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
