function Vacuum(x = mouseX, y = mouseY, follow = true, r = 100) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.pos = Vector.create(this.x, this.y);

  // will the vacuum keep following the mouse?
  this.follow = follow;

  // to link an ObjectHandler
  this.oh = null;

  // for isDone method
  this.inactive = false;

  // force to apply
  this.f = 0.005;

}

// continuous user event
Vacuum.prototype.applyUserEvent = function() {
  if (this.follow) {
    this.updatePos(mouseX, mouseY);
  }
  // check if oh is linked
  var oh = this.oh;
  if (oh !== null) {
    // check if objects are in range
    var len = oh.objects.length;
    for (var i = 0; i < len; ++i) {
      var o = oh.objects[i];
      if (dist(o.x, o.y, this.x, this.y) < this.r) {
        this.doVacuum(o);
      }
    }
  }
}

Vacuum.prototype.doVacuum = function(o) {

  // want to apply very weak force from shape to cursor
  force = Vector.mult(Vector.create(1,1), this.f);
  Matter.Body.applyForce(o.body, this.pos, force);

}

Vacuum.prototype.updatePos = function(x, y) {
  this.x = x;
  this.y = y;
  this.pos = Vector.create(this.x, this.y);
}

Vacuum.prototype.isDone = function() {
  return this.inactive;
}
