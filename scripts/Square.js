// Class for square
function Square(x, y, l, a = 0, c = color(random(0,255), random(0,255), random(0,255))) {
	this.x = x;		// x pos
	this.y = y;		// y pos
	this.l = l;		// length
	this.a = a;		// angle

	// pos vector for easier interaction with userEvents
	this.pos = Vector.create(this.x, this.y);

	// what type of object is this
	this.type = "square";

	// links to ObjectHandler that added it
	this.oh = null;

	// color
	this.c = c;

	this.lifetime = 60*3; // lifetime in frames (fps * s)
	this.age = 0;

	this.over = false;

	// options for body
	var options = {
		angle: this.a,
		friction: 0.2
	};

	this.body = new Bodies.rectangle(x, y, l, l, options)

	// update based on matter.js engine runner
	this.update = function() {
		this.x = this.body.position.x;
		this.y = this.body.position.y;
		this.a = this.body.angle;

		++this.age;
	}

	// function to check if square is dead
	this.isDead = function() {
		return (this.age >= this.lifetime);
	}

	this.isGone = function() {
		return (this.x > width + 40 ||
						this.x < -40 ||
						this.y > height + 40||
						this.y < -40);
	}

	// show using p5 as renderer
	this.show = function() {
		Render.draw(this);
 	}

	this.isOn = function(x1,y1) {
		var leftBound = this.x - floor(this.l/2);
		var rightBound = this.x + floor(this.l/2);
		var upperBound = this.y - floor(this.l/2);
		var lowerBound = this.y + floor(this.l/2);

		if (x1 > leftBound && x1 < rightBound && y1 > upperBound && y1 < lowerBound) {
			this.over = true;
		} else {
			this.over = false
		}
		return this.over;
	}

	// what to do when clicked
	this.onClick = function() {
		// switch to circle
		this.oh.add(new Circle(this.x, this.y, this.l/2, this.a, this.c));

		// remove this from ObjectHandler
		this.oh.remove(this);
	}

}
