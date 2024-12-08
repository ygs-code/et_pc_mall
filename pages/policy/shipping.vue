<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <div class="contact-top-wrap">
                    <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
                    <i class="line"></i>
                    <span class="contact-nav">Shipping-policy</span>
                </div>
                <div class="contact-title">
                    Shipping Policy
                </div>
            </div>
        </div>
        <div class="wrapper_1200 content-wrap">
            <p class="main-title">Shipping Policy for Jayshree Communication</p>
            <p class="main-content">The orders for the user are shipped through registered domestic courier companies
                and/or speed post only. Orders are shipped within 7 days from the date of the order and/or payment or as
                per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject
                to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by
                the courier company / postal authority. Delivery of all orders will be made to the address provided by
                the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as
                specified at the time of registration. If there are any shipping cost(s) levied by the seller or the
                Platform Owner (as the case be), the same is not refundable.</p>
            <!-- <div>
                <p class="list-title">1. Returns</p>
                <p>If you are not satisfied with your product, you may return it under the following conditions:</p>
                <ul class="ul-list">
                    <li class="item" v-for="(item, index) in ulList" :key="index">
                        <i class="dot"></i>
                        <span>{{ item.text }}</span>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: "privacy",
    auth: false,
    data() {
        return {
            ulList: [
                {
                    text: 'To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.'
                },
                {
                    text: 'You have 10 days from the date of purchase to request a return'
                },
                {
                    text: 'Certain items are not eligible for return. These may include perishable goods, customized products, or items that have been clearly marked as "non-returnable" at the time of purchase.'
                }
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
    }
}
</script>
<style lang="scss" scoped>
.contact-us-wrapper {
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
            font-size: 40px;
            font-weight: bold;
        }
    }

    .content-wrap {
        color: #777;
        font-size: 16px;
    }

    .main-color {
        color: #3577f0;
    }

    .main-title {
        font-size: 24px;
        margin-top: 12px;
        margin-bottom: 20px;
        color: #000;
    }

    .main-content {
        font-size: 16px;
        margin-bottom: 30px;
    }

    .list-title {
        font-size: 24px;
        margin-bottom: 30px;
        color: #000;
    }

    .ul-list {
        /* list-style: disc; */
        margin-top: 30px;

        .item {
            margin-bottom: 12px;
        }

        .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #ddd;
            border-radius: 50%;
        }
    }

}
</style>
