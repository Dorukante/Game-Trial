const canvas = document.querySelector('canvas') // creating the canvas

const context = canvas.getContext('2d') //context of the canvas. Our game will be in 2D.

canvas.width = window.innerWidth // set the canvas window for the hall page

canvas.height = window.innerHeight // set the canvas window for the hall page

const gravity = 0.5

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

const player = new Player();

function animation() { //this function will move the player recursively over the time
    requestAnimationFrame(animation)
    context.clearRect(0, 0, canvas.width, canvas.height) //clears the previous positions of the player.
    player.updatePlayerPosition();

    if (key.right.pressed) { //move the player when button d is pressed
        player.velocity.x = 5; //stop the player when the button is not pressed anymore
    } else if (key.left.pressed) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
    }


}
animation();

//we will add listenners to get the input from the keyboard.

window.addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
        case 65:
            console.log('left')
            key.left.pressed = true;
            break;

        case 83:
            console.log('down');
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

        case 83:
            console.log('down');
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