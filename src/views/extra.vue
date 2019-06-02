<template>
  <div class="middlei">
    <h2>Our social media</h2>
    <a class="btni" href="#">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a class="btni" href="#">
      <i class="fab fa-twitter"></i>
    </a>
    <a class="btni" href="#">
      <i class="fab fa-google"></i>
    </a>
    <a class="btni" href="#">
      <i class="fab fa-instagram"></i>
    </a>
    <a class="btni" href="#">
      <i class="fab fa-youtube"></i>
    </a>
  </div>
</template>
<style>
.middlei {
  padding: 0px 450px;
  margin: 0px, 20px;
}

.btni {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: #f1f1f1;
  margin: 10px;
  border-radius: 10%;
  box-shadow: 0 5px 15px -5px #00000070;
  color: #3498db;
  overflow: hidden;
  position: relative;
}
.btni i {
  line-height: 20px;
  font-size: 20px;
  align-content: center;
  margin: auto;
  transition: 0.2s linear;
}
.btni:hover i {
  transform: scale(1.3);
  color: #f1f1f1;
}
.btni::before {
  content: "";
  position: absolute;
  width: 120%;
  height: 120%;
  background: #3498db;
  transform: rotate(45deg);
  left: -110%;
  top: 90%;
}
.btni:hover::before {
  animation: aaa 0.7s 1;
  top: -10%;
  left: -10%;
}
@keyframes aaa {
  0% {
    left: -110%;
    top: 90%;
  }
  50% {
    left: 10%;
    top: -30%;
  }
  100% {
    top: -10%;
    left: -10%;
  }
}
</style>