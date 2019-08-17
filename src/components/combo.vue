
<template>
  <header>
    <div class="combo">
      <!--
  Please note: this code is in no way ready to be used as is in production on your website. It will need to be adapted to be cross browser compliant & accessible. I just wanted to share how one might go about this effect with CSS & JS and no other dependencies
      -->

      <div class="container">
        <h1
          style="color: #026670"
          class="writting text-center"
        >Purchase The Most recomended at the Cheapest Price</h1>
        <p class="somelines text-center">All are most prefered books</p>
        <div class="cardsoffer-column column-0">
          <div class="cardsoffer cardsoffer-color-0">
            <div class="border"></div>
            <img src="/img/svg/books1.jpeg" />
            <h1 class="white--text">P-Cycle</h1>
            <div class="pricing text-center">
              <v-btn @click="ComboOrder()" color="black" class="px-2 py-2 mb-5 white--text">
                <i class="fa fa-shopping-bag px-1" aria-hidden="true"></i>Order
              </v-btn>
              <v-btn color="black" class="px-2 py-2 mb-5 white--text">
                <i class="fas fa-eye px-1"></i>View
              </v-btn>
            </div>
          </div>
          <!--
        <div class="cardsoffer cardsoffer-color-2">
          <div class="border"></div>
          <img src="/img/svg/books2.jpeg" />
          <h1>c-cycle at one click</h1>
        </div>
          -->
        </div>
        <div class="cardsoffer-column column-1">
          <div class="cardsoffer cardsoffer-color-1">
            <div class="border"></div>
            <img src="/img/svg/books2.jpeg" />
            <h1 class="white--text">C-Cycle</h1>
            <div class="pricing text-center">
              <v-btn @click="ComboOrder()" color="black" class="px-2 py-2 mb-5 white--text">
                <i class="fa fa-shopping-bag px-1" aria-hidden="true"></i>Order
              </v-btn>

              <v-btn color="black" class="px-2 py-2 mb-5 white--text">
                <i class="fas fa-eye px-1"></i>View
              </v-btn>
            </div>
          </div>
          <!--
        <div class="cardsoffer cardsoffer-color-3">
          <div class="border"></div>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-03.jpg" />
          <h1>Get the show on, get paid</h1>
        </div>
          -->
        </div>
      </div>

      <div id="cover" class="cover"></div>

      <div id="open-content" class="open-content">
        <a href="#" id="close-content" class="close-content">
          <span class="x-1"></span>
          <span class="x-2"></span>
        </a>
        <img id="open-content-image" src />
        <div class="text" id="open-content-text"></div>
      </div>
    </div>
    <login />
  </header>
