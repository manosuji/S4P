let txtSize = 15;
let words = [];
let lines = [];
let textBlock = `after every hour
the sun has spoken for us
every shadow that flutters free
from her cupped hand
(dandelion seeds or sand
blown into being)
reflections tinfoil-bright
and blinding 
after all this
still we want sunset to be the unending chain
of taffeta pulled from pockets—
an infinite wonder of cheap magic
watercolor melted popsicle
sticky sweet and humming
still we demand
the glittering tyrant work overtime
we squint glare indignant
when she starts to sink
dishes dirty with our sins
we can’t even look at her
and yet we think the dark robs us
when everything becomes shadow
becomes more of what it is
what if in losing our details
we become pure
expand
in the static hum of anonymity
a cat fox owl type-beat
a shadow-puppet play
put on for free…
let the crickets
write me poetry
while I trip on the curb
I didn’t see
and empty myself into starlight
trash-can collector
and brash slumber-party confessions
singing in the shade of fans whirring
blenders and showers
and lowered car windows
let me show you how it feels to be
swallowed by the earth
and resurrected
and then tell me you don’t
feel like screaming
into every shadow you can carve out
all the real parts of me
were glow-in-the-dark anyway
washed out and rendered useless by the sun
tooth-colored and vaguely glowing
when there is no light to see by
hold them close
cradled in palms
of unheard promises
unwitnessed cries
tears that take their time
throats dry with lost words
and revived desires
while we still have time,
whisper all your truths into the seams of me
fold your secrets into the blushing I can’t see
let me memorize the texture
of your voice 
til the daybreak bathes you, lethe
it will force a forgetfulness
pupils telescoping inward in self-defense
breaths heavy with disbelief
emerging from photobooth
weak-kneed, hand over eyes
shaking off the intimacy all wet dog
and warm relief 
in being recaptured 
by the cowardice
that lives in you like stones 
in a river that runs clear   
lay down to rest
in the sweet shadows
of grass
that is still grass
while the day
paints afresh
her facade`;

let default_font = "stars";
let mouse_font = "raritas";
let maxLineWidth; // Fixed width for lines
let lineHeight = txtSize * 1.2; // Space between lines
let hoverDuration = 8000; // Time (in milliseconds) to keep font changed

function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton("✢");
  button.position(width - txtSize * 4, height - txtSize * 4);
  button.size(textWidth("✢") + 40, txtSize * 2);

  button.style("background-color", "white");
  button.style("color", "#4A2545");
  button.style("font-size", txtSize * 2 + "px");
  button.style("border-width", "0px");
  button.mousePressed(() => (window.location.href = "./index.html"));

  textSize(txtSize);
  maxLineWidth = width / 2;

  let singleLineText = textBlock.replace(/\n/g, " / "); // Convert multi-line to single line
  wrapText(singleLineText);
}

function draw() {
  background(255);
  fill("#4A2545");
  let totalTextHeight = lines.length * lineHeight;
  let yOffset = (height - totalTextHeight) / 2; // Center vertically
  let currentTime = millis();

  for (let i = 0; i < lines.length; i++) {
    let lineWidth = lines[i].reduce(
      (sum, word) => sum + textWidth(word.msg) + txtSize * 0.2,
      0
    );
    let xOffset = (width - lineWidth) / 2; // Center horizontally

    for (let j = 0; j < lines[i].length; j++) {
      let word = lines[i][j];

      let bboxDefault = getBoundBox(word.msg, xOffset, yOffset, default_font);
      let bboxMouse = getBoundBox(word.msg, xOffset, yOffset, mouse_font);
      let maxBBox = getMaxBBox(bboxDefault, bboxMouse);

      if (mouseInRect(maxBBox.x, maxBBox.y, maxBBox.w, maxBBox.h)) {
        word.lastHovered = millis();
      }

      if (word.lastHovered && currentTime - word.lastHovered < hoverDuration) {
        word.font = mouse_font;
      } else {
        word.font = default_font;
      }

      textFont(word.font);
      let bbox = getBoundBox(word.msg, xOffset, yOffset, word.font);
      word.bbox = bbox;

      text(word.msg, xOffset, yOffset);

      xOffset += bbox.w + txtSize * 0.2;
    }

    yOffset += lineHeight;
  }
}

// **Breaks text into multiple lines based on maxLineWidth**
function wrapText(txt) {
  words = [];
  lines = [];
  let rawWords = split(txt, " "); // Split into individual words

  let currentLine = [];
  let currentLineWidth = 0;

  for (let i = 0; i < rawWords.length; i++) {
    textFont(default_font);
    let wordWidth = textWidth(rawWords[i]);

    // If adding this word exceeds max width, start a new line
    if (currentLineWidth + wordWidth > maxLineWidth) {
      lines.push(currentLine);
      currentLine = [];
      currentLineWidth = 0;
    }

    currentLine.push({ msg: rawWords[i], font: default_font, lastHovered: 0 });
    currentLineWidth += wordWidth + txtSize * 0.2; // Add spacing
  }

  // Add last line if any words remain
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
}

// **Check if mouse is inside bounding box**
function mouseInRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

// **Get bounding box for text with given font**
function getBoundBox(txt, x, y, font) {
  textFont(font);
  let w = textWidth(txt);
  let h = txtSize;
  let y_fixed = y - h + txtSize / 10;
  return { x: x, y: y_fixed, w: w, h: h };
}

// **Get the largest bounding box**
function getMaxBBox(bbox1, bbox2) {
  return {
    x: Math.min(bbox1.x, bbox2.x),
    y: Math.min(bbox1.y, bbox2.y),
    w: Math.max(bbox1.w, bbox2.w),
    h: Math.max(bbox1.h, bbox2.h),
  };
}

// **Draw bounding box (for debugging)**
function drawBoundBox(bbox) {
  noFill();
  stroke(255, 0, 0);
  rect(bbox.x, bbox.y, bbox.w, bbox.h);
}
