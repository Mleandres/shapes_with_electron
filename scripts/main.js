var canvas;
var Engine;
var World;
var Bodies;
var Render;
var Vector;
var engine;
var world;
var currentSelection;
var mouseBusy;
var shapes;

function setup() {
	Render = new RenderP5();
	canvas = Render.canvas;
	rectMode(CENTER);

	// flags for user interaction
	// nothing should be selected at start
	currentSelection = null;
	mouseBusy = false;

	// alias for stats
	stats = new Stats();

	// module aliases
	Engine = Matter.Engine;
	World = Matter.World;
	Bodies = Matter.Bodies;
	Vector = Matter.Vector;


	// create an engine
	engine = Engine.create();

	// give alias to engine.world
	world = engine.world;

	shapes = new ObjectHandler(500, stats);

	ground = new Ground();

	// add things to everything array

	// run the engine
	Engine.run(engine);
}

function draw() {
	background('rgba(51,51,51,0.75)');
	Engine.update(engine);
	currentSelection = checkAllCollision(shapes.objects);

	ground.show();

	shapes.update();
	shapes.show();

	stats.update();

}

function mousePressed() {
// object currently selected
	if (currentSelection !== null) {
		currentSelection.onClick();
	}

	// no object selected
	else {

		if (keyIsDown(16)) {
			makeVacuum(mouseX, mouseY);
		}

	}
}

function mouseReleased() {
	// is the mouse busy with a userEvent?
	if (mouseBusy !== true) {
		// object currently selected
		if (currentSelection !== null) {
			// place holder
		}

		// ctrl pressed
		else if (keyIsDown(17)) {
			makeExplosion(mouseX, mouseY);
		}

		// no modifier keys pressed
		else {
			makeStuff();
		}
	}

	else {
		shapes.endUserEvent();
	}
}




function checkAllCollision(val) {
	var obj = null;

	// val is an array
	var len = val.length;
	for (var i = 0; i < len; ++i) {
		if(val[i].isOn(mouseX,mouseY)) {
			obj = val[i];
		}
	}
	return obj;
}

function checkOneCollision(val) {
	return val.isOn();
}

function makeExplosion(x, y) {
	// make one explosion at x,y
	shapes.addUserEvent(new Explosion(x, y));
}

function makeVacuum(x, y) {
	shapes.addUserEvent(new Vacuum(x, y));
}


function makeStuff() {
	if (stats.currentShape === "square") {
		// squares
		for (var i = 0; i < stats.squareMult; ++i) {
			// make some squares at mouse positions
			makeSquare(mouseX,mouseY);
		}
	}
	else if (stats.currentShape === "circle") {
		//circles
		for (var i = 0; i < stats.circleMult; ++i) {
			// make some squares at mouse positions
			makeCircle(mouseX,mouseY);
		}
	}
	stats.nextShape();
}

// make a square with some variation
function makeSquare(x1, y1) {
	var rx = random(-30, 30);
	var ry = random(-30, 30);
	var x = x1 + rx;
	var y = y1 + ry;

	shapes.add(new Square(x, y, 50));
}

// make a circle with some variation
function makeCircle(x1, y1) {
	var rx = random(-30, 30);
	var ry = random(-30, 30);
	var x = x1 + rx;
	var y = y1 + ry;

	shapes.add(new Circle(x, y, 25));
}

function keyPressed() {
	if (keyCode === 32) {
		shapes.removeAll();
	}
	else if (keyCode === 82) {
		reset();
	}
}

function reset() {
	stats.reset();
	stats.update();

	shapes.removeAll();
}
