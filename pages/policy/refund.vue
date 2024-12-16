<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <div class="contact-top-wrap">
                    <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
                    <i class="line"></i>
                    <span class="contact-nav">Return and Refund</span>
                </div>
                <div class="contact-title">
                    Return and Refund
                </div>
            </div>
        </div>
        <div class="wrapper_1200 content-wrap">
            <p class="main-content">
                Thank you for shopping at Amba Homes. We want you to be completely satisfied with your purchase. If for
                any reason you are not happy with your order, we're here to help. Please review our refund and
                cancellation policy below:
            </p>
            <!-- <p class="main-title">1. Order Cancellation</p> -->
            <!-- <p class="main-content">
                The idea for Amba Homes was born out of our own challenges with online shopping. As everyday consumers,
                we were frustrated by products that didn’t match expectations, long wait times, and the lack of personal
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
            <p class="main-title">1. Order Cancellation</p>
            <p class="mb-6">
                Before Shipment: If you wish to cancel your order, please contact us as soon as possible. Orders can
                only be canceled before they are shipped. Once an order has been processed and shipped, it cannot be
                canceled.
            </p>
            <p class="mb-6">
                How to Cancel: To cancel an order, please email us with your order number. We'll do our best to
                accommodate your request.
            </p>
            <p class="main-title">2. Refund Policy</p>
            <p class="mb-6">
                We accept returns on most items within 7 days of the delivery date, subject to the conditions outlined
                below.
            </p>
            <p class="mb-6">
                Eligible for Return/Refund:
            </p>
            <p class="mb-6 pl-20" v-for="(item, index) in eligible" :key="index">{{ item.text }}</p>
            <p class="mb-6">
                If your item falls under one of the following categories, it is not eligible for a refund: Items that
                have been damaged, altered, or used (unless due to manufacturing defect).
            </p>
            <p class="main-title">Return Process:</p>
            <p class="mb-6">Initiate a Return: Contact us at within 7 days of receiving your order. Please provide your
                order number and the reason for the return.</p>
            <p class="mb-6">Return Instructions: After we confirm your return, we will send you detailed instructions on
                how to return your item, including the return address.</p>
            <p class="mb-6">Shipping Costs:</p>
            <p class="mb-6 pl-20">Domestic Returns: You are responsible for the return shipping fees unless the item is
                defective or damaged.</p>
            <p class="mb-6">Refund Processing: After we receive your returned item, we will inspect it and process your
                refund. Refunds will be credited back to your original payment method within 14 business days.</p>
            <p class="main-title">Partial Refunds:</p>
            <p class="mb-6">If the item is returned in used or damaged condition (beyond normal wear and tear), we
                reserve the right to offer a partial refund or no refund at all.</p>
            <p class="main-title">3. Damaged or Defective Items</p>
            <p class="mb-6">If you receive a damaged or defective item, please contact us within 5 days of delivery.
                Provide clear photos of the damage or defect and your order number.</p>
            <p class="mb-6">We will cover the return shipping cost for defective or damaged items, and you will be
                eligible for a full refund or exchange.</p>
            <p class="main-title">4. Late or Missing Refunds</p>
            <p class="mb-6">If you haven’t received your refund after the specified processing time, please first check
                with your bank or credit card provider. It may take additional processing time before your refund is
                officially posted. If you’ve done all of this and still haven’t received your refund, please contact.
            </p>
            <p class="main-title">5. Non-Refundable Items</p>
            <p class="mb-6">ome health and personal care items.</p>
            <p class="mb-6">If some products are not mentioned in this part, we still reserve rights to not accept
                returns and provide refunds for the products that we are selling or sell in the future that do not fall
                under any category mentioned here. Due diligence will be applied when the customer initiates the return.
            </p>
            <p class="main-title">6. Customer Support</p>
            <p class="mb-6">If you have any questions or concerns about our refund and cancellation policy, please reach
                out to our customer support team.</p>
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
                    text: 'Customer Satisfaction: We’re here to serve you, not just sell to you. Your satisfaction is our priority, and we’re always ready to assist with any questions or concerns.'
                },
            ],
            eligible: [
                {
                    text: 'Cookware & Utensils: Must be unused and in original packaging.'
                },
                {
                    text: 'Clothing: Unworn, unwashed, and with original tags intact.'
                },
                {
                    text: 'Riff Raff & Other Merchandise: Unused and in original condition.'
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
        height: 205px;
        padding: 40px 0;
        background-color: #f8f8f8;
        margin-bottom: 80px;

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
