function Stats() {
  this.grandTotal = 0;
  this.totalClicks = 0;

  //multipliers
  this.squareMult = 1;
  this.circleMult = 1;

  // current shape to make when clicked
  this.currentShape = "square";

  this.update = function() {
    document.getElementById('grandTotal').innerHTML= this.grandTotal;

    this.squareMult = Math.min(floor(this.grandTotal/20) + 1, 10);
    this.circleMult = Math.min(floor(this.grandTotal/10) + 1, 5);
  }

  this.reset = function() {
    this.grandTotal = 0;
  }

  // should implement as circular linked list later
  this.nextShape = function() {
    if (this.currentShape === "square") this.currentShape = "circle";
    else if (this.currentShape === "circle") this.currentShape = "square";
  }
}
