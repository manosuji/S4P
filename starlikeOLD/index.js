let button;
let txtSize = 15;
let margin = 50;
let buttonWidth;
let buttonHeight;

let minX;
let maxX;
let minY;
let maxY;

let X1;
let Y1;
let X2;
let Y2;
let X3;
let Y3;
let X4;
let Y4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonWidth = textWidth("O") + 40;
  buttonHeight = txtSize * 4;

  minX = margin;
  maxX = windowWidth - margin - buttonWidth;
  minY = margin;
  maxY = windowHeight - margin - buttonHeight;

  X1 = random(minX, maxX);
  Y1 = random(minY, maxY);

  X2 = random(minX, maxX);
  Y2 = random(minY, maxY);

  X3 = random(minX, maxX);
  Y3 = random(minY, maxY);

  X4 = random(minX, maxX);
  Y4 = random(minY, maxY);

  X5 = random(minX, maxX);
  Y5 = random(minY, maxY);
}

function draw() {
  
  background(255);
  // button to poem 1 (us, nocturnal)
  button = createButton("➊✷");
  button.position(X1, Y1);
  button.size(textWidth("➊✷") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "50px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "poem1/one.html"));
  
    // button to poem 2 (soda pop)
  button = createButton("➋❋");
  button.position(X2, Y2);
  button.size(textWidth("➋❋") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "50px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "poem2/two.html"));

  // button to poem 3 (dad memory poem)
  button = createButton("➌✦");
  button.position(X3, Y3);
  button.size(textWidth("➌✦") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "50px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "poem3/three.html"));

  // button to poem 4 (alphabet soup)
  button = createButton("➍✺");
  button.position(X4, Y4);
  button.size(textWidth("➍✺") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "50px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "poem4/four.html"));

  // button to poem 5 (breath and light)
  button = createButton("➎❇");
  button.position(X5, Y5);
  button.size(textWidth("➎❇") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "50px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "poem5/five.html"));
  
  // about button
  button = createButton("❤︎");
  button.position(width - txtSize * 4, height - txtSize * 4);
  button.size(textWidth("❤︎") + 40, txtSize * 4);
  button.style("background-color", "rgba(0, 0, 0, 0)");
  button.style("color", "#4A2545");
  button.style("font-size", "30px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "about/about.html"));
}

//C64191 pink
//809BCE light blue
//38369A electric blue
//598B2C green
//201A23 raisin black
