function Ground() {
	this.x = width/2;
	this.y = height;
	this.h = 80
	this.w = width + 40;

	this.type = "ground";

	this.c = color(73,56,41);

	this.over = false;

	var options = {
		isStatic: true
	};

	this.body = new Bodies.rectangle(this.x,this.y,this.w,this.h, options);

	// add to world on creation
	World.add(world, this.body);

	this.show = function () {
		Render.draw(this);
	}

	this.isOn = function(x1,y1) {
		var leftBound = this.x - floor(this.w/2);
		var rightBound = this.x + floor(this.w/2);
		var upperBound = this.y - floor(this.h/2);
		var lowerBound = this.y + floor(this.h/2);

		if (x1 > leftBound && x1 < rightBound && y1 > upperBound && y1 < lowerBound) {
			this.over = true;
		} else {
			this.over = false
		}
		return this.over;
	}
}
