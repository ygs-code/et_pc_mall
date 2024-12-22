<template>
  <div class="contact-us-wrapper">
    <div class="contact-title-wrap">
      <div class="wrapper_1200">
        <div class="contact-top-wrap">
          <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
          <i class="line"></i>
          <span class="contact-nav">Order Policy</span>
        </div>
        <div class="contact-title">Order Policy</div>
      </div>
    </div>
    <div class="wrapper_1200 content-wrap">
      <p class="main-content">
        Thank you for choosing Amba Homes Pvt. Ltd. as your preferred online
        clothing, artificial accessories and kitchen store. We are committed to
        providing you with a seamless and enjoyable shopping experience. Please
        read our order policy carefully, as it outlines important information
        regarding placing orders, order fulfillment, and delivery.
      </p>
      <p class="main-title">1. Order Placement</p>
      <p class="mb-6">
        Account Registration: To place an order, customers may be required to
        create an account on our website. You must provide accurate, up-to-date
        information when registering or placing an order.
      </p>
      <p class="mb-6">
        Order Process: By placing an order, you agree to purchase the selected
        products at the prices listed and under the terms of this policy. Orders
        can be placed by selecting items and proceeding through the checkout
        process.
      </p>
      <p class="mb-6">
        Product Availability: All products are subject to availability. While we
        make every effort to ensure the availability of listed products, some
        items may go out of stock unexpectedly. In such cases, we will notify
        you promptly and offer alternatives or a refund.
      </p>
      <p class="main-title">2. Order Confirmation</p>
      <p class="mb-6">
        After placing your order, you will receive an order confirmation email,
        which includes the details of your purchase (order number, items
        purchased, and shipping information).
      </p>
      <p class="mb-6">
        This confirmation does not constitute acceptance of your order but is an
        acknowledgment that we have received your request.
      </p>
      <p class="main-title">3. Payment</p>
      <p class="mb-6">
        Accepted Payment Methods: We accept a variety of payment methods,
        including but not limited to credit cards (Visa, MasterCard, etc.),
        debit cards, and secure online payment platforms. Payment will be
        processed at the time of order placement.
      </p>
      <p class="mb-6">
        Payment Authorization: All payments are subject to authorization by the
        payment processor. If your payment is declined or authorized for a lower
        amount, we will inform you immediately, and your order will not be
        processed.
      </p>
      <p class="mb-6">Currency: All transactions are processed in INR.</p>
      <p class="main-title">4. Order Fulfillment and Shipping</p>
      <p class="mb-6">
        Processing Time: Orders are typically processed within 3- 7 days,
        subject to product availability and order volume. You will receive an
        email notification when your order has been shipped.
      </p>
      <p class="mb-6">
        Shipping Methods and Costs: Shipping fees are calculated at checkout
        based on your location, the size of your order, and the shipping method
        chosen. We offer various shipping options, including standard and
        expedited shipping.
      </p>
      <p class="mb-6">
        Delivery Time: Estimated delivery times will be provided at checkout.
        Delivery times may vary based on your location, shipping method, and
        external factors such as customs processing or unforeseen delays.
      </p>
      <p class="mb-6">
        Order Tracking: Once your order has shipped, you will receive tracking
        information to monitor its progress. You can track your order on our
        website or via the courier service used
      </p>
      <p class="main-title">5. Order Modifications</p>
      <p class="mb-6">
        Before Shipment: If you need to make changes to your order (e.g., change
        the shipping address, modify item quantities, or cancel an item), please
        contact us immediately. We will do our best to accommodate any changes,
        but please note that once an order is processed for shipment,
        modifications may not be possible.
      </p>
      <p class="mb-6">
        After Shipment: Once an order has been shipped, it is considered final,
        and any modifications will require following our return and exchange
        procedures.
      </p>
      <p class="main-title">6. Cancellations</p>
      <p class="mb-6">
        Before Shipment: Orders can be canceled before shipment. To cancel an
        order, please contact us as soon as possible. We will process the
        cancellation and issue a full refund, subject to order status.
      </p>
      <p class="mb-6">
        After Shipment: Once your order has shipped, cancellation is no longer
        possible, and you will need to follow our return or exchange policy for
        eligible items.
      </p>
      <p class="main-title">7. Return and Refund Policy</p>
      <p class="mb-6">
        Returns: If you are not satisfied with your purchase, we accept returns
        within 7 days from the delivery date, subject to our Return Policy.
        Items must be in their original condition, unworn, unwashed, and with
        original tags intact.
      </p>
      <p class="mb-6">
        Refunds: Upon receiving and inspecting the returned item, we will
        process a refund to your original payment method. Refunds will typically
        be processed within 14 business days.
      </p>
      <p class="mb-6">
        Non-Refundable Items: Sale items, clearance items, personalized or
        customized products, and used or damaged items (unless due to
        manufacturing defects) are not eligible for a refund.
      </p>
      <p class="main-title">8. Order Disputes</p>
      <p class="mb-6">
        If there are any issues or disputes regarding your order (such as
        incorrect items, missing items, or delays), please contact us within 7
        days of delivery. We will investigate the issue and resolve it promptly.
      </p>
      <p class="main-title">9. Privacy and Security</p>
      <p class="mb-6">
        Privacy Protection: We respect your privacy. All personal and payment
        information provided during the order process is securely processed and
        stored in accordance with our Privacy Policy.
      </p>
      <p class="mb-6">
        Data Security: We use encryption and other security measures to ensure
        your data is protected when placing an order on our website.
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
