let margin = 75; // buttons don't go up to very edge
let buttons = [
    { label: "➊✷", link: "./us-nocturnal.html" },
    { label: "➋❋", link: "./soda-pop-anatomy.html" },
    { label: "➌✦", link: "./dad-memory-poem.html" },
    { label: "➍✺", link: "./alphabet-soup.html" },
    { label: "➎❇", link: "./breath-and-light.html" }
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // every button gets its own random placement
    buttons.forEach(button => {
        button.x = random(margin, windowWidth - margin - textWidth(button.label) - 40);
        button.y = random(margin, windowHeight - margin);
    });

    createButtons();
}

function createButtons() {
    // fill relevant information for each button
    buttons.forEach(button => {
        let btn = createButton(button.label);
        btn.position(button.x, button.y);
        btn.size(textWidth(button.label) + 40);
        styleButton(btn);
        btn.mousePressed(() => window.location.href = button.link);
    });
}

function styleButton(btn) {
    btn.style("background-color", "rgba(0, 0, 0, 0)");
    btn.style("color", "#4A2545");
    btn.style("font-size", "3em");
    btn.style("border-width", "0px");
}
