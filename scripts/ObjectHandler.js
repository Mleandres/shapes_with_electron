// Class which handles objects
function ObjectHandler(max, stats) {
	this.max = max;
	this.cur = 0;
	this.objects = [];
	this.stats = stats;
	this.num = 1;

	this.userEvent = null;

	// methods to add and remove objects
	this.add = function(obj) {
		if (this.cur >= max) {
			this.removeOldest();
		}

		obj.oh = this;
		this.objects.push(obj);
		World.add(world, obj.body);

		++this.cur;
		++stats.grandTotal;
	}

	// method that removes the oldest object for when max is reached
	this.removeOldest = function() {
		// also remove from world
		World.remove(world, this.objects[0].body);

		delete this.objects.shift();
		--this.cur;
	}

	// updates physics for all objects in ObjectHandler
	this.update = function() {
		if (this.userEvent !== null) {
			this.applyUserEvent();
			console.log(this.userEvent);
		}
		this.updateObjects();
	}

// removes a certain object from objects by name
	this.remove = function(obj) {
		for (var i = 0; i < this.cur; ++i) {
			var o = this.objects[i];
			if (obj === o) {
				World.remove(world, o.body);
				delete this.objects.splice(i,1);
				--this.cur;
			}
		}
	}

	this.show = function() {
		for (var i = 0; i < this.cur; ++i) {
			this.objects[i].show();
		}
	}

	this.removeAll = function() {
		for (var i = this.cur; i > 0; --i) {
			this.removeOldest();
		}
	}

}

ObjectHandler.prototype.updateObjects = function() {
	for (var i = 0; i < this.cur; ++i) {
		var o = this.objects[i];
		o.update();
		if (o.isGone()) {
			World.remove(world, o.body);
			delete this.objects.splice(i, 1);
			--this.cur;
		}
	}
};

ObjectHandler.prototype.addUserEvent = function(userEvent) {
	this.userEvent = userEvent;
	console.log(userEvent);
	userEvent.oh = this;
};

ObjectHandler.prototype.applyUserEvent = function() {
	if (this.userEvent.isDone()) {
		delete this.userEvent;
		this.userEvent = null;
		mouseBusy = false;

	} else {
		this.userEvent.applyUserEvent();
		mouseBusy = true;
	}
};

ObjectHandler.prototype.endUserEvent = function () {
	delete this.userEvent;
	this.userEvent = null;

	mouseBusy = false;
};
