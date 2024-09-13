// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js
// require https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js
const pane = new Tweakpane.Pane();

const params = {
  Size: 5.2,
  EllipseWidth: 7.33,
  EllipseHeight: 6.26,
  GlitchFactor: 25,
};
// const params = {
//   Size: 7,
//   EllipseWidth: 7.33,
//   EllipseHeight: 6.26,
//   GlitchFactor: 25,
// };

pane.addInput(params, "Size", { min: 3, max: 20 });
pane.addInput(params, "EllipseWidth", { min: 2, max: 100 });
pane.addInput(params, "EllipseHeight", { min: 2, max: 100 });
pane.addInput(params, "GlitchFactor", { min: 1, max: 100 });


let importedImg;
let factor;
function preload() {

  //UPLOAD IMAGE and REPLACE HERE
  importedImg = loadImage("assets/FAIR_TEXT.png");
}

function setup() {
  createCanvas(importedImg.width, importedImg.height);
  noStroke();
  //frameRate(8);//noLoop();
}

function draw() {
  background("white");
  //background("black");
  pixelShift();
  
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
