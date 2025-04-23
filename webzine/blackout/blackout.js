let txtSize = 15;
let words = [];
let lines = [];
let textBlock = `when the shore asks after me
tell her I have arrived (in a place)
where heav’n makes no retractions
it happens quickly
the mountains in all their buried hopes
yield to trees crushed autumn
in the liquid murmur of night
here, woven bluebells clasp hands
with prairie grass wild and ravenous
the fields giddy 
with the lush quiet of secret
I, like a bird all out of flight
spiral down into the tone
hushed anew and feathered, plummeting, 
my hum fades from your lips
you didn’t promise me anything
just brown eyes breaching salt
wick’d soft and yet to be lit
the taste of fate in my mouth
	there and then gone
again 
the earth is singing into the night
    that punishes like plastic kings
the gauzy landscape 
    sifts through filtered wine
shards of waning amber
pooling melody and reverence
time ribbons, enchants
affrighted by the tender sigh of things
bedded by the whims of memory
when the flashes of 
    reddened flesh come
they will bear witness to a steadying
a breath of varying scope
tethering me to the wind 
    in all its chiming glory
my ear held to the grass
listening to every living thing
holding their song in my head 
while singing another
the wind gasps
anointing me with breath
my every inhale a hymn
metered steps declare 
    something triumphant
amongst the gathering frost
these hands wrought miracle
glass pulse all the same
my fingers pry open moon
and arrive at that which I cannot say
even now, I won’t taint this ground
	with mention of ghosts
I will say my own name
whisper it into the undergrowth
cup this flame against
the star rended sky
pin pricked and feral
and confound it all to grace
a moment burned quicker than the fraying leaves
count it gone
call it the overturn of the dirt
let the life bleed
from one to another
without tying it down
let the well fill with fire`;

let default_font = "stars";
let mouse_font = "raritas";
let maxLineWidth; // Fixed width for lines
let lineHeight = txtSize * 1.2; // Space between lines
let hoverDuration = 8000; // Time (in milliseconds) to keep font changed

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  textSize(txtSize);
  maxLineWidth = width / 2;

  let singleLineText = textBlock.replace(/\n/g, " / "); // Convert multi-line to single line
  wrapText(singleLineText);
}

function draw() {
  background(255);
  fill('#000000')
  let totalTextHeight = lines.length * lineHeight;
  let yOffset = (height - totalTextHeight) / 2; // Center vertically
  let currentTime = millis();

  for (let i = 0; i < lines.length; i++) {
    let lineWidth = lines[i].reduce((sum, word) => sum + textWidth(word.msg) + txtSize * 0.2, 0);
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
    h: Math.max(bbox1.h, bbox2.h)
  };
}

// **Draw bounding box (for debugging)**
function drawBoundBox(bbox) {
  noFill();
  stroke(255, 0, 0);
  rect(bbox.x, bbox.y, bbox.w, bbox.h);
}
