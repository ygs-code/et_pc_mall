<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <div class="contact-top-wrap">
                    <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
                    <i class="line"></i>
                    <span class="contact-nav">Terms and conditions</span>
                </div>
                <div class="contact-title">
                    Terms & Conditions
                </div>
            </div>
        </div>
        <div class="wrapper_1200 content-wrap">
            <p class="main-title">Terms and Conditions for Jayshree Communication</p>
            <p class="main-content">Welcome to Jayshree Communication. By accessing or using our website, you agree to
                comply with and be bound by the following terms and conditions. Please read these carefully before using
                our services. If you do not agree with any part of these terms, please do not use our website.</p>
            <div>
                <p class="list-title">1. Introduction</p>
                <p>These Terms and Conditions govern your use of Jayshree Communication’s website and services. By using
                    our website, you acknowledge that you have read, understood, and agree to comply with these terms.
                </p>
                <!-- <ul class="ul-list">
                    <li class="item" v-for="(item, index) in ulList" :key="index">
                        <i class="dot"></i>
                        <span>{{ item.text }}</span>
                    </li>
                </ul> -->
            </div>
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
                    text: 'Your name, email address, phone number, shipping address, and payment details.'
                },
                {
                    text: 'Information about the products you purchase, including order number and payment method.'
                },
                {
                    text: 'We may collect information such as your IP address, browser type, the pages of our website that you visit, and the date and time of your visit.'
                },
                {
                    text: "we may use cookies to enhance your browsing experience. Cookies help us track your preferences and improve our website's functionality."
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
