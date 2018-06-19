// Class for circle
function Circle(x, y, r, a = 0, c = color(random(0,255), random(0,255), random(0,255))) {
	this.x = x;		// x pos
	this.y = y;		// y pos
	this.r = r;		// length
	this.a = a;		// angle

	// position vector for easier interaction with userEvents
	this.pos = Vector.create(this.x, this.y);

	// what type of shape is it
	this.type = "circle";

	// links to ObjectHandler that added it
	this.oh = null;

	// c
	this.c = c;

	this.lifetime = 60*3; // lifetime in frames (fps * s)
	this.age = 0;

	this.over = false;

	// options for body
	var options = {
		angle: this.a,
		friction: 0.15
	};

	this.body = new Bodies.circle(x, y, r, options)

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
		var distance = dist(x1, y1, this.x, this.y)

		if (distance < this.r) {
			this.over = true;
		} else {
			this.over = false
		}
		return this.over;
	}

	this.onClick = function () {
		// switch to square
		this.oh.add(new Square(this.x, this.y, this.r*2, this.a, this.c));

		// remove this from ObjectHandler
		this.oh.remove(this);
	};
}
