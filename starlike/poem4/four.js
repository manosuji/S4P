let txtSize = 15;
let words = [];
let lines = [];
let textBlock = `A. 
the phone call is brisk and all-consuming
the doctor is not surprised. 
now I belong to an acronym
it burrows its way into my skin
I feel tricked.
the words sit heavy in my mouth
I try to forget them
but they come back like animals to a watering hole 
returning in bloodied splendor again and again
until the syllables don’t mean anything
until they are gasping for air to scream a new rhythm
B. 
language turns carnal
the words bare their teeth
their teeth
the teeth I created sinking into me
as the tears lie sunkissed on my lips
I pretend not to know which one of us is doing the hunting
I pretend I can kill the words as I say them
instead I am captured by the sigh of meaning
the knobby flesh of adjectives
the crunch of punctuation 
like leaves underfoot
C. 
I feel guilty for remembering the wholeness
memory sucks on the marrow of its own bones
tearing its way through me red plum holy
a barren forest singing of abundance
wanting to believe it is full
but this body is not something I can convince
the bare soil thirsts and searches
stretching static the way its father taught it to
D. 
the wind reconfigures what I thought was mine
I am lighting the flame with my teeth
the trees are just tinder and the leaves are red already
anger forms from air
mouth clambering for pulp
in its song sung to itself
the deer lick the rotten awake
they are restless and needy but I cannot feed them
E. 
I am counting the months on my knuckles
pulse throbbing in throat
like the birds that sing of warmth too tender to kill
I am struggling to fit my mouth around the words
they scramble out before I choke them down
I can’t eat something
so alive.`;

let default_font = "stars";
let mouse_font = "raritas";
let maxLineWidth; // Fixed width for lines
let lineHeight = txtSize * 1.2; // Space between lines
let hoverDuration = 8000; // Time (in milliseconds) to keep font changed

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  button = createButton('✢');
  button.position(width - txtSize * 4, height - txtSize * 4);
  button.size(textWidth('✢') + 40, txtSize*2);
  
  button.style('background-color', 'white');
  button.style('color', '#4A2545');
  button.style('font-size', txtSize * 2 + 'px');
  button.style('border-width', '0px');
  button.mousePressed(() => window.location.href = '/index.html');
  
  
  textSize(txtSize);
  maxLineWidth = width / 2;

  let singleLineText = textBlock.replace(/\n/g, " / "); // Convert multi-line to single line
  wrapText(singleLineText);
}

function draw() {
  background(255);
  fill('#4A2545')
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
