document.addEventListener(
  "DOMContentLoaded",
  function () {

    const yesButton =
      document.getElementById(
        "yesButton"
      );

    const noButton =
      document.getElementById(
        "noButton"
      );

    const subtitle =
      document.getElementById(
        "subtitle"
      );

    const hint =
      document.getElementById(
        "hint"
      );

    const reactionArea =
      document.getElementById(
        "reactionArea"
      );

    const questionCard =
      document.getElementById(
        "questionCard"
      );

    const successScreen =
      document.getElementById(
        "successScreen"
      );

    const celebrateButton =
      document.getElementById(
        "celebrateButton"
      );

    const confettiContainer =
      document.getElementById(
        "confettiContainer"
      );


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
          "Think carefully, Rojalin... 😌"
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
         * Start celebration.
         */

        createConfetti();


        /*
         * Shrink question card.
         */

        questionCard.style.transform =
          "scale(0.86)";

        questionCard.style.opacity =
          "0";


        /*
         * Reveal success screen.
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


            /*
             * More confetti after
             * the reveal animation.
             */

            setTimeout(
              function () {

                createConfetti();

              },
              550
            );

          },
          450
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

        noCount++;


        /*
         * Select response.
         */

        const index =
          Math.min(
            noCount - 1,
            noMessages.length - 1
          );

        const current =
          noMessages[index];


        /*
         * Show reaction.
         */

        showReaction(
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
         * Animate text.
         */

        subtitle.style.opacity =
          "0";

        subtitle.style.transform =
          "translateY(8px)";


        requestAnimationFrame(
          function () {

            subtitle.style.opacity =
              "1";

            subtitle.style.transform =
              "translateY(0)";

          }
        );


        /*
         * YES gets bigger.
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
         * NO gets smaller.
         *
         * 1st = 82%
         * 2nd = 64%
         * 3rd = 46%
         * 4th = 28%
         * 5th = disappears
         */

        if (noCount < 5) {

          const noScale =
            Math.max(
              1 - noCount * 0.18,
              0.28
            );

          noButton.style.transform =
            "scale(" +
            noScale +
            ")";

        }


        /*
         * Fifth NO.
         */

        if (noCount >= 5) {

          noButton.classList.add(
            "no-final"
          );


          subtitle.textContent =
            "Okay... now it's just you and YES. 😂❤️";

          hint.textContent =
            "I think you know what to do, Rojalin 😌💕";


          yesButton.style.transform =
            "scale(1.35)";


          setTimeout(
            function () {

              noButton.style.display =
                "none";

            },
            550
          );

        }

      }
    );


    /* =====================================
       SHOW REACTION
    ===================================== */

    function showReaction(
      symbol
    ) {

      /*
       * Remove old reaction.
       */

      reactionArea.innerHTML =
        "";


      /*
       * Create new reaction.
       */

      const reaction =
        document.createElement(
          "div"
        );

      reaction.className =
        "reaction-symbol";

      reaction.textContent =
        symbol;


      reactionArea.appendChild(
        reaction
      );


      /*
       * Fade it out.
       */

      setTimeout(
        function () {

          reaction.classList.add(
            "fade-out"
          );

        },
        900
      );


      /*
       * Remove old reaction.
       */

      setTimeout(
        function () {

          if (
            reaction.parentNode
          ) {

            reaction.remove();

          }

        },
        1300
      );

    }


    /* =====================================
       FINAL CELEBRATE BUTTON
    ===================================== */

    celebrateButton.addEventListener(
      "click",
      function () {

        createConfetti();

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
        "#80ed99",
        "#ff6b9d"

      ];


      const total =
        150;


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
          5 + Math.random() * 9;


        piece.style.width =
          size + "px";


        piece.style.height =
          size * 1.5 + "px";


        /*
         * Random position.
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
         * Random drift.
         */

        piece.style.setProperty(
          "--drift",
          (
            (Math.random() - 0.5) *
            340
          ) + "px"
        );


        /*
         * Random animation delay.
         */

        piece.style.animationDelay =
          Math.random() * 0.7 + "s";


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
          3100
        );

      }

    }

  }
);
