const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const subtitle =
  document.getElementById("subtitle");

const hint =
  document.getElementById("hint");

const loveCard =
  document.getElementById("loveCard");

const successScreen =
  document.getElementById("successScreen");

const closeButton =
  document.getElementById("closeButton");

const confettiContainer =
  document.getElementById(
    "confettiContainer"
  );


let noCount = 0;
let answered = false;


/*
  Funny messages when she presses NO.
  You can change these later.
*/

const noMessages = [

  {
    text:
      "Wait... WHAT?! 😳",
    hint:
      "Are you sure about that? 🥺"
  },

  {
    text:
      "Maybe your finger slipped 😂",
    hint:
      "Try that button again... but differently 😌"
  },

  {
    text:
      "Hmm... my heart heard a YES 👀❤️",
    hint:
      "Let's pretend that NO never happened."
  },

  {
    text:
      "My heart is filing a complaint 💔😂",
    hint:
      "You have one more chance..."
  },

  {
    text:
      "Okay... now you're just teasing me 😭",
    hint:
      "I know that YES is hiding somewhere."
  },

  {
    text:
      "This is getting emotionally complicated 😂",
    hint:
      "Please consult your heart. ❤️"
  },

  {
    text:
      "Fine... I'll ask one last time 🥺",
    hint:
      "Do you REALLY love me?"
  }

];


/*
  YES
*/

yesButton.addEventListener(
  "click",
  handleYes
);


/*
  NO
*/

noButton.addEventListener(
  "click",
  handleNo
);


/*
  YES ACTION
*/

function handleYes() {

  if (answered) {
    return;
  }

  answered = true;

  /*
    Small transition before
    showing the success screen.
  */

  loveCard.style.transform =
    "scale(0.92)";

  loveCard.style.opacity =
    "0";

  createConfetti();

  setTimeout(() => {

    successScreen.classList.add(
      "show"
    );

    successScreen.setAttribute(
      "aria-hidden",
      "false"
    );

  }, 350);
}


/*
  NO ACTION
*/

function handleNo() {

  if (answered) {
    return;
  }

  noCount++;

  const index =
    Math.min(
      noCount - 1,
      noMessages.length - 1
    );

  subtitle.textContent =
    noMessages[index].text;

  hint.textContent =
    noMessages[index].hint;


  /*
    Make YES progressively
    more tempting.
  */

  const yesScale =
    Math.min(
      1 + noCount * 0.075,
      1.45
    );

  yesButton.style.transform =
    `scale(${yesScale})`;


  /*
    Make the NO button slightly
    smaller after each NO.
  */

  const noScale =
    Math.max(
      1 - noCount * 0.035,
      0.78
    );

  noButton.style.transform =
    `scale(${noScale})`;


  /*
    Move NO after the third
    attempt.
  */

  if (noCount >= 3) {
    moveNoButton();
  }
}


/*
  Move the NO button somewhere
  safely inside the current screen.
*/

function moveNoButton() {

  noButton.classList.add(
    "moving"
  );


  const rect =
    noButton.getBoundingClientRect();

  const padding = 18;


  /*
    Keep it away from the very
    edge of the screen.
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
  Keep NO inside the screen if
  the phone rotates or resizes.
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
  SUCCESS SCREEN
*/

closeButton.addEventListener(
  "click",
  () => {

    successScreen.classList.remove(
      "show"
    );

    successScreen.setAttribute(
      "aria-hidden",
      "true"
    );

  }
);


/*
  CONFETTI
*/

function createConfetti() {

  const colors = [

    "#ffffff",
    "#ffd6e7",
    "#ffde59",
    "#ff8fab",
    "#c77dff",
    "#80ed99"

  ];


  const total = 120;


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const piece =
      document.createElement(
        "div"
      );

    piece.className =
      "confetti";


    const size =
      6 +
      Math.random() * 8;


    piece.style.width =
      `${size}px`;

    piece.style.height =
      `${size * 1.5}px`;


    piece.style.left =
      `${Math.random() * 100}%`;


    piece.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    piece.style.setProperty(
      "--drift",
      `${
        (Math.random() - 0.5) *
        260
      }px`
    );


    piece.style.animationDelay =
      `${
        Math.random() * 0.45
      }s`;


    confettiContainer.appendChild(
      piece
    );


    setTimeout(
      () => {
        piece.remove();
      },
      2600
    );

  }

}
