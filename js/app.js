/*Count the number of moves intitally they are 0*/
var count = 0;
var move = document.getElementById('moves');
/*No. of lives*/
var life = 3;
var li = document.getElementById('lives');
li.innerHTML = life;
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
        var r_2 = Math.floor(Math.random() * 200)
        this.speed = 150 + r_2;
    }
    if (player.x < this.x + 30 && player.x + 30 > this.x && player.y < this.y + 40 && 50 + player.y > this.y) {
        /* when the player collides with the bug reset the game board and decrease the life value*/
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
var Player = function(pSpeed, x, y) {
    this.speed = pSpeed;
    this.x = x;
    this.y = y;
    /*playerArray to store all the characters*/
    var playerArray = ['char-boy.png', 'char-cat-girl.png', 'char-horn-girl.png', 'char-pink-girl.png', 'char-princess-girl.png'];
    var r = Math.floor(Math.random() * 5);
    var img = playerArray[r];
    /*when we refresh the game a new character will load*/
    this.sprite = 'images/' + img;
};

Player.prototype.update = function() {
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
        this.win();
    }
};

/*if a Player wins the game*/
Player.prototype.win = function() {
    move.innerHTML = '0';
    this.x = 200;
    this.y = 400;
    count = 0;
    /*If a player wins the game a life will be added*/
    life = life+1;
    alert(" Congrats!! You have won!!, A life have been added");
    li.innerHTML = life;
};

/*if a player looses the game resets the values*/
Player.prototype.reset = function() {
    move.innerHTML = '0';
    this.x = 200;
    this.y = 400;
    count = 0;
};

/*Function to decrease the life if it player collides with enemies*/
Player.prototype.lives = function() {
    life = life-1;
    li.innerHTML = life;
    if(life == 0){
        alert("You have no lives left :( \nPlay again");
        life = 3;
    }
};

Player.prototype.handleInput = function(key) {
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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var sped = 100 + Math.floor(Math.random() * 400);
    var bug0 = new Enemy(sped, 0, 60);
    var bug1 = new Enemy(sped, 0, 145);
    var bug2 = new Enemy(sped, 0, 230);
    allEnemies.push(bug0);
    allEnemies.push(bug1);
    allEnemies.push(bug2);

// Place the player object in a variable called player
var player = new Player(40, 200, 400);

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