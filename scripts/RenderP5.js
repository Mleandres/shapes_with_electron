// P5 Rendered


function RenderP5() {
  this.canvas = createCanvas(700, 700);
}

RenderP5.prototype.draw = function(obj) {
  switch (obj.type) {
    // SQUARE
    case "square":
      push();
      strokeWeight(2);
      stroke(255);
      fill(obj.c);
      rectMode(CENTER);
      translate(obj.x, obj.y);
      rotate(obj.a);
      rect(0, 0, obj.l, obj.l);
      if (obj.over) {
        fill('rgba(255,255,255,0.5)');
        rect(0, 0, obj.l, obj.l);
      }
      pop();
      break;

    // CIRCLE
    case "circle":

    // shadow
      var c = color(0,0,0,0.5);

    // shape
      push();
  		strokeWeight(2);
      stroke(255);
  		fill(obj.c);
  		translate(obj.x, obj.y);
  		rotate(obj.a);
  		ellipse(0, 0, obj.r*2, obj.r*2);
  		if (obj.over) {
  			fill('rgba(255,255,255,0.5)');
  			ellipse(0, 0, obj.r*2, obj.r*2);
  		}
  		pop();
      break;


    // GROUND
    case "ground":
      push();
      noStroke();
      fill(obj.c);
      translate(obj.x, obj.y);
      rectMode(CENTER);
      rect(0,0,obj.w,obj.h + 15); // make ground render a bit taller for 3d effect
      if (obj.over) {
        fill('rgba(255,255,255,0.25)');
        rect(0,0,obj.w,obj.h);
      }
      pop();
      break;

    default:
      return;
  }

};