</template>
<script>
import { fb, db } from "../firebase";
import login from "@/components/login";
export default {
  name: "combo",
  data() {
    return {
      offers: []
    };
  },
  components: { login },
  firestore() {
    return {
      offers: db.collection("offers")
    };
  },
  methods: {
    ComboOrder() {
      this.$router.push({ name: "checkout" });
    }
  },
  mounted() {
    // listing vars here so they're in the global scope
    var cardsoffers,
      ncardsoffers,
      cover,
      openContent,
      openContentText,
      pageIsOpen = false,
      openContentImage,
      closeContent,
      windowWidth,
      windowHeight,
      currentcardsoffer;
    // initiate the process
    init();
    function init() {
      resize();
      selectElements();
      attachListeners();
    }
    // select all the elements in the DOM that are going to be used
    function selectElements() {
      (cardsoffers = document.getElementsByClassName("cardsoffer")),
        (ncardsoffers = cardsoffers.length),
        (cover = document.getElementById("cover")),
        (openContent = document.getElementById("open-content")),
        (openContentText = document.getElementById("open-content-text")),
        (openContentImage = document.getElementById("open-content-image"));
      closeContent = document.getElementById("close-content");
    }
    /* Attaching three event listeners here:
  - a click event listener for each cardsoffer
  - a click event listener to the close button
  - a resize event listener on the window
*/
    function attachListeners() {
      for (var i = 0; i < ncardsoffers; i++) {
        attachListenerTocardsoffer(i);
      }
      closeContent.addEventListener("click", onCloseClick);
      window.addEventListener("resize", resize);
    }
    function attachListenerTocardsoffer(i) {
      cardsoffers[i].addEventListener("click", function(e) {
        var cardsoffer = getcardsofferElement(e.target);
        oncardsofferClick(cardsoffer, i);
      });
    }
    /* When a cardsoffer is clicked */
    function oncardsofferClick(cardsoffer, i) {
      // set the current cardsoffer
      currentcardsoffer = cardsoffer;
      // add the 'clicked' class to the cardsoffer, so it animates out
      currentcardsoffer.className += " clicked";
      // animate the cardsoffer 'cover' after a 500ms delay
      setTimeout(function() {
        animateCoverUp(currentcardsoffer);
      }, 500);
      // animate out the other cardsoffers
      animateOthercardsoffers(currentcardsoffer, true);
      // add the open class to the page content
      openContent.className += " open";
    }
    /*
     * This effect is created by taking a separate 'cover' div, placing
     * it in the same position as the clicked cardsoffer, and animating it to
     * become the background of the opened 'page'.
     * It looks like the cardsoffer itself is animating in to the background,
     * but doing it this way is more performant (because the cover div is
     * absolutely positioned and has no children), and there's just less
     * having to deal with z-index and other elements in the cardsoffer
     */
    function animateCoverUp(cardsoffer) {
      // get the position of the clicked cardsoffer
      var cardsofferPosition = cardsoffer.getBoundingClientRect();
      // get the style of the clicked cardsoffer
      var cardsofferStyle = getComputedStyle(cardsoffer);
      setCoverPosition(cardsofferPosition);
      setCoverColor(cardsofferStyle);
      scaleCoverToFillWindow(cardsofferPosition);
      // update the content of the opened page
      openContentText.innerHTML =
        "<h1>" + cardsoffer.children[2].textContent + "</h1>" + paragraphText;
      openContentImage.src = cardsoffer.children[1].src;
      setTimeout(function() {
        // update the scroll position to 0 (so it is at the top of the 'opened' page)
        window.scroll(0, 0);
        // set page to open
        pageIsOpen = true;
      }, 300);
    }
    function animateCoverBack(cardsoffer) {
      var cardsofferPosition = cardsoffer.getBoundingClientRect();
      // the original cardsoffer may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
      setCoverPosition(cardsofferPosition);
      scaleCoverToFillWindow(cardsofferPosition);
      // animate scale back to the cardsoffer size and position
      cover.style.transform =
        "scaleX(" +
        1 +
        ") scaleY(" +
        1 +
        ") translate3d(" +
        0 +
        "px, " +
        0 +
        "px, 0px)";
      setTimeout(function() {
        // set content back to empty
        openContentText.innerHTML = "";
        openContentImage.src = "";
        // style the cover to 0x0 so it is hidden
        cover.style.width = "0px";
        cover.style.height = "0px";
        pageIsOpen = false;
        // remove the clicked class so the cardsoffer animates back in
        currentcardsoffer.className = currentcardsoffer.className.replace(
          " clicked",
          ""
        );
      }, 301);
    }
    function setCoverPosition(cardsofferPosition) {
      // style the cover so it is in exactly the same position as the cardsoffer
      cover.style.left = cardsofferPosition.left + "px";
      cover.style.top = cardsofferPosition.top + "px";
      cover.style.width = cardsofferPosition.width + "px";
      cover.style.height = cardsofferPosition.height + "px";
    }
    function setCoverColor(cardsofferStyle) {
      // style the cover to be the same color as the cardsoffer
      cover.style.backgroundColor = cardsofferStyle.backgroundColor;
    }
    function scaleCoverToFillWindow(cardsofferPosition) {
      // calculate the scale and position for the cardsoffer to fill the page,
      var scaleX = windowWidth / cardsofferPosition.width;
      var scaleY = windowHeight / cardsofferPosition.height;
      var offsetX =
        (windowWidth / 2 -
          cardsofferPosition.width / 2 -
          cardsofferPosition.left) /
        scaleX;
      var offsetY =
        (windowHeight / 2 -
          cardsofferPosition.height / 2 -
          cardsofferPosition.top) /
        scaleY;
      // set the transform on the cover - it will animate because of the transition set on it in the CSS
      cover.style.transform =
        "scaleX(" +
        scaleX +
        ") scaleY(" +
        scaleY +
        ") translate3d(" +
        offsetX +
        "px, " +
        offsetY +
        "px, 0px)";
    }
    /* When the close is clicked */
    function onCloseClick() {
      // remove the open class so the page content animates out
      openContent.className = openContent.className.replace(" open", "");
      // animate the cover back to the original position cardsoffer and size
      animateCoverBack(currentcardsoffer);
      // animate in other cardsoffers
      animateOthercardsoffers(currentcardsoffer, false);
    }
    function animateOthercardsoffers(cardsoffer, out) {
      var delay = 100;
      for (var i = 0; i < ncardsoffers; i++) {
        // animate cardsoffers on a stagger, 1 each 100ms
        if (cardsoffers[i] === cardsoffer) continue;
        if (out) animateOutcardsoffer(cardsoffers[i], delay);
        else animateIncardsoffer(cardsoffers[i], delay);
        delay += 100;
      }
    }
    // animations on individual cardsoffers (by adding/removing cardsoffer names)
    function animateOutcardsoffer(cardsoffer, delay) {
      setTimeout(function() {
        cardsoffer.className += " out";
      }, delay);
    }
    function animateIncardsoffer(cardsoffer, delay) {
      setTimeout(function() {
        cardsoffer.className = cardsoffer.className.replace(" out", "");
      }, delay);
    }
    // this function searches up the DOM tree until it reaches the cardsoffer element that has been clicked
    function getcardsofferElement(el) {
      if (el.className.indexOf("cardsoffer ") > -1) return el;
      else return getcardsofferElement(el.parentElement);
    }
    // resize function - records the window width and height
    function resize() {
      if (pageIsOpen) {
        // update position of cover
        var cardsofferPosition = currentcardsoffer.getBoundingClientRect();
        setCoverPosition(cardsofferPosition);
        scaleCoverToFillWindow(cardsofferPosition);
      }
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    }
    var paragraphText =
      "<ul><li>1) Breeze through your first year with our physics cycle collection hand picked Textbooks for every subject </li><l1>2) Afraid of the quality? Don't worry we cross check the quality before we deliver it to you, but hey you can pay for it once you verify it!</li><li>3) Not happy with our collection? Customize your choice by placing an order with us.</li><l1>4) Get the highest offers on bulk orders, click or order now</li></ul>";
  }
};
</script>
<style scoped>
/* 
** Layout, Text & Colors 
*/
body {
  background: #150f21;
  font-size: 18px;
  display: block;
}
.somelines {
  color: #2e2c2caf;
  font-size: 3vmin;
  padding-bottom: 3vmin;
  backgroung: #fff;
}
p {
  line-height: 1.5;
}
.writting {
  font-family: "Roboto", cursive;
}
.container {
  margin: 0 auto;
}
.pricing {
  background: rgba(208, 241, 241, 0.199);
  border-top-right-radius: 170px;
  border-top-left-radius: 170px;
}
.pricing > h1 {
  font-size: 10vmin;
  padding: 1em 0.5em;
}
/* cardsoffers */
.cardsoffer-column {
  width: 50%;
  float: left;
  padding: 4%;
  box-sizing: border-box;
}
.column-1 {
  padding-top: 100px;
}
.cardsoffer {
  width: 92%;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background: #eb5160;
  color: #fff;
  cursor: pointer;
  margin-bottom: 60px;
}
.border {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 6px;
  border: 1px solid #fff;
  opacity: 0.5;
  left: -6px;
  top: -6px;
}
.cardsoffer h1 {
  position: relative;
  padding: 190px 0px 10px 10px;
  width: 90%;
}
.cardsoffer > img {
  max-height: 200px;
  width: 90%;
  position: absolute;
  top: -6%;
  left: -6%;
}
.cardsoffer-color-0 {
  background-color: #99ced3;
}
.cardsoffer-color-1 {
  background-color: #65ccb8;
}
.cardsoffer-color-2 {
  background-color: #8daa91;
}
.cardsoffer-color-3 {
  background-color: #888da7;
}
/* The cover (expanding background) */
.cover {
  position: fixed;
  background: #eb5160;
  z-index: 100;
  transform-origin: 50% 50%;
}
/* The open page content */
.open-content {
  width: 100%;
  z-index: 110;
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.open-content img {
  position: relative;
  width: 90%;
  margin-left: 3%;
  margin-top: -20%;
  z-index: 5;
  max-height: 650px;
}
.open-content .text {
  background: #fff;
  margin-top: -56%;
  padding: 60% 5% 5% 5%;
  width: 80%;
  margin-left: 5%;
  margin-bottom: 5%;
}
.open-content .text h1,
.open-content .text p {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.close-content {
  display: block;
  position: absolute;
  right: 12px;
  top: -30%;
  width: 30px;
  height: 30px;
}
.close-content span {
  background: #222;
  width: 30px;
  height: 6px;
  display: block;
  position: absolute;
  top: 14px;
}
.x-1 {
  transform: rotate(45deg);
}
.x-2 {
  transform: rotate(-45deg);
}
/* 
** Transitions
*/
.cardsoffer {
  transition: opacity 200ms linear 320ms, transform 200ms ease-out 320ms;
}
.border {
  transition: opacity 200ms linear, transform 200ms ease-out;
}
.cardsoffer img {
  transition: opacity 200ms linear 0ms, transform 200ms ease-in 0ms;
}
.cardsoffer h1 {
  transform: translate3d(20%, 0px, 0px);
  transition: opacity 200ms linear 120ms, transform 200ms ease-in 120ms;
}
/* Clicked cardsoffer */
.cardsoffer.clicked img {
  transform: translate3d(0px, -40px, 0px);
  opacity: 0;
}
.cardsoffer.clicked .border {
  opacity: 0;
  transform: scale(1.3);
}
.cardsoffer.out,
.cardsoffer.out img {
  transform: translate3d(0px, -40px, 0px);
  opacity: 0;
}
.cardsoffer.out h1,
.cardsoffer.clicked h1 {
  transform: translate3d(20%, -40px, 0px);
  opacity: 0;
}
.cover {
  transition: transform 300ms ease-in-out;
}
.open-content {
  transition: opacity 200ms linear 0ms;
}
.open-content.open {
  opacity: 1;
  pointer-events: all;
  transition-delay: 1000ms;
}
/* 
** Media Queries
*/
@media screen and (max-width: 600px) {
  .cardsoffer-column {
    width: 90%;
  }
  .close-content {
    display: block;
    position: absolute;
    right: 12px;
    top: -95%;
    width: 30px;
    height: 30px;
  }
  .open-content img {
    position: relative;
    width: 90%;
    margin-left: 3%;
    margin-top: -90%;
    z-index: 5;
    max-height: 650px;
  }
  .column-1 {
    padding-top: 0px;
  }
}
</style>
