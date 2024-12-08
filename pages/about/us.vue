<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <div class="contact-top-wrap">
                    <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
                    <i class="line"></i>
                    <span class="contact-nav">About Us</span>
                </div>
                <div class="contact-title">
                    About Our Store
                </div>
            </div>
        </div>
        <div class="wrapper_1200 content-wrap">
            <p class="main-color">About Store</p>
            <p class="main-title">Online shopping includes both buying things online.</p>
            <p class="main-content">Welcome to Jayshree Communication, your one-stop destination for all your
                communication and
                electronic needs. Since our inception, we have been dedicated to offering top-quality products and
                exceptional customer service to help you stay connected in today’s fast-paced digital world.</p>
            <el-row :gutter="30">
                <el-col :span="12">
                    <p>
                        At Jayshree Communication, we specialize in a wide range of electronic gadgets, mobile
                        accessories, communication devices, and much more. Whether you're looking for the latest
                        smartphones, reliable routers, or high-performance accessories, we have carefully curated
                        products that meet the highest standards of quality and innovation.
                    </p>
                </el-col>
                <el-col :span="12">
                    <p>
                        Salesforce B2B Commerce offers buyers the seamless, self-service experience of online shopping
                        with all the B2B
                    </p>
                </el-col>
            </el-row>
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
            rules: {
                name: [
                    { required: true, message: 'please input name', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: 'please input phone', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'please input email', trigger: 'blur' }
                ],
            }
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
    }

    .main-color {
        color: #3577f0;
    }

    .main-title {
        font-size: 28px;
        margin-top: 12px;
        margin-bottom: 24px;
        font-weight: bold;
        color: #000;
    }

    .main-content {
        font-size: 20px;
        margin-bottom: 22px;
    }

}
</style>
