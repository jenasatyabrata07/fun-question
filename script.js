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

    const subtext =
      document.getElementById(
        "subtext"
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
     * Four NO responses.
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
       YES
    ===================================== */

    yesButton.addEventListener(
      "click",
      function () {

        if (answered) {
          return;
        }

        answered = true;


        /*
         * Celebrate immediately.
         */

        createConfetti();


        /*
         * Hide the question card.
         */

        questionCard.style.transform =
          "scale(0.86)";

        questionCard.style.opacity =
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


            /*
             * More confetti after
             * the reveal.
             */

            setTimeout(
              createConfetti,
              500
            );

          },
          450
        );

      }
    );


    /* =====================================
       NO
    ===================================== */

    noButton.addEventListener(
      "click",
      function () {

        if (answered) {
          return;
        }

        noCount++;


        /*
         * Pick the response.
         * After the 4th, keep using
         * the 4th message.
         */

        const index =
          Math.min(
            noCount - 1,
            noMessages.length - 1
          );

        const current =
          noMessages[index];


        /*
         * Show reaction emoji.
         */

        showReaction(
          current.symbol
        );


        /*
         * Change text.
         */

        subtext.textContent =
          current.text;

        hint.textContent =
          current.hint;


        /*
         * Animate message.
         */

        subtext.style.opacity =
          "0";

        subtext.style.transform =
          "translateY(8px)";


        requestAnimationFrame(
          function () {

            subtext.style.opacity =
              "1";

            subtext.style.transform =
              "translateY(0)";

          }
        );


        /*
         * Make YES bigger.
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
         * Make NO smaller.
         *
         * 1 = original
         * 0.82
         * 0.64
         * 0.46
         * 0.28
         * then disappears
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
         * Final NO click.
         */

        if (noCount >= 5) {

          noButton.classList.add(
            "no-final"
          );


          subtext.textContent =
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
       * Remove existing reaction.
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
       * Fade reaction out.
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
       * Remove it.
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
       CELEBRATE BUTTON
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


      const total = 140;


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
          5 + Math.random() * 9;


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
            320
          ) + "px"
        );


        piece.style.animationDelay =
          Math.random() * 0.7 + "s";


        confettiContainer.appendChild(
          piece
        );


        setTimeout(
          function () {

            piece.remove();

          },
          3000
        );

      }

    }

  }
);
