let txtSize = 15;
let words = [];
let lines = [];
let textBlock = `I saw you
stranger across the parking lot of the grocery store
three-dollar soda in hand, 
laughing to yourself, 
the edges of it fraying like something well worn
I saw you from a distance
your features blotted out by the sun
the asphalt reflecting imagined tomorrows 
into the edges of you
you throw me a glance and suddenly 
here comes "love" at its most uncomplicated
reactions start happening in my stomach
I’m all put together out of order
a flustered sort of fluctuating
pop caps and pull tabs
the hiss of candid carbonation
this is all so laughably easy at a distance
the plot line fleshed out in so few seconds 
I’m no longer hungry
love is always a house
but I’m airbnb-bumping my way 
through door frames
stumbling on steps I do not see
the stairs always squeak 
and the new york times 
sends me 36 more questions 
than I’m willing to ask
the distance is comfortable
there's a certain kind of 
desire that comes with 
not knowing its object
chest crushed in pepsi pop cola can
trying to swig, swallow a two-liter of belief 
til my stomach hurts from 
chasing sensations that don’t belong to me
strung-out daydreams that fall out of place 
as soon as I set them down
fantasies reused until they 
form hands to hold in mine
I slip into sheets soft with the idea of you
listening to the chorus of empty breathing
it’ll all fade away much too soon
my heart feels like gum stretched thin 
between callused fingers
pulled taut so the light hits
there’s something in me that deems 
the unknown and the unknowable 
holy
that only understands a love 
sustained by discovery
I am scared of the knowing
of being split in two
wishbone and uncertainty
the marrow of me
the gushing out of 
things I thought were mine
what happens if I am known 
and discarded like 
rotting fruit deemed unripe
when the time falls on uneven tunes
baptism turns shower
this is easier when I don't have 
to get close to you
when our hands are not the same temperature
when the pot says to the potter: 
you know nothing!
so I’ve closed all the windows
the shutters have slumped their shoulders 
in white-flag despondency
the wind looks like it's had too much to drink
like it’s past tense becoming a future
and I hate the taste of my own mouth
I want to force-quit this one-act play
to stop playing chess with God
collapse with meaning into 
a splendid resurrection of 
all I have ever thought of wanting
glances catching 
across the field, 
on the other side of the escalator, 
crossing the street
I want to know your name. 
to see you 
and say: 
hello`;

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
  button.mousePressed(() => window.location.href = '../index.html');
  
  
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
