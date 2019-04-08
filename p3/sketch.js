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
let r3;
let m1;
let m2;
let m3;
let a1 = 0;
let a2 = 0;
let a3 = 0;
let a1vel = 0;
let a2vel = 0;
let a3vel = 0;
const g = 1;

let px2 = 0;
let py2 = 0;
let px3 = 0;
let py3 = 0;
let cx;
let cy;
let buffer;
let colours = [];
const random_bool1 = (Math.random() >= 0.5);
const random_bool2 = (Math.random() >= 0.5);

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);

  // Values are slightly random, meaning every viewing is slightly different
  r1 = random(canvas/8, canvas/6);
  r2 = random(canvas/8, canvas/6);
  r3 = random(canvas/8, canvas/6);
  m1 = random(18, 26);
  m2 = random(18, 26);
  m3 = random(18, 26);

  // Starting angles
  a1 = PI / random();
  a2 = PI / random();
  a3 = PI / random();
  cx = width / 2;
  cy = height * 0.3;

  colours = [
    color(229, 252, 255, 0.3),
    color(26, 45, 80),
    color(122, 79, 242, 0.7),
    color(230, 9, 116, 0.7),
    color(74, 247, 144, 0.7),
    color(245, 0, 0, 0.7),
    color(250, 250, 0, 0.7),
    color(245, 38, 0, 0.7),
    color(0, 250, 239, 0.7),
    color(245, 0, 233, 0.7)
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
function F1(t1, dt1, t2, dt2, t3, dt3, g, l1, l2, l3, m1, m2, m3, k1, k2, k3) {
 var result;

 result = -(2 * g * m2 * m2 * Math.sin(t1) + 2 * g * m2 * m2 * Math.sin(t1 - 2 * t2) + 4 * dt1 * k1 * l1 * m2 + 2 * dt1 * k1 * l1 * m3 + 2 * dt1 * k2 * l1 * m2 + dt1 * k2 * l1 * m3 + dt1 * k3 * l1 * m2 + 4 * dt2 * dt2 * l2 * m2 * m2 * Math.sin(t1 - t2) + 4 * g * m1 * m2 * Math.sin(t1) + 2 * g * m1 * m3 * Math.sin(t1) + 2 * g * m2 * m3 * Math.sin(t1) - g * m1 * m3 * Math.sin(t1 - 2 * t2 + 2 * t3) - g * m1 * m3 * Math.sin(t1 + 2 * t2 - 2 * t3) + 2 * g * m2 * m3 * Math.sin(t1 - 2 * t2) +
  2 * dt1 * dt1 * l1 * m2 * m2 * Math.sin(2 * t1 - 2 * t2) - 2 * dt1 * k2 * l1 * m2 * Math.cos(2 * t1 - 2 * t2) - dt1 * k2 * l1 * m3 * Math.cos(2 * t1 - 2 * t2) - dt1 * k3 * l1 * m2 * Math.cos(2 * t1 - 2 * t2) - 2 * dt1 * k1 * l1 * m3 * Math.cos(2 * t2 - 2 * t3) + dt1 * k2 * l1 * m3 * Math.cos(2 * t1 - 2 * t3) - dt1 * k3 * l1 * m2 * Math.cos(2 * t1 - 2 * t3) - dt1 * k2 * l1 * m3 * Math.cos(2 * t2 - 2 * t3) + dt1 * k3 * l1 * m2 * Math.cos(2 * t2 - 2 * t3) +
  4 * dt2 * dt2 * l2 * m2 * m3 * Math.sin(t1 - t2) + 2 * dt3 * dt3 * l3 * m2 * m3 * Math.sin(t1 - t3) + dt2 * k2 * l2 * m3 * Math.cos(t1 + t2 - 2 * t3) - dt2 * k3 * l2 * m2 * Math.cos(t1 + t2 - 2 * t3) +
  2 * dt1 * dt1 * l1 * m2 * m3 * Math.sin(2 * t1 - 2 * t2) - dt2 * k2 * l2 * m3 * Math.cos(t1 - 3 * t2 + 2 * t3) + dt2 * k3 * l2 * m2 * Math.cos(t1 - 3 * t2 + 2 * t3) + 2 * dt3 * dt3 * l3 * m2 * m3 * Math.sin(t1 - 2 * t2 + t3)) / (l1 * (4 * m1 * m2 + 2 * m1 * m3 + 2 * m2 * m3 - 2 * m2 * m2 * Math.cos(2 * t1 - 2 * t2) + 2 * m2 * m2 - 2 * m2 * m3 * Math.cos(2 * t1 - 2 * t2) - 2 * m1 * m3 * Math.cos(2 * t2 - 2 * t3)));

 return result;
}

function F2(t1, dt1, t2, dt2, t3, dt3, g, l1, l2, l3, m1, m2, m3, k1, k2, k3) {
 var result;

 result = (2 * g * m2 * m2 * Math.sin(2 * t1 - t2) - 2 * g * m2 * m2 * Math.sin(t2) - 4 * dt2 * k2 * l2 * m1 - 2 * dt2 * k2 * l2 * m2 - 2 * dt2 * k3 * l2 * m1 - dt2 * k2 * l2 * m3 - dt2 * k3 * l2 * m2 + 2 * g * m1 * m2 * Math.sin(2 * t1 - t2) +
  g * m1 * m3 * Math.sin(2 * t1 - t2) + 2 * g * m2 * m3 * Math.sin(2 * t1 - t2) + 4 * dt1 * dt1 * l1 * m2 * m2 * Math.sin(t1 - t2) - 2 * g * m1 * m2 * Math.sin(t2) - g * m1 * m3 * Math.sin(t2) - 2 * g * m2 * m3 * Math.sin(t2) -
  g * m1 * m3 * Math.sin(2 * t1 + t2 - 2 * t3) - g * m1 * m3 * Math.sin(t2 - 2 * t3) + 2 * dt2 * dt2 * l2 * m2 * m2 * Math.sin(2 * t1 - 2 * t2) + 4 * dt1 * k1 * l1 * m2 * Math.cos(t1 - t2) - 4 * dt1 * k2 * l1 * m1 * Math.cos(t1 - t2) +
  2 * dt1 * k1 * l1 * m3 * Math.cos(t1 - t2) - 2 * dt1 * k3 * l1 * m1 * Math.cos(t1 - t2) + 2 * dt2 * k2 * l2 * m2 * Math.cos(2 * t1 - 2 * t2) + dt2 * k2 * l2 * m3 * Math.cos(2 * t1 - 2 * t2) + dt2 * k3 * l2 * m2 * Math.cos(2 * t1 - 2 * t2) +
  dt2 * k2 * l2 * m3 * Math.cos(2 * t1 - 2 * t3) + 2 * dt2 * k3 * l2 * m1 * Math.cos(2 * t2 - 2 * t3) - dt2 * k3 * l2 * m2 * Math.cos(2 * t1 - 2 * t3) - dt2 * k2 * l2 * m3 * Math.cos(2 * t2 - 2 * t3) + dt2 * k3 * l2 * m2 * Math.cos(2 * t2 - 2 * t3) + 4 * dt1 * dt1 * l1 * m1 * m2 * Math.sin(t1 - t2) + 2 * dt1 * dt1 * l1 * m1 * m3 * Math.sin(t1 - t2) + 4 * dt1 * dt1 * l1 * m2 * m3 * Math.sin(t1 - t2) - 4 * dt3 * dt3 * l3 * m1 * m3 * Math.sin(t2 - t3) -
  2 * dt3 * dt3 * l3 * m2 * m3 * Math.sin(t2 - t3) - 2 * dt1 * k1 * l1 * m3 * Math.cos(t1 + t2 - 2 * t3) + 2 * dt1 * k3 * l1 * m1 * Math.cos(t1 + t2 - 2 * t3) - dt1 * k2 * l1 * m3 * Math.cos(t1 + t2 - 2 * t3) +
  dt1 * k3 * l1 * m2 * Math.cos(t1 + t2 - 2 * t3) + 2 * dt3 * dt3 * l3 * m2 * m3 * Math.sin(2 * t1 - t2 - t3) + 2 * dt2 * dt2 * l2 * m2 * m3 * Math.sin(2 * t1 - 2 * t2) - 2 * dt2 * dt2 * l2 * m1 * m3 * Math.sin(2 * t2 - 2 * t3) +
  dt1 * k2 * l1 * m3 * Math.cos(t2 - 3 * t1 + 2 * t3) - dt1 * k3 * l1 * m2 * Math.cos(t2 - 3 * t1 + 2 * t3) - 2 * dt1 * dt1 * l1 * m1 * m3 * Math.sin(t1 + t2 - 2 * t3)) / (2 * l2 * (2 * m1 * m2 + m1 * m3 + m2 * m3 - m2 * m2 * Math.cos(2 * t1 -
  2 * t2) + m2 * m2 - m2 * m3 * Math.cos(2 * t1 - 2 * t2) - m1 * m3 * Math.cos(2 * t2 - 2 * t3)));

 return result;
}

function F3(t1, dt1, t2, dt2, t3, dt3, g, l1, l2, l3, m1, m2, m3, k1, k2, k3) {
 var result;

 result = (g * m1 * m3 * m3 * Math.sin(2 * t1 - t3) - 2 * dt3 * k3 * l3 * m2 * m2 + g * m1 * m3 * m3 * Math.sin(2 * t2 - t3) - g * m1 * m3 * m3 * Math.sin(t3) - g * m1 * m3 * m3 * Math.sin(2 * t1 - 2 * t2 + t3) +
  2 * dt3 * dt3 * l3 * m1 * m3 * m3 * Math.sin(2 * t2 - 2 * t3) - dt2 * k2 * l2 * m3 * m3 * Math.cos(2 * t1 - 3 * t2 + t3) + dt2 * k3 * l2 * m2 * m2 * Math.cos(2 * t1 - 3 * t2 + t3) - 2 * dt1 * dt1 * l1 * m1 * m3 * m3 * Math.sin(t1 - 2 * t2 + t3) +
  2 * dt1 * k1 * l1 * m3 * m3 * Math.cos(t1 - t3) + 2 * dt1 * k2 * l1 * m3 * m3 * Math.cos(t1 - t3) - 2 * dt1 * k3 * l1 * m2 * m2 * Math.cos(t1 - t3) + 2 * dt2 * k2 * l2 * m3 * m3 * Math.cos(t2 - t3) - 2 * dt2 * k3 * l2 * m2 * m2 * Math.cos(t2 -
   t3) - 4 * dt3 * k3 * l3 * m1 * m2 - 2 * dt3 * k3 * l3 * m1 * m3 - 2 * dt3 * k3 * l3 * m2 * m3 + g * m1 * m2 * m3 * Math.sin(2 * t1 - t3) + g * m1 * m2 * m3 * Math.sin(2 * t2 - t3) - dt1 * k2 * l1 * m3 * m3 * Math.cos(3 * t1 - 2 * t2 - t3) +
  dt1 * k3 * l1 * m2 * m2 * Math.cos(3 * t1 - 2 * t2 - t3) - dt2 * k2 * l2 * m3 * m3 * Math.cos(2 * t1 - t2 - t3) + dt2 * k3 * l2 * m2 * m2 * Math.cos(2 * t1 - t2 - t3) + 2 * dt3 * k3 * l3 * m2 * m2 * Math.cos(2 * t1 - 2 * t2) +
  2 * dt1 * dt1 * l1 * m1 * m3 * m3 * Math.sin(t1 - t3) + 4 * dt2 * dt2 * l2 * m1 * m3 * m3 * Math.sin(t2 - t3) - 2 * dt1 * k1 * l1 * m3 * m3 * Math.cos(t1 - 2 * t2 + t3) - dt1 * k2 * l1 * m3 * m3 * Math.cos(t1 - 2 * t2 + t3) +
  dt1 * k3 * l1 * m2 * m2 * Math.cos(t1 - 2 * t2 + t3) - g * m1 * m2 * m3 * Math.sin(t3) - g * m1 * m2 * m3 * Math.sin(2 * t1 - 2 * t2 + t3) - dt2 * k2 * l2 * m2 * m3 * Math.cos(2 * t1 - 3 * t2 + t3) + dt2 * k3 * l2 * m2 * m3 * Math.cos(2 * t1 - 3 * t2 + t3) - 2 * dt1 * dt1 * l1 * m1 * m2 * m3 * Math.sin(t1 - 2 * t2 + t3) + 2 * dt1 * k1 * l1 * m2 * m3 * Math.cos(t1 - t3) + 2 * dt1 * k2 * l1 * m1 * m3 * Math.cos(t1 - t3) - 4 * dt1 * k3 * l1 * m1 * m2 * Math.cos(t1 - t3) +
  2 * dt1 * k2 * l1 * m2 * m3 * Math.cos(t1 - t3) - 2 * dt1 * k3 * l1 * m1 * m3 * Math.cos(t1 - t3) - 2 * dt1 * k3 * l1 * m2 * m3 * Math.cos(t1 - t3) + 4 * dt2 * k2 * l2 * m1 * m3 * Math.cos(t2 - t3) - 4 * dt2 * k3 * l2 * m1 * m2 * Math.cos(t2 -
   t3) + 2 * dt2 * k2 * l2 * m2 * m3 * Math.cos(t2 - t3) - 2 * dt2 * k3 * l2 * m2 * m3 * Math.cos(t2 - t3) - dt1 * k2 * l1 * m2 * m3 * Math.cos(3 * t1 - 2 * t2 - t3) - dt2 * k2 * l2 * m2 * m3 * Math.cos(2 * t1 - t2 - t3) +
  dt1 * k3 * l1 * m2 * m3 * Math.cos(3 * t1 - 2 * t2 - t3) + dt2 * k3 * l2 * m2 * m3 * Math.cos(2 * t1 - t2 - t3) + 2 * dt3 * k3 * l3 * m2 * m3 * Math.cos(2 * t1 - 2 * t2) + 2 * dt3 * k3 * l3 * m1 * m3 * Math.cos(2 * t2 - 2 * t3) +
  2 * dt1 * dt1 * l1 * m1 * m2 * m3 * Math.sin(t1 - t3) + 4 * dt2 * dt2 * l2 * m1 * m2 * m3 * Math.sin(t2 - t3) - 2 * dt1 * k1 * l1 * m2 * m3 * Math.cos(t1 - 2 * t2 + t3) + 2 * dt1 * k2 * l1 * m1 * m3 * Math.cos(t1 - 2 * t2 + t3) -
  dt1 * k2 * l1 * m2 * m3 * Math.cos(t1 - 2 * t2 + t3) + 2 * dt1 * k3 * l1 * m1 * m3 * Math.cos(t1 - 2 * t2 + t3) + dt1 * k3 * l1 * m2 * m3 * Math.cos(t1 - 2 * t2 + t3)) / (2 * l3 * m3 * (2 * m1 * m2 + m1 * m3 + m2 * m3 - m2 *
  m2 * Math.cos(2 * t1 - 2 * t2) + m2 * m2 - m2 * m3 * Math.cos(2 * t1 - 2 * t2) - m1 * m3 * Math.cos(2 * t2 - 2 * t3)));
 return result;
}
  // Double pendulum equation
  // Arm one

  const a1acc = F1(a1,a1vel,a2,a2vel,a3,a3vel,g,r1,r2,r3,m1,m2,m3,0,0,0);
  // Arm two
  const a2acc = F2(a1,a1vel,a2,a2vel,a3,a3vel,g,r1,r2,r3,m1,m2,m3,0,0,0);
  const a3acc = F3(a1,a1vel,a2,a2vel,a3,a3vel,g,r1,r2,r3,m1,m2,m3,0,0,0);
  // Add acceleration
  a1vel += a1acc;
  a2vel += a2acc;
  a3vel += a3acc;
  a1 += a1vel;
  a2 += a2vel;
  a3 += a3vel;
  // Calculate pixel positions
  const x1 = r1 * sin(a1);
  const y1 = r1 * cos(a1);
  const x2 = x1 + (r2 * sin(a2));
  const y2 = y1 + (r2 * cos(a2));
  const x3 = x2 + (r3 * sin(a3));
  const y3 = y2 + (r3 * cos(a3));
  // Draw pendulum.
  translate(cx, cy);
  stroke(colours[0]);
  strokeWeight(1);
  // Arm one
  line(0, 0, x1, y1);
  fill(colours[0]);
  ellipse(x1, y1, (m1 / 2), (m1 / 2));
  // Arm two
  line(x1, y1, x2, y2);
  fill(colours[0]);
  ellipse(x2, y2, (m2 / 2), (m2 / 2));
  line(x2, y2, x3, y3);
  fill(colours[0]);
  ellipse(x3, y3, (m3 / 2), (m3 / 2));
  // Draw trail
  if (frameCount > 1 && random_bool1 && !random_bool2) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[2], colours[3], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
    buffer.line(px3, py3, x3, y3);
  }

  if (frameCount > 1 && !random_bool1 && random_bool2) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[4], colours[5], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
    buffer.line(px3, py3, x3, y3);

  }

  if (frameCount > 1 && random_bool1 && random_bool2) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[6], colours[7], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
    buffer.line(px3, py3, x3, y3);


  }

  if (frameCount > 1 && !random_bool1 && !random_bool2) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[8], colours[9], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
    buffer.line(px3, py3, x3, y3);
  }
  // Set previous position (used above for line)
  py2 = y2;
  px2 = x2;
  py1 = y1;
  px1 = x1;
  py3 = y3;
  px3 = x3;
}
