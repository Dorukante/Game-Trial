const canvas = document.querySelector('canvas') // creating the canvas

const context = canvas.getContext('2d') //context of the canvas. Our game will be in 2D.

canvas.width = window.innerWidth // set the canvas window for the hall page

canvas.height = window.innerHeight // set the canvas window for the hall page

const gravity = 0.3

const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }

}

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 50
        this.height = 50

        this.velocity = { //movement of the player
            x: 0,
            y: 0
        }
    }
    drawPlayer() {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    updatePlayerPosition() { //changes the position of the player in canvas
        this.drawPlayer();
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0;
        }
    }

}

class Platform { //platform is created
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 200
        this.height = 20
    }

    drawPlatform() {
        context.fillStyle = 'Red ';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
}

let Offset = 0 //we use let because it would vary in over time



const platforms = [new Platform(200, 100), new Platform(370, 250)];

const player = new Player();

function animation() { //this function will move the player recursively over the time
    requestAnimationFrame(animation)
    context.clearRect(0, 0, canvas.width, canvas.height) //clears the previous positions of the player.
    player.updatePlayerPosition();
    platforms.forEach(platform => {
        platform.drawPlatform();
    })


    if (key.right.pressed && player.position.x < 400) { //move the player when button d is pressed
        player.velocity.x = 5; //stop the player when the button is not pressed anymore
    } else if (key.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (key.right.pressed) {
            Offset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5 //moving the platforms
            })

        } else if (key.left.pressed) {
            Offset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5 //moving the platforms
            })

        }

        if (Offset > 2000) {
            console.log("You have completed the level"); //THis indicates that you have won the game
        }
    }

    platforms.forEach(platform => {


        //All of the code below for platform collision detection untill the end of if statement
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width > platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
}
animation();

//we will add listenners to get the input from the keyboard.

window.addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
        case 65:
            console.log('left')
            key.left.pressed = true;
            break;

        case 68:
            console.log('move right');
            key.right.pressed = true;
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 20
            break;
    }
});

window.addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) {
        case 65:
            console.log('left')
            key.left.pressed = false;
            break;
        case 68:
            console.log('move right');
            key.right.pressed = false;

            break;
        case 87:
            console.log('up');

            break;
    }
});
