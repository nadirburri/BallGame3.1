var windowx,
windowy,
canvas,
player,
quadTree,
ctx;

var drawObjects;
var keyState;

var mainloop;
var animFrame;
var ONE_FRAME_TIME;

var reset = function () {

//get canvas and set height and width
canvas = document.getElementById('canvas');
canvas.setAttribute('width', windowx / 2);
canvas.setAttribute('height', windowy / 2);
ctx = canvas.getContext("2d");
drawObjects = [];
keyState = {};
quadTree = new Quadtree(quadTreeBounds);


//make the friendly square
player = new Rectangle(20, 20, 40, 40, 0, 0, XPhysicsBehaviorNormal, YPhysicsBehaviorNormal, XBoundaryBehaviorInCanvas, YBoundaryBehaviorInCanvas, playerObjectType, '#580000', null);
drawObjects.push(player);
drawObjects.push(new Rectangle(40, 100, canvas.width + (distanceOutsideCanvasBeforeDie / 2), canvas.clientHeight - 100, defaultEnemyRectangleVelocity, 0, null, YPhysicsBehaviorNormal, null, YBoundaryBehaviorInCanvas, enemyObjectType, null, OutOfCanvasDieBehavior));


backgroundMusicAudio.play();

//define main loop
mainloop = function () {
    buildQuadTree();
    updateGame();
    drawGame();
};

//define the windowanimationframeobject
animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

if (animFrame !== null) {
    var recursiveAnim = function () {
        mainloop();
        animFrame(recursiveAnim, canvas);
    };

    // start the mainloop
    animFrame(recursiveAnim, canvas);
} else {
    // fallback to setInterval if the browser doesn't support requestAnimationFrame
    ONE_FRAME_TIME = 1000.0 / 60.0;
    setInterval(mainloop, ONE_FRAME_TIME);
}
}

$(function () {
//get window width and height;
windowx = window.innerWidth;
windowy = window.innerHeight;

reset();

$(document).on('change', '#sound-enabled-toggle', function() {
    var isChecked = $(this).is(':checked');
    $('#sound-enabled-toggle').blur();
    if (isChecked) {
        backgroundMusicAudio.play();
        playerJumpAudio = playerJumpMusicAudioSetup();
        playerBlinkAudio = playerBlinkMusicAudioSetup();
    } else {
        backgroundMusicAudio.pause();
        playerJumpAudio = new Audio('');
        playerBlinkAudio = new Audio('');
    }
});
});

//left the function here in case I need to do anything else but for now it's  just clearing.
function buildQuadTree() {
    quadTree.clear();
}

function updateGame() {

//determine if there are any keys pushed at the current point
keyPressActions();

//loop for calculating and updating all objects positions/values.
for (var i = 0; i < drawObjects.length; i++) {
    var object = drawObjects[i];
    quadTree.insert(new SimpleRectangle(object.x, object.y, object.width || (object.radius * 2), object.height || (object.radius * 2), object.name));
    object.update();

    //roundFloatingPoints Numbers to 2 decimal places
    roundObjectVelocitiesAndPoints(object);
}
PlayerDeathTrigger(player);
}

function drawGame() {
//clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.font = "20px Verdana";
ctx.fillText("100,000", (canvas.width * .8), (canvas.clientHeight * .1));
ctx.font = "15px Verdana";
ctx.fillText("Temp Score", (canvas.width * .8), (canvas.clientHeight * .05));

//draw all objects in drawObjects
for (var i = 0; i < drawObjects.length; i++) {
    var object = drawObjects[i];
    object.draw();
}
}