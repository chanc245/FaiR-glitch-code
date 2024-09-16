// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js
// require https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js

const params = {
  Size: 9,
  EllipseWidth: 10,
  EllipseHeight: 10,
  GlitchFactor: 25,
  // GlitchFactor: 1, //text "AI" location debug
};
// const params = {
//   Size: 7,
//   EllipseWidth: 7.33,
//   EllipseHeight: 6.26,
//   GlitchFactor: 25,
// };

function showTweak() {
  const pane = new Tweakpane.Pane();
  pane.addInput(params, "Size", { min: 3, max: 20 });
  pane.addInput(params, "EllipseWidth", { min: 2, max: 100 });
  pane.addInput(params, "EllipseHeight", { min: 2, max: 100 });
  pane.addInput(params, "GlitchFactor", { min: 1, max: 100 });
}
// showTweak() //for Live chaning the glitch effect

let importedImg;
let factor;

function preload() {
  //UPLOAD IMAGE and REPLACE HERE
  // importedImg = loadImage("assets/FAIR_TEXT.png"); //LOGO
  importedImg = loadImage("assets/other/pre_glich_Insta_post_1.png"); //other image (dont forget to create "other" within the assets folder)
  myFont = loadFont("assets/fonts/Merriweather-Italic.ttf");
}

function setup() {
  createCanvas(importedImg.width, importedImg.height);
  noStroke();
  // frameRate(8);
  // noLoop();
}

function draw() {
  // background("white");
  clear();
  //  background("black");
  pixelShift();
  // addText(); // LOGO Adding "AI" text, 
  
}

function addText() {
  let letterSpacing = 1; 
  let upLift = 35
  let pushLeft = 100

  fill('#363636');
  textFont(myFont); 
  textSize(importedImg.height + 50); 
  textStyle(ITALIC); 
  textAlign(CENTER, CENTER); 

  let x = width / 2 - pushLeft - letterSpacing / 2 ; 
  text("A", x, height / 2 - upLift); 
  x += textWidth("A") + letterSpacing - 40; 
  text("I", x, height / 2 - upLift);  
}

function pixelShift() {
  factor = params.Size;
  //image(importedImg, 0, 0);
  let glitchFactor = params.GlitchFactor;
  importedImg.loadPixels();

  for (let y = 0; y < importedImg.height; y += factor) {
    for (let x = 0; x < importedImg.width; x += factor) {
      const this_color = importedImg.get(x, y);
      fill(this_color);
      let N = noise(x*0.04, frameCount*0.05)*glitchFactor*2 - glitchFactor; 
      rect(x, y+N, params.EllipseWidth, params.EllipseHeight, 0);

    }
  }
  // for (let i =0; i<500; i++) {
  //   fill(`rgba(0,0,0,${random(0, 1)})`); noStroke();
  //   rect(random(0, width), random(0, height), params.EllipseWidth, params.EllipseHeight);
  //   // fill(`rgba(1,1,1,${random(0, 1)})`); noStroke();
  //   // rect(random(0, width), random(0, height), params.EllipseWidth, params.EllipseHeight);
  // }
  //filter(BLUR, 3);
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let size = params.Size.toFixed(2);
    let ellipseWidth = params.EllipseWidth.toFixed(2);
    let ellipseHeight = params.EllipseHeight.toFixed(2);
    let glitchFactor = params.GlitchFactor.toFixed(2);

    let filename = `myCanvas_S${size}_EW${ellipseWidth}_EH${ellipseHeight}_GF${glitchFactor}`;
    filename = filename.replace(/\./g, 'o');

    saveCanvas(filename, 'png');
  }
}
