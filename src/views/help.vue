<template>
  <div class="help">
    <div class="title">
      <h2 class="white--text faqs center">FAQs</h2>
      <ul>
        <li v-for="(item,i) in items" :key="i">
          <h4 @click="display(i)" style="cursor: pointer" class="p-2 white--text">-> {{item.head}}</h4>
          <p v-if="pointdisplay==i" class="p-4 ans">{{item.text}}</p>
        </li>
      </ul>
      <h2 class="p-2 white--text">Still not Able to sovle your problem</h2>
      <p class="text-muted p-4">
        >
        <a href="https://wa.me/918088363293">Contact us On whats app</a>
      </p>
      <v-btn flat @click="goback()" class="back white--text">Back</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "help",
  methods: {
    display(i) {
      this.pointdisplay = i;
    },

    goback() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      pointdisplay: null,
      items: [
        {
          head: "What does this site do?",
          text:
            "Bookoo is an online platform to provide students with various services ranging from buying and selling textbooks to community development at our college by connecting you to various clubs of our college."
        },
        {
          head: "How to Login/signup?",
          text:
            "Click the login option at the navigation bar. Proceed with the login/signup via your preferred method."
        },
        {
          head: "How to sell books?",
          text:
            "Head to the sell page, pick the corresponding branch and year. Go through the books and select the book of your choice. Upload a picture and verify the price. Once we verify the upload, the book will be put on our wait list to be sold."
        },
        {
          head: "When will my book be sold?",

          text:
            "The time for a specific book to be sold varies on multiple situations such as demand and availability.You will be notified and paid the amount as soon as the book is collected from you and sold."
        },
        {
          head: "What if a book is not on the list?",

          text:
            "We are trying our best to make every book available. Please contact us through our help page  if for any further assistance."
        },
        {
          head: "How to buy books?",
          text:
            "Head to the buy page, pick the corresponding branch and select a book of your choice. Place your order. We will verify your purchase and provide you with all further assistance."
        },
        {
          head: "When will my book be delivered?",

          text:
            "As your order is verified, we will provide you with a delivery date.The deliver date includes the date and a time slot in which we can deliver your book. You wil be contacted by a delivery executive prior to the delivery."
        },
        {
          head: "How is my book delivered/picked up?",

          text:
            "We provide delivery/pickup services to our college. We pick-up/deliver free of cost and at your convenience."
        },
        {
          head: "When do I pay?",

          text:
            "We accept various payment options of your choice at the time of pick-up/delivery of your book."
        },
        {
          head: "How do i find or join clubs?",
          text:
            "We will be hosting BMSIT clubs on BooKoo soon. Follow our instagram page for more updates."
        },
        {
          head: "How do i donate books?",
          text:
            "Coming soon!! We're partnering with a few NGO's. Stay tuned for more updates."
        }
      ]
    };
  }
};
</script>
<style scoped>
.help {
  background: url("/images/faqs.jpg");

  font-family: Roboto;
}
.back {
  position: relative;
  left: 45%;
  background: black;
}
.image {
  position: absolute;
  top: 10px;
}
.faqs {
  text-align: center;
}
.ans {
  color: #ff8300;
}
</style>
