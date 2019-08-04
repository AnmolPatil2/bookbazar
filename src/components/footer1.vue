<template>
  <footer>
    <div class="container-fluid p-0">
      <div class="row text-left">
        <div class="col-md-5 col-sm-5">
          <h4 class="text-light">About us</h4>
          <p
            class="text-muted"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum maxime ea similique illum corrupti</p>
          <p class="pt-4 text-muted">
            <span>Anmol Patil</span>
          </p>
        </div>
        <div class="col-md-5 col-sm-12">
          <h4 class="text-light">Newsletter</h4>
          <p class="text-muted">Stay Updated</p>
          <form class="form-inline">
            <div class="col pl-0">
              <div class="input-group pr-5">
                <input
                  type="text"
                  class="form-control bg-dark text-white"
                  id="inlineFormInputGroupUsername2"
                  placeholder="Email"
                />
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-2 col-sm-12">
          <h4 class="text-light">Follow Us</h4>
          <p class="text-muted">Let us be social</p>
          <div class="column text-light">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-instagram"></i>
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
