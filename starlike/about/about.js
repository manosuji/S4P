let txtSize;

let textBlock = `this site is a repository of poems I've written
in the past few years / and an exploration of shifting memory / 
in the context of a digital interpretation of blackout poetry. / 
when we write, how many thoughts do we lose / before we 
can articulate them? / thoughts are only present for a short time, 
then disappear / we can only exist in the space of the poem 
for so long / as it provides a shielded vulnerability / 
afterwards, we end up grasping 
for words, for memory / remembering things as they weren’t.`;

let default_font = "raritas";

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, CENTER)
  txtSize = height/50
  textSize(txtSize);
  
  button = createButton('✢');
  button.position(width - txtSize * 4, height - txtSize * 4);
  button.size(textWidth('✢') + 40, txtSize*2);
  
  button.style('background-color', 'white');
  button.style('color', '#4A2545');
  button.style('font-size', txtSize * 2 + 'px');
  button.style('border-width', '0px');
  button.mousePressed(() => window.location.href = '/index.html');
}

function draw() {
  background(255);
  fill('#4A2545')
  textFont(default_font)
  text(textBlock, width / 2 - textWidth(textBlock) / 2, height/2)
}