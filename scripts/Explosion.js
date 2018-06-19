// Explosion IS A userEvent
function Explosion(x = mouseX, y = mouseY, r = 100) {
  this.x = x;
  this.y = y;
  this.pos = Matter.Vector.create(this.x, this.y);

  this.oh = null;

  this.type = "explosion";

  this.inactive = false;

  this.r = r; // radius of objects to affect with explosion
  this.f = 0.15; // force of explosion
}

Explosion.prototype.applyUserEvent = function() {
  var oh = this.oh;

  // make sure an object handler exists first
  if (oh !== null) {

    // check if objects are in range
    var len = oh.objects.length;
    for (var i = 0; i < len; ++i) {
      var o = oh.objects[i];
      if (dist(o.x, o.y, this.x, this.y) < this.r) {
        this.doExplode(o);
      }
    }
  }
};

Explosion.prototype.doExplode = function(o) {
  var d = dist(o.x, o.y, this.x, this.y);
  var x = o.x - this.x;
  var y = o.y - this.y;
  var dir = Matter.Vector.create(x, y);
  var unitDir = Matter.Vector.div(dir, d);

  var force = Matter.Vector.mult(unitDir,this.f);

  Matter.Body.applyForce(o.body, this.pos, force);

  this.inactive = true;
};

Explosion.prototype.isDone = function() {
  return this.inactive;
}
