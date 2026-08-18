document.addEventListener("DOMContentLoaded", function () {

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
   * Funny messages shown
   * when NO is selected.
   */

  const noMessages = [

    {
      text: "Wait... WHAT?! 😳",

      hint:
        "Are you sure about that? 🥺"
    },

    {
      text:
        "Maybe your finger slipped 😂",

      hint:
        "Try again... very carefully 😌"
    },

    {
      text:
        "My heart heard a YES 👀❤️",

      hint:
        "Let's pretend that NO never happened."
    },

    {
      text:
        "My heart is filing a complaint 💔😂",

      hint:
        "You have another chance..."
    },

    {
      text:
        "Okay... you're just teasing me now 😭",

      hint:
        "I know you want to press YES ❤️"
    },

    {
      text:
        "This is getting emotionally complicated 😂",

      hint:
        "Please ask your heart again."
    },

    {
      text:
        "One last chance... 🥺❤️",

      hint:
        "Do you REALLY love me?"
    }

  ];


  /*
   * YES BUTTON
   */

  yesButton.addEventListener(
    "click",
    function () {
      showYesResult();
    }
  );


  /*
   * NO BUTTON
   */

  noButton.addEventListener(
    "click",
    function () {
      showNoMessage();
    }
  );


  /*
   * YES RESULT
   */

  function showYesResult() {

    if (answered) {
      return;
    }

    answered = true;


    /*
     * Start confetti immediately.
     */

    createConfetti();


    /*
     * Hide original card.
     */

    loveCard.style.transform =
      "scale(0.9)";

    loveCard.style.opacity =
      "0";


    /*
     * Show success screen.
     */

    setTimeout(
      function () {

        successScreen.classList.add(
          "show"
        );

        successScreen.setAttribute(
          "aria-hidden",
          "false"
        );

      },
      350
    );
  }


  /*
   * NO RESULT
   */

  function showNoMessage() {

    if (answered) {
      return;
    }

    noCount++;


    /*
     * Select message.
     */

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
     * Make YES bigger.
     */

    const yesScale =
      Math.min(
        1 + (noCount * 0.07),
        1.45
      );

    yesButton.style.transform =
      "scale(" +
      yesScale +
      ")";


    /*
     * Make NO smaller.
     */

    const noScale =
      Math.max(
        1 - (noCount * 0.03),
        0.8
      );

    noButton.style.transform =
      "scale(" +
      noScale +
      ")";


    /*
     * After 3 NO clicks,
     * move the NO button.
     */

    if (noCount >= 3) {

      moveNoButton();

    }
  }


  /*
   * MOVE NO BUTTON
   */

  function moveNoButton() {

    noButton.classList.add(
      "moving"
    );


    const buttonWidth =
      noButton.offsetWidth;

    const buttonHeight =
      noButton.offsetHeight;

    const padding = 20;


    const maxX =
      Math.max(
        padding,
        window.innerWidth -
        buttonWidth -
        padding
      );


    const maxY =
      Math.max(
        padding,
        window.innerHeight -
        buttonHeight -
        padding
      );


    const x =
      padding +
      Math.random() *
      Math.max(
        1,
        maxX - padding
      );


    const y =
      padding +
      Math.random() *
      Math.max(
        1,
        maxY - padding
      );


    noButton.style.left =
      x + "px";

    noButton.style.top =
      y + "px";
  }


  /*
   * Keep NO visible after
   * screen rotation/resize.
   */

  window.addEventListener(
    "resize",
    function () {

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
   * Close success message.
   */

  closeButton.addEventListener(
    "click",
    function () {

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
   * CREATE CONFETTI
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
        size + "px";


      piece.style.height =
        (size * 1.5) + "px";


      piece.style.left =
        Math.random() * 100 + "%";


      piece.style.background =
        colors[
          Math.floor(
            Math.random() *
            colors.length
          )
        ];


      piece.style.setProperty(
        "--drift",
        (
          (Math.random() - 0.5) *
          260
        ) + "px"
      );


      piece.style.animationDelay =
        Math.random() * 0.5 + "s";


      confettiContainer.appendChild(
        piece
      );


      setTimeout(
        function () {

          piece.remove();

        },
        2800
      );

    }
  }

});
