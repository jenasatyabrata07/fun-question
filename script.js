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
   * Four NO messages.
   */

  const noMessages = [

    {
      symbol: "😂❤️",
      text:
        "Are you sure, or are you just being dramatic?",
      hint:
        "Think carefully... 😌"
    },

    {
      symbol: "🙈💕",
      text:
        "I’m going to pretend I didn’t see that.",
      hint:
        "Okay... let's try this again 😂"
    },

    {
      symbol: "😌✍️",
      text:
        "That was definitely a typo. We’ll try again.",
      hint:
        "Take your time this time 👀"
    },

    {
      symbol: "👀",
      text:
        "Interesting answer… would you like to use your second chance?",
      hint:
        "I highly recommend reconsidering 😂❤️"
    }

  ];


  /* =========================
     YES
  ========================= */

  yesButton.addEventListener(
    "click",
    function () {

      if (answered) {
        return;
      }

      answered = true;

      createConfetti();

      loveCard.style.transform =
        "scale(0.9)";

      loveCard.style.opacity =
        "0";

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


  /* =========================
     NO
  ========================= */

  noButton.addEventListener(
    "click",
    function () {

      if (answered) {
        return;
      }

      noCount++;


      /*
       * Cycle through our
       * four messages.
       */

      const index =
        (noCount - 1) %
        noMessages.length;

      const current =
        noMessages[index];


      /*
       * Show the large emoji.
       */

      showBigSymbol(
        current.symbol
      );


      /*
       * Change message.
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
       * Make YES bigger.
       */

      const yesScale =
        Math.min(
          1 + noCount * 0.055,
          1.35
        );

      yesButton.style.transform =
        "scale(" +
        yesScale +
        ")";


      /*
       * Shake NO.
       */

      noButton.classList.remove(
        "no-shake"
      );

      void noButton.offsetWidth;

      noButton.classList.add(
        "no-shake"
      );

    }
  );


  /* =========================
     BIG SYMBOL
  ========================= */

  function showBigSymbol(symbol) {

    const oldSymbol =
      document.querySelector(
        ".reaction-symbol"
      );

    if (oldSymbol) {
      oldSymbol.remove();
    }


    const reaction =
      document.createElement("div");

    reaction.className =
      "reaction-symbol";

    reaction.textContent =
      symbol;


    document.body.appendChild(
      reaction
    );


    setTimeout(
      function () {

        reaction.classList.add(
          "reaction-hide"
        );

      },
      1100
    );


    setTimeout(
      function () {

        reaction.remove();

      },
      1500
    );
  }


  /* =========================
     SUCCESS CLOSE
  ========================= */

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


  /* =========================
     CONFETTI
  ========================= */

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
        6 + Math.random() * 8;


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
