<template>
    <div class="contact-us-wrapper">
        <div class="contact-title-wrap">
            <div class="wrapper_1200">
                <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                <i></i>
                <span>Contact</span>
            </div>
        </div>
        <div class="wrapper_1200">
            <el-row :gutter="1">
                <el-col :span="15">
                    <div class="form-wrap">
                        <div class="form-title-wrap">
                            <p class="form-title">We would love to hear from you.</p>
                            <p class="r-text">lf you've got great products your making or looking to work with us then
                                drop
                                us a line.</p>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"
                            class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="Name" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="Phone" prop="phone">
                                        <el-input v-model="ruleForm.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item class="message" label="Your Message" prop="message" label-width="130px">
                                <el-input type="textarea" :rows="4" v-model="ruleForm.message"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit">Send Message</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="8" :offset="1">
                    <div class="right-wrap">
                        <div>
                            <h4 class="r-title">Our Address</h4>
                            <p class="r-text r-address">{{ $t(`page.index.address`) }}</p>
                            <p class="r-text">400-2647-3947</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
// AMAB - ZS
export default {
    name: "user",
    auth: "guest",
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
    async asyncData({ app, query, error }) {
        try {
            let data = await app.$axios.get(
                "/api/front/user/menu/user"
            );
            return {
                menuCur: query.menuCur || 111,
                menus: data.data.routine_my_menus
            };
        }
        catch (e) {
            error({ statusCode: 401, msg: typeof e === 'string' ? e : '系统繁忙' });
        }
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                this.menuCur = val.query.menuCur || 111;
            },
            // 深度观察监听
            deep: true
        },
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
    /* padding-top: 100px; */

    .contact-title-wrap {
        height: 205px;
        padding: 40px 0;
        background-color: #f8f8f8;
        margin-bottom: 80px;
    }

    .r-title {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .form-title-wrap {
        margin-bottom: 30px;
    }

    .form-title {
        font-size: 28px;
        margin-bottom: 10px
    }

    .r-address {
        margin-bottom: 10px;
    }

    .r-text {
        font-size: 16px;
        color: #777;
    }
}
</style>
