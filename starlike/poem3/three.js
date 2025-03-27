let txtSize = 15;
let words = [];
let lines = [];
let textBlock = `at rest, I embody my father
with every waking thought I become him
1990-something
a man is in a country not his own 
and not this one
it all starts with a song
no, a poster taped to a lamppost 
that night his friend convinces him to go out dancing
in the fluttering snap of skirts and breath 
he catches sight of the only woman in the room I recognize
they dance, jazz 
spectral and mouth and
the drums remind him of the village
thousands of miles away
mosquito-swarmed and wilting in the heat
where he taught himself to drive 
to laugh by the bucketful
to leave things behind
but outside the bar,
in this town where everyone looks at him stranger
the street signs are tinged mythic
the night is milky with promise
finally the music fades but he will come by this again
in 10 years, in another city
where the slack-jawed houses stand
with tinny hallways and dripping taps
the empty gained flesh
he will sit against the drywall there
remember rough tree bark against his back 
handmade kites flying above him
swirling in the gust of elsewhere
how does he stay intact through it all?
how can he? splintering through time
I hold the swarm of him to my chest
assemble this instinctive memory
his life is not mine and yet
my grip slips on now
no longer here but
in the bar, dancing with my mother
or the village I have never stepped foot in
I blink in this city, or the next
fragments of a life given up in tacit whisper
with my eyes closed I see a cotton moon
limpid and starlit
the sight solid
the glow familiar`;

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
