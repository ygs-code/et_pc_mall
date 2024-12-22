<template>
  <div class="contact-us-wrapper">
    <div class="contact-title-wrap">
      <div class="wrapper_1200">
        <div class="contact-top-wrap">
          <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
          <i class="line"></i>
          <span class="contact-nav">Delivery Information</span>
        </div>
        <div class="contact-title">Delivery Information</div>
      </div>
    </div>
    <div class="wrapper_1200 content-wrap">
      <p class="main-content">
        At Amba Homes Pvt. Ltd., we are committed to providing a smooth and
        efficient delivery experience for our customers. Please read the
        following delivery information carefully to understand our shipping
        process, delivery timelines, and associated costs.
      </p>
      <!-- <p class="main-title">Our Story</p>
            <p class="main-content">
                The idea for Amba Homes was born out of our own challenges with online shopping. As everyday consumers,
                we were frustrated by products that didn't match expectations, long wait times, and the lack of personal
                touch that makes shopping enjoyable. We realized there was a gap in the market for an e-commerce
                platform that offered more than just fast delivery or a wide range of products. We wanted to create a
                store that prioritizes:
            </p>
            <ul class="ul-list">
                <li class="item" v-for="(item, index) in ulList" :key="index">
                    <i class="dot"></i>
                    <span class="item-text">{{ item.text }}</span>
                </li>
            </ul> -->
      <p class="main-title">1. Shipping Methods and Costs</p>
      <p class="mb-6">
        We offer a range of shipping options to suit your needs:
      </p>
      <p class="pl-20 mb-6">
        Standard Shipping: The most economical option, typically with a longer
        delivery time.
      </p>
      <p class="pl-20 mb-6">
        Expedited Shipping: Faster delivery for customers who need their items
        sooner.
      </p>
      <p class="mb-6">
        Shipping costs are calculated at checkout based on your delivery
        location, the size of your order, and the shipping method you select.
      </p>
      <p class="main-title">2. Delivery Time</p>
      <p class="mb-6">Domestic Orders:</p>
      <p class="mb-6 pl-20">
        Standard Shipping: Typically delivered within 5 to 7 business days from
        the order dispatch date.
      </p>
      <p class="mb-6 pl-20">
        Expedited Shipping: Typically delivered within 2 to 4 business days from
        the order dispatch date.
      </p>
      <p class="mb-6">
        Please note that delivery times are estimates and may be affected by
        external factors such as weather conditions, holidays, and local
        logistical challenges.
      </p>
      <p class="main-title">3. Order Processing Time</p>
      <p class="mb-6">
        Orders are typically processed and shipped within 24hours after payment
        is confirmed. Processing times may vary during peak seasons, promotional
        periods, or when large volumes of orders are received.
      </p>
      <p class="mb-6">
        You will receive an email notification once your order has been
        dispatched, along with tracking information to monitor your order's
        progress.
      </p>
      <p class="main-title">4. Shipping Restrictions</p>
      <p class="mb-6">
        We currently ship to locations within India. If your shipping address is
        outside our delivery areas, we may not be able to fulfill your order.
      </p>
      <p class="mb-6">
        Some products, due to size, weight, or shipping restrictions, may not be
        available for delivery to certain locations.
      </p>
      <p class="main-title">5. Tracking Your Order</p>
      <p class="mb-6">
        Once your order has been dispatched, we will send you an email with
        tracking details. You can track the status of your order via the
        courier's website or through our online portal.
      </p>
      <p class="mb-6">
        If you do not receive tracking information within the expected time
        frame, please contact our customer support team
      </p>
      <p class="main-title">6. Shipping Delays</p>
      <p class="mb-6">
        While we strive to meet our estimated delivery times, please note that
        unforeseen circumstances may cause delays. Such delays may include
      </p>
      <p class="mb-6 pl-20">
        Delivery carrier delays due to weather conditions or other logistical
        challenges.
      </p>
      <p class="mb-6 pl-20">
        High order volumes during peak seasons or special promotions.
      </p>
      <p class="mb-6">
        We will inform you of any significant delays, and we appreciate your
        understanding.
      </p>
      <p class="main-title">7. Delivery Address</p>
      <p class="mb-6">
        Please ensure that your delivery address is accurate and complete. We
        are not responsible for delays or failed deliveries due to incorrect or
        incomplete address information.
      </p>
      <p class="mb-6">
        If there is an issue with your address or delivery, please contact our
        customer service team as soon as possible. If the courier cannot deliver
        due to an incorrect address, additional shipping fees may apply.
      </p>
      <p class="main-title">8. Lost or Missing Packages</p>
      <p class="mb-6">
        If your package is lost or appears to be missing, please contact us
        within 7 business days of the expected delivery date.
      </p>
      <p class="mb-6">
        We will work with the delivery carrier to investigate the issue. In the
        event that your package is confirmed as lost, we will either issue a
        refund or send a replacement, depending on your preference and product
        availability.
      </p>
      <p class="main-title">9. Damaged Items During Shipping</p>
      <p class="mb-6">
        If you receive an item that is damaged during transit, please contact us
        within 5 days of delivery with clear photos of the damage, as well as
        your order number.
      </p>
      <p class="mb-6">
        We will guide you through the process of returning the damaged item and
        issuing a replacement or refund, depending on availability and your
        preference.
      </p>
      <p class="main-title">10. Contact Us</p>
      <p class="mb-6">
        If you have any questions or concerns regarding the delivery of your
        order, or if you need assistance tracking your package, please don't
        hesitate to reach out to our customer support team.
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
          text: "Transparency: What you see is what you get. We believe in being clear about product details, delivery times, and prices — no hidden surprises.",
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
