<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <div class="contact-top-wrap">
                    <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
                    <i class="line"></i>
                    <span class="contact-nav">Shipping Policy</span>
                </div>
                <div class="contact-title">
                    Shipping Policy
                </div>
            </div>
        </div>
        <div class="wrapper_1200 content-wrap">
            <p class="main-content">
                Thank you for shopping with Amba Homes. We are committed to providing you with high-quality products and
                a seamless shopping experience. Our shipping policy outlines the details regarding the shipping of
                products purchased on our website.
            </p>
            <!-- <p class="main-title">1. Shipping Locations</p>
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
            <p class="main-title">1. Shipping Locations</p>
            <p class="main-content">
                We offer delivering our products across all states and major cities in India. While we strive to deliver
                to every corner of the country, certain remote areas may experience longer delivery times or may not be
                covered by our shipping partners. If your address is in a remote location, our team will reach out to
                you with further details.
            </p>
            <p class="main-title">2. Shipping Methods & Delivery Times</p>
            <p class="mb-6">We offer two main types of shipping:</p>
            <p class="mb-6 pl-20" v-for="(item, index) in shippingType" :key="index">{{ item.text }}</p>
            <p class="mb-6">Please note: Delivery times are estimates and can vary depending on your location, order
                volume, and external factors like weather or public holidays.</p>
            <p class="main-title">3. Shipping Charges</p>
            <p class="mb-6">Shipping charges depend on the weight of your order, the delivery location, and the shipping
                method chosen. The exact shipping cost will be calculated at checkout.</p>
            <p class="main-title">4. Third-Party Logistics (3PL)</p>
            <p class="mb-6">We partner with trusted logistics companies to ensure the safe and timely delivery of your
                orders. We strive to work with the best in the industry, but please note that delivery timelines may
                vary based on external factors.</p>
            <p class="main-title">5. Order Processing & Dispatch</p>
            <p class="mb-6">Orders are processed within 24hrs from the time the order is placed. Orders placed on
                weekends or public holidays will be processed on the next business day.</p>
            <p class="mb-6">Once your order is dispatched, you will receive a tracking number to monitor the progress of
                your shipment.</p>
            <p class="main-title">6. Shipping Delays</p>
            <p class="mb-6">We strive to fulfill orders within the specified delivery times. However, shipping delays
                can occasionally occur due to factors such as weather conditions, courier delays, or public holidays. In
                case of a delay, we will notify you via email or SMS.</p>
            <p class="mb-6">If you have not received your order within the estimated time frame, please feel free to
                contact us .</p>
            <p class="main-title">7. Address Verification</p>
            <p class="mb-6">Please ensure that the shipping address you provide is complete and accurate. We are not
                responsible for delays or delivery failures resulting from incorrect or incomplete addresses.</p>
            <p class="mb-6">Important: If the courier service is unable to deliver your package due to an incorrect
                address, or if the delivery is returned to us, you will be responsible for additional shipping costs to
                resend the item.</p>
            <p class="main-title">8. Order Tracking</p>
            <p class="mb-6">Once your order is shipped, we will provide a tracking number to the email address or phone
                number associated with your order. You can use this tracking number to monitor your package's journey
                via the logistics provider's website or app.</p>
            <p class="main-title">9. Damaged or Missing Items</p>
            <p class="mb-6">If your order arrives damaged or with missing items, please notify us within 12 hours of
                receiving the package. We will initiate an investigation with the logistics provider and offer a
                resolution, including a replacement or refund, based on the circumstances.</p>
            <p class="main-title">10. Returns & Exchanges</p>
            <p class="mb-6">Our Returns and Exchanges Policy can be found in the return policy page and provides details
                on how to return or exchange your items in the event they do not meet your expectations.</p>
            <p class="main-title">11. Customer Support</p>
            <p class="mb-6">If you have any questions or concerns regarding your order or shipping, our customer support
                team is here to help!</p>
            <p class="mb-6">Business Hours: Monday - Friday, 10:00 AM to 6:00 PM (IST)</p>
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
                name: '',
                phone: '',
                email: '',
                message: ''
            },
            ulList: [
                {
                    text: 'Quality: Our products are sourced from trusted manufacturers, ensuring you get the best quality at reasonable prices.'
                },
                {
                    text: 'Transparency: What you see is what you get. We believe in being clear about product details, delivery times, and prices — no hidden surprises.'
                },
                {
                    text: "Customer Satisfaction: We're here to serve you, not just sell to you. Your satisfaction is our priority, and we're always ready to assist with any questions or concerns."
                },
            ],
            shippingType: [
                {
                    text: 'Standard Shipping: Typically takes 5-7 business days, depending on the delivery location.'
                },
                {
                    text: 'Express Shipping: Delivered within 2-3 business days, available at an additional cost (subject to availability in your area).'
                },
            ]
        }
    },
    head() {
        return {
            title: ""
        }
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
                        message: 'you have send a message!',
                        type: 'success'
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        }
    }
}
</script>
<style lang="scss" scoped>
.contact-us-wrapper {
    font-size: 16px;

    .contact-title-wrap {
        height: 150px;
        padding: 40px 0;
        background-color: #f8f8f8;
        margin-bottom: 60px;

        .contact-top-wrap {}

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
