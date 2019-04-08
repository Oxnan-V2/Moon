/**
 * Oxnan: double pendulum with random colours
 *
 * Equations by Erik Neumann
 * https://www.myphysicslab.com/pendulum/double-pendulum-en.html
 * inspiration
 * https://www.youtube.com/watch?v=uWzPe_S-RVE (Coding Challenge #93: Double Pendulum)
 */
const canvas = 1080;

let r1;
let r2;
let m1;
let m2;
let a1 = 0;
let a2 = 0;
let a1vel = 0;
let a2vel = 0;
const g = 1;

let px2 = 0;
let py2 = 0;
let cx;
let cy;
let buffer;
let colours = [];
const random_bool1 = (Math.random() >= 0.5);
const random_bool2 = (Math.random() >= 0.5);
const random_bool3 = (Math.random() >= 0.5);


// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);

  // Values are slightly random, meaning every viewing is slightly different
  r1 = random(190, 200);
  r2 = random(260, 240);
  m1 = random(18, 26);
  m2 = random(30, 41);

  // Starting angles
  a1 = PI / random();
  a2 = PI / random();

  cx = width / 2;
  cy = height * 0.40;

  colours = [
    color(229, 252, 255, 0.3),
    color(26, 45, 75),

    color(122, 79, 242, 0.7),
    color(230, 9, 116, 0.7),
  ];

  // Create graphic
  buffer = createGraphics(width, height);
  buffer.background(colours[1]);
  buffer.translate(cx, cy);

}

// Draw tick
function draw() {
  background(colours[1]);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // Double pendulum equation
  // Arm one
  const a1acc = -g/r1*sin(a1)
  // Add acceleration
  a1vel += a1acc;
  a1 += a1vel;

  a1vel *= 0.999


  // Calculate pixel positions
  const x1 = r1 * sin(a1);
  const y1 = r1 * cos(a1);
  const x2 = x1 + (r2 * sin(a2));
  const y2 = y1 + (r2 * cos(a2));

  // Draw pendulum.
  translate(cx, cy);
  stroke(colours[0]);
  strokeWeight(1);
  // Arm one
  line(0, 0, x1, y1);
  fill(colours[0]);
  ellipse(x1, y1, (m1 / 2), (m1 / 2));
  if (frameCount > 1) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[2], colours[3], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px1, py1, x1, y1);
  }
  // Set previous position (used above for line)
  py1 = y1;
  px1 = x1;
}
