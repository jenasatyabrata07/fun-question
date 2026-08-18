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
    document.getElementById("confettiContainer");


  let noCount = 0;
  let answered = false;


  /*
   * Four funny NO responses.
   */

  const noMessages = [

    {
      symbol: "😂❤️",

      text:
        "Are you sure, or are you just being dramatic? 😂❤️",

      hint:
        "Think carefully... 😌"
    },


    {
      symbol: "🙈💕",

      text:
        "I’m going to pretend I didn’t see that 😭💕",

      hint:
        "Okay... let's try this again."
    },


    {
      symbol: "😌✍️",

      text:
        "That was definitely a typo. We’ll try again 😌",

      hint:
        "Take your time this time 👀"
    },


    {
      symbol: "👀",

      text:
        "Interesting answer… would you like to use your second chance? 👀",

      hint:
        "I highly recommend reconsidering 😂❤️"
    }

  ];


  /* =====================================
     YES BUTTON
  ===================================== */

  yesButton.addEventListener(
    "click",
    function () {

      if (answered) {
        return;
      }

      answered = true;


      /*
       * Confetti starts immediately.
       */

      createConfetti();


      /*
       * Shrink the main card.
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
  );


  /* =====================================
     NO BUTTON
  ===================================== */

  noButton.addEventListener(
    "click",
    function () {

      if (answered) {
        return;
      }

      showNoMessage();

    }
  );


  /* =====================================
     NO MESSAGE
  ===================================== */

  function showNoMessage() {

    noCount++;


    /*
     * Select one of the four messages.
     */

    const index =
      Math.min(
        noCount - 1,
        noMessages.length - 1
      );

    const current =
      noMessages[index];


    /*
     * Show large emoji.
     */

    showBigSymbol(
      current.symbol
    );


    /*
     * Change text.
     */

    subtitle.textContent =
      current.text;

    hint.textContent =
      current.hint;


    /*
     * Restart message animation.
     */

    subtitle.classList.remove(
      "message-pop"
    );

    void subtitle.offsetWidth;

    subtitle.classList.add(
      "message-pop"
    );


    /*
     * Make YES bigger after every NO.
     */

    const yesScale =
      Math.min(
        1 + noCount * 0.08,
        1.40
      );

    yesButton.style.transform =
      "scale(" +
      yesScale +
      ")";


    /*
     * Make NO smaller after every click.
     *
     * 1st click = 82%
     * 2nd click = 64%
     * 3rd click = 46%
     * 4th click = 28%
     * 5th click = disappear
     */

    if (noCount < 5) {

      const noScale =
        1 - (
          noCount * 0.18
        );

      noButton.style.transform =
        "scale(" +
        noScale +
        ")";

    }


    /*
     * Fifth NO:
     * completely disappear.
     */

    if (noCount >= 5) {

      noButton.classList.add(
        "no-disappear"
      );


      /*
       * Change message to final state.
       */

      subtitle.textContent =
        "Okay... now there's only one button left. 😂❤️";

      hint.textContent =
        "I think you know what to do 😌💕";


      /*
       * Make YES clearly dominant.
       */

      yesButton.style.transform =
        "scale(1.35)";


      /*
       * Remove NO after animation.
       */

      setTimeout(
        function () {

          noButton.style.display =
            "none";

        },
        450
      );

    }

  }


  /* =====================================
     BIG REACTION SYMBOL
  ===================================== */

  function showBigSymbol(symbol) {

    /*
     * Remove previous symbol.
     */

    const oldSymbol =
      document.querySelector(
        ".reaction-symbol"
      );

    if (oldSymbol) {
      oldSymbol.remove();
    }


    /*
     * Create new symbol.
     */

    const reaction =
      document.createElement(
        "div"
      );

    reaction.className =
      "reaction-symbol";

    reaction.textContent =
      symbol;


    document.body.appendChild(
      reaction
    );


    /*
     * Start fading after
     * it has been visible.
     */

    setTimeout(
      function () {

        reaction.classList.add(
          "reaction-hide"
        );

      },
      1100
    );


    /*
     * Remove it completely.
     */

    setTimeout(
      function () {

        reaction.remove();

      },
      1500
    );

  }


  /* =====================================
     CLOSE SUCCESS SCREEN
  ===================================== */

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


  /* =====================================
     CONFETTI
  ===================================== */

  function createConfetti() {

    const colors = [

      "#ffffff",
      "#ffd6e7",
      "#ffde59",
      "#ff8fab",
      "#c77dff",
      "#80ed99"

    ];


    const total =
      120;


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


      /*
       * Random size.
       */

      const size =
        6 +
        Math.random() * 8;


      piece.style.width =
        size + "px";

      piece.style.height =
        (size * 1.5) + "px";


      /*
       * Random starting position.
       */

      piece.style.left =
        Math.random() * 100 + "%";


      /*
       * Random color.
       */

      piece.style.background =
        colors[
          Math.floor(
            Math.random() *
            colors.length
          )
        ];


      /*
       * Random movement.
       */

      piece.style.setProperty(
        "--drift",
        (
          (Math.random() - 0.5) *
          260
        ) + "px"
      );


      /*
       * Random delay.
       */

      piece.style.animationDelay =
        Math.random() * 0.5 + "s";


      confettiContainer.appendChild(
        piece
      );


      /*
       * Clean up.
       */

      setTimeout(
        function () {

          piece.remove();

        },
        2800
      );

    }

  }

});
