//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var timer = 0;
var caught = false;
var fps = 10;
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 750;

//Background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "background.png";

//Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "bug.png";

var bug = {};
var bugCaught = 0;

// When bug is caught, reset
var reset = function () {
    bug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (bug.y < 100)
};

//mousedown event
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {
    if (e.button != 0) return;

    mouseXinCanvas = e.clientX;
    mouseYinCanvas = e.clientY;

    if (bugBody(bug, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
        render();
    }
};

function bugBody(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 80)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)

    ){
        fps += 5;
        bugCaught++;
        console.log(fps);
        console.log(bugCaught);
        return true;
    }
    return false;
};

//Reset score box
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false; 
};

//Reset speed box
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};

//Draw everything
var render = function () {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

   
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    // Score, Title
    ctx.fillStyle = "rgb(250, 250, 250)";    
    ctx.font = "28px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Catch Me!", 50, 45);
    ctx.font = "20px Helvetica";
    ctx.fillText("Score: " + bugCaught, 50, 80);
   

    // Reset Score, Speed button
    ctx.fillStyle = "grey";
    ctx.fillRect(250, 10, 200, 60);
    ctx.fillRect(520, 10, 200, 60);
    ctx.fillStyle = "grey";
    ctx.fillRect(255, 15, 190, 50);
    ctx.fillRect(525, 15, 190, 50);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "28px Arial";
    ctx.fillText("Reset Score", 265, 22);
    ctx.fillText("Reset Speed", 535, 22);


};

//The main game loop
var main = function () {
    render();

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

