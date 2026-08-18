const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const message =
  document.getElementById("message");

const question =
  document.getElementById("question");

const confetti =
  document.getElementById("confetti");


let noCount = 0;

let answered = false;


/*
  Change these messages if you want.
*/

const noMessages = [

  "Are you sure? 😢 Try again!",

  "Hmm... I think you meant YES 😄",

  "Nice try! 😂 The YES button is right there!",

  "The NO button is getting nervous... 😭",

  "Come onnnn... give YES a chance! ❤️",

  "Okay, this is becoming suspicious... 👀",

  "I still believe in you. Click YES! 🥹"

];


/*
  YES BUTTON
*/

yesButton.addEventListener(
  "click",
  () => {

    if (answered) {
      return;
    }

    answered = true;

    question.textContent =
      "YAAAAAY! 🎉❤️";

    message.textContent =
      "I knew you'd say YES! You just made my day! 🥰";

    noButton.style.display =
      "none";

    yesButton.textContent =
      "YES! ❤️";

    yesButton.style.transform =
      "scale(1.12)";

    document.body.classList.add(
      "success"
    );

    createConfetti();
  }
);


/*
  NO BUTTON
*/

noButton.addEventListener(
  "click",
  () => {

    if (answered) {
      return;
    }

    noCount++;


    /*
      Show a different funny message.
    */

    const messageIndex =
      Math.min(
        noCount - 1,
        noMessages.length - 1
      );

    message.textContent =
      noMessages[messageIndex];


    /*
      Make YES bigger each time
      NO is clicked.
    */

    const yesScale =
      Math.min(
        1 + noCount * 0.08,
        1.55
      );

    yesButton.style.transform =
      `scale(${yesScale})`;


    /*
      After the third NO,
      start moving the NO button.
    */

    if (noCount >= 3) {
      moveNoButton();
    }
  }
);


/*
  Move NO button to a random
  location on the screen.
*/

function moveNoButton() {

  noButton.classList.add(
    "moving"
  );

  const rect =
    noButton.getBoundingClientRect();

  const padding = 16;


  /*
    Calculate available screen
    space so the button stays
    visible on phones.
  */

  const maxX =
    Math.max(
      padding,
      window.innerWidth -
      rect.width -
      padding
    );

  const maxY =
    Math.max(
      padding,
      window.innerHeight -
      rect.height -
      padding
    );


  const x =
    Math.random() *
    (maxX - padding) +
    padding;

  const y =
    Math.random() *
    (maxY - padding) +
    padding;


  noButton.style.left =
    `${x}px`;

  noButton.style.top =
    `${y}px`;
}


/*
  If phone rotates,
  reposition NO so it doesn't
  disappear outside the screen.
*/

window.addEventListener(
  "resize",
  () => {

    if (
      noButton.classList.contains(
        "moving"
      )
    ) {
      moveNoButton();
    }
  }
);


/*
  Confetti when YES is clicked.
*/

function createConfetti() {

  const pieces = 100;

  for (
    let i = 0;
    i < pieces;
    i++
  ) {

    const piece =
      document.createElement(
        "div"
      );

    piece.className =
      "confetti";


    /*
      Random horizontal position.
    */

    piece.style.left =
      `${Math.random() * 100}%`;


    /*
      Random falling direction.
    */

    piece.style.setProperty(
      "--x",
      `${
        (Math.random() - 0.5) *
        260
      }px`
    );


    /*
      Random delay.
    */

    piece.style.animationDelay =
      `${
        Math.random() * 0.5
      }s`;


    /*
      Random size.
    */

    const size =
      6 +
      Math.random() * 8;

    piece.style.width =
      `${size}px`;

    piece.style.height =
      `${size * 1.5}px`;


    /*
      Random confetti colors.
    */

    const colors = [
      "#ff4d6d",
      "#ffbe0b",
      "#8338ec",
      "#3a86ff",
      "#22c55e",
      "#fb7185"
    ];

    piece.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    confetti.appendChild(
      piece
    );


    /*
      Remove the confetti
      after animation finishes.
    */

    setTimeout(
      () => {
        piece.remove();
      },
      2400
    );
  }
}
