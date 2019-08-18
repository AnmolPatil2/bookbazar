<template>
  <footer>
    <div class="container-fluid p-0">
      <div class="row text-left">
        <div class="col-md-5 col-sm-5">
          <h4 class="text-light">About us</h4>
          <p
            class="text-muted"
          >Facing problems in finding the right books at the right prices? Bookoo is here to help you get the books you like. Our team is working to bring all types of Enginnering books at the be best prices. We aim to bring all of us a lot closer as a community .</p>
          <h4 class="text-light">Shop on app</h4>

          <p
            class="text-muted"
          >Yes, We've got an App. Just Search on the play store/AppStore & install the bookoo app.</p>
          <p class="pt-4 text-muted">
            <span>Team BooKoo</span>
          </p>
        </div>

        <div class="col-md-5 col-sm-12">
          <h4 class="text-light">Information</h4>
          <ul>
            <li>
              <p class="text-muted">About Us</p>
            </li>
            <li>
              <p class="text-muted">Terms of use & policy</p>
            </li>

            <li>
              <p class="text-muted">Contact Us</p>
            </li>

            <li>
              <p class="text-muted">Communities</p>
            </li>
            <li>
              <p class="text-muted">Frequently Asked Questions</p>
            </li>
          </ul>

          <!--
           <form class="form-inline">
            <div class="col pl-0">
              <div class="input-group pr-5">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </form>
          -->
        </div>

        <div class="col-md-2 col-sm-12">
          <h4 class="text-light">Follow Us</h4>
          <p class="text-muted">Let us be social</p>
          <div class="column text-light">
            <a href="https://instagram.com/_.bookoo._?igshid=g7jwl267bmjh">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://chat.whatsapp.com/Ceb4NsIZbVe5tnBMjy1RAq">
              <i class="fab fa-whatsapp mx-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "footer1"
};
</script>

<style scoped>
footer {
  background: rgba(0, 0, 0, 0.815);
  overflow-x: hidden;
  padding: 14vmin 18vmin;
}

footer p > span {
  color: #ff512f;
}

footer input {
  border: none !important;
}

footer input::placeholder {
  color: white !important;
}

footer .input-group .input-group-text {
  background: linear-gradient(to bottom, #dd2476, #ff512f);
  border: none;
}

footer .column i {
  color: #dd2476;
}

/* It is Adjacent sibling combinator 
 */

footer .column i + i {
  padding: 0 0.5em;
}
@media only screen and (max-width: 768px) {
  footer .row .col-md-2 {
    margin-top: 8vmin;
  }
}
</style>
