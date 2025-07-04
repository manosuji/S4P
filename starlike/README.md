# _starlike_
### what is this?
_starlike_ is a digital interpretation of blackout poetry. Using my own poems collected from the past few years, the site is an exploration of shifting memory through words that are uncovered as the user mouses over them and which eventually revert back to unreadability.
### how is it made?
This project makes use of the p5.js library alongside HTML and a bit of CSS. Everything you need to run it should be present within this directory
### what files are here?
- `index.html` is the home base HTML file. It links to `index.js` to display the (randomly placed) buttons that appear on the home page which link to each poem file.
- `style.css` loads the special fonts, as well as defines the styles for the buttons which are NOT js buttons.
- `about.html` displays the about text with information about the project.
- `script.js` has all the functionality in order to do the font change that results in the covering/uncovering of the poem text. It is reusable for any file containing poem text within a *text-block* class.
- `alphabet-soup.html`, `breath-and-light.html`, `dad-memory-poem.html`, `soda-pop-anatomy.html`, and `us-nocturnal.html` are files which contain the text for each poem that is incorporated within the project.
- `poem-template.html` is a template page placeholder in the case that a new poem should be added.
- `assets/favicon.ico` is the favicon icon.
- `assets/raritas.otf` is the font file for the base text, [Raritas](https://fonts.adobe.com/fonts/raritas). Designed by Michał Jarociński. From Capitalics.
- `assets/star_ornaments.otf` is the font file for the star ornamental text, [HWT Star Ornaments](https://fonts.adobe.com/fonts/hwt-star-ornaments). Designed by Richard Kegler. From Hamilton Wood Type Collection.