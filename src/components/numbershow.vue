<template>
  <section class="section-2 container-fluid p-0">
    <div class="cover">
      <div class="overlay"></div>
      <div class="content text-center">
        <h1>Some Features That Made Us Unique</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eum?</p>
      </div>
    </div>
    <div class="container-fluid text-center">
      <div class="numbers d-flex flex-md-row flex-wrap justify-content-center">
        <div class="rect">
          <h1>130</h1>

          <p>Number of books</p>
        </div>
        <div class="rect">
          <h1>20</h1>
          <p>Books sold</p>
        </div>
        <div class="rect">
          <h1>90%</h1>
          <p>Satisfied coustumers</p>
        </div>
        <div class="rect">
          <h1>10</h1>
          <p>Satisfied coustumers</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "numbers",
  mounted() {
    let nCount = selector => {
      $(selector).each(function() {
        $(this).animate(
          {
            Counter: $(this).text()
          },
          {
            // A string or number determining how long the animation will run.
            duration: 4000,
            // A string indicating which easing function to use for the transition.
            easing: "swing",
            /**
             * A function to be called for each animated property of each animated element.
             * This function provides an opportunity to
             *  modify the Tween object to change the value of the property before it is set.
             */
            step: function(value) {
              $(this).text(Math.ceil(value));
            }
          }
        );
      });
    };

    let a = 0;
    $(window).scroll(function() {
      // The .offset() method allows us to retrieve the current position of an element  relative to the document
      let oTop = $(".numbers").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() >= oTop) {
        a++;
        nCount(".rect > h1");
      }
    });
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
@media only screen and (max-width: 768px) {
  .section-2 .cover {
    background-position: -25vmin -10vmin;
  }
}
header,
section {
  overflow-x: hidden;
}

:root {
  --light-black: #2e2c2caf;
  --bggradient: linear-gradient(to bottom, #dd2476, #ff512f);
  --light-gray: rgba(255, 255, 255, 0.877);
}
.cover {
  width: 100%;
  height: 55vmin;
  background: url("/images/numbers.jpeg");
  background-position: -24rem -19rem;
  background-size: 150%;
  position: relative;
}

.cover .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.cover .content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 19vmin;
}

.cover .content > h1 {
  font-family: "Patua One", cursive;
  font-size: 6vmin;
  color: whitesmoke;
}

.cover .content > p {
  font-family: "Rubik", sans-serif;
  font-size: 2vmin;
  color: #e5e5e5;
}

.numbers .rect {
  position: relative;
  z-index: 1;
  background: white;
  width: 17rem;
  height: 12rem;
  padding-top: 3.5vmin;
  margin: 1rem;
  border-radius: 0.5em;
  box-shadow: 1px 2px 50px 0px rgba(255, 0, 0, 0.349);
}

.numbers {
  margin-top: -15vmin;
}

.numbers .rect h1 {
  font-size: 7rem;
  color: tomato;
}

.numbers .rect > p {
  font-family: "Patua One", cursive;
}
</style>
