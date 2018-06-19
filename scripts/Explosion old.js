function Explosion(x, y, maxRadius = 100) {
  this.x = x;
  this.y = y;
  this.maxRadius = maxRadius;

  this.type = "explosion";

  this.lifetime = 10; // 10 frames

  // use lifetime to determine change of radius each frame
  this.dr = maxRadius/10;
  this.r = this.dr;

  this.oh = null;

  this.options  = {
    isStatic: true
  };

  this.body = new Bodies.circle(this.x, this.y, this.r, this.options);

}

Explosion.prototype.isOn = function() {
  return false;
};

Explosion.prototype.show = function () {
  return;
};

Explosion.prototype.update = function() {
  this.r += this.dr; // make radius bigger to push objects away
  if (this.age%2 === 0) {

    // remove smaller body then add bigger body;

    World.remove(world, this.body);
    this.body = new Bodies.circle(this.x, this.y, this.r, this.options);
  }

  ++this.age;
};

Explosion.prototype.isDead = function() {
  return (this.r >= this.maxRadius);
};

Explosion.prototype.isGone = function() {
  console.log(this.r >= this.maxRadius);
  return (this.r >= this.maxRadius);
};
