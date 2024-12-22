<template>
  <div class="contact-us-wrapper">
    <div class="contact-title-wrap">
      <div class="wrapper_1200">
        <div class="contact-top-wrap">
          <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
          <i class="line"></i>
          <span class="contact-nav">About Us</span>
        </div>
        <div class="contact-title">About Us</div>
      </div>
    </div>
    <div class="wrapper_1200 content-wrap">
      <!-- <p class="main-color">About Store</p> -->
      <p class="main-content">Welcome to Amba Homes!</p>
      <p class="main-content">
        At Amba Homes, we believe that shopping for quality products should be
        simple, enjoyable, and most importantly, reliable. As a small but
        passionate team based in Delhi, India, we set out to solve some of the
        most common frustrations with online shopping in India poor product
        quality, delayed deliveries, and lack of transparency.
      </p>
      <p class="main-content">
        We are a team of dedicated staff and owners who care about the
        experience you have when you shop with us. Rather than focusing on
        making a quick profit, we focus on building long lasting relationships
        with our customers, grounded in trust, honesty, and quality.
      </p>
      <p class="main-title">Our Story</p>
      <p class="main-content">
        The idea for Amba Homes was born out of our own challenges with online
        shopping. As everyday consumers, we were frustrated by products that
        didn't match expectations, long wait times, and the lack of personal
        touch that makes shopping enjoyable. We realized there was a gap in the
        market for an e-commerce platform that offered more than just fast
        delivery or a wide range of products. We wanted to create a store that
        prioritizes:
      </p>
      <ul class="ul-list">
        <li class="item" v-for="(item, index) in ulList" :key="index">
          <i class="dot"></i>
          <span class="item-text">{{ item.text }}</span>
        </li>
      </ul>
      <p class="main-title">Our Team</p>
      <p class="main-content">
        We may be a small team, but we are a dedicated bunch. Each one of us,
        from the founders to the customer service staff, is involved in every
        aspect of the business. From carefully selecting the products we sell to
        ensuring your order is packed with care, our team is passionate about
        making Amba Homes the best online shopping experience possible.
      </p>
      <p class="main-title">Our Vision</p>
      <p class="main-content">
        To be a trusted, long-term partner for your shopping needs, whether it's
        refreshing your wardrobe or upgrading your kitchen. We envision Amba
        Homes as a place where customers can find quality products, honest
        service, and a seamless shopping experience all while supporting a
        company that genuinely cares.
      </p>
      <p class="main-content">
        Thank you for allowing us to share our story with you.
        <br />
        Happy Shopping.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "about",
  auth: false,
  data() {
    return {
      userInfo: {},
      ruleForm: {
        name: "",
        phone: "",
        email: "",
        message: "",
      },
      ulList: [
        {
          text: "Quality: Our products are sourced from trusted manufacturers, ensuring you get the best quality at reasonable prices.",
        },
        {
          text: "Transparency: What you see is what you get. We believe in being clear about product details, delivery times, and prices no hidden surprises.",
        },
        {
          text: "Customer Satisfaction: We're here to serve you, not just sell to you. Your satisfaction is our priority, and we're always ready to assist with any questions or concerns.",
        },
      ],
    };
  },
  head() {
    return {
      title: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.body.setAttribute("style", "background:#ffffff");
    });
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "you have send a message!",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-us-wrapper {
  font-size: 16px;

  .contact-title-wrap {
    height: 150px;
    padding: 40px 0;
    background-color: #f8f8f8;
    margin-bottom: 60px;

    .contact-top-wrap {
    }

    .home-nav {
      color: #999;
      font-size: 16px;
    }

    .line {
      display: inline-block;
      width: 2px;
      height: 11px;
      background-color: #e5e5e5;
      margin: 0 8px;
    }

    .contact-nav {
      color: #3577f0;
      font-size: 16px;
    }

    .contact-title {
      margin-top: 15px;
      font-size: 34px;
      font-weight: bold;
    }
  }

  .content-wrap {
    color: #777;
  }

  .main-color {
    color: #3577f0;
  }

  .main-title {
    font-size: 20px;
    margin-top: 22px;
    margin-bottom: 16px;
    font-weight: bold;
    color: #000;
  }

  .main-content {
    /* font-size: 18px; */
    margin-bottom: 12px;
  }
}

.ul-list {
  margin-top: 30px;

  .item {
    margin-bottom: 12px;
    display: flex;
  }

  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #ddd;
    border-radius: 50%;
    margin-right: 8px;
    margin-top: 10px;
  }

  .item-text {
    /* display: inline-block; */
  }
}
</style>
