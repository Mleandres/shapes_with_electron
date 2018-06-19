# Shapes (electron version)

### Summary

This is a simple js app based on clicker games that produces randomly coloured squares and circles with physics on mouse click. 
The app uses electron to run as a desktop app.
I use the matter.js library for physics simulation and p5.js for rendering.

This was my first JS project after coming from a C++ background so my JS style is not the best.

### Installation

Install required node modules using:
```
npm install --save
```

Then run using:
```
npm start
```

The p5.min.js and matter.min.js libs are included in the repo.

### Instructions

Clicking on the screen causes shapes to appear near the cursor. Every click alternates between creating squares and circles.
The total number of shapes created increases the score. As the score increases, more shapes are created with each click. 
The max per click is 10 for squares and 5 for circles.

Clicking on a shape directly will swap it between a square or circle.
Ctrl + click will cause an invisible "explosion" which will push away nearby shapes.
Shift + click and drag will create an invisible "vacuum" on the cursor location **(this is currently not working as intended)**.

Pressing spacebar removes all shapes from the screen. You score should not reset.
Pressing the 'R' key removes all shapes and resets your score (and thus your shapes per click).

### Possible Improvements

- Clean up style of code using more object passing for better functionality between objects
- Fix the "Vacuum" functionality
- Don't use electron
- Use Vue.js components for better organization of page elements
- Get rid of p5.js and use matter.js for simpler rendering
- Better use of OOP with inheritance and less coupling
- Add other pages as part of the game (such as a store to buy more shapes based on points)
   - Game info saved to root Vue components. Use Vue routing and basic animations to swap between different screens.
- Implement 3D rendering (using WEBGL (requires keeping p5.js))
   - Render 3D and 2D simulaneously (can just toggle display), allow user to switch between with no delay
- "Unfolding" game functionality