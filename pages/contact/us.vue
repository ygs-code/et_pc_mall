<template>
  <div class="contact-us-wrapper">
    <div class="contact-title-wrap">
      <div class="wrapper_1200">
        <div class="contact-top-wrap">
          <nuxt-link class="home-nav" :to="{ path: '/' }">Home</nuxt-link>
          <i class="line"></i>
          <span class="contact-nav">Contact</span>
        </div>
        <div class="contact-title">Contact With Us</div>
      </div>
    </div>
    <div class="wrapper_1200">
      <el-row :gutter="1">
        <el-col :span="15">
          <div class="form-wrap">
            <div class="form-title-wrap">
              <p class="form-title">We would love to hear from you.</p>
              <p class="r-text">
                lf you've got great products your making or looking to work with
                us then drop us a line.
              </p>
            </div>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >
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
              <el-form-item
                class="message"
                label="Your Message"
                prop="message"
                label-width="130px"
              >
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="ruleForm.message"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit"
                  >Send Message</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" :offset="1">
          <div class="right-wrap">
            <!-- <div>
                <h4 class="r-title">Our Address</h4>
                <p class="r-text r-address">{{ $t(`page.index.address`) }}</p>
                <p class="r-text">400-2647-3947</p>
              </div> -->
            <div
              class="info-item"
              v-for="(item, index) in infoList"
              :key="index"
            >
              <span>{{ item.label }}</span>
              <span class="r-text">{{ item.text }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "us",
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
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "please input phone", trigger: "blur" },
        ],
        email: [
          { required: true, message: "please input email", trigger: "blur" },
        ],
      },
      infoList: [
        {
          label: "Name:",
          text: "Amba Homes Pvt. Ltd",
        },
        {
          label: "Address:",
          text: "Plot no-91, Cabin No 2, Gram Sabha, Sevak Park, Uttam Nagar, New Delhi",
        },
        {
          label: "Phone:",
          text: "+91-7413848770",
        },
        {
          label: "Email:",
          text: "support@ambahome.in",
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
  .contact-title-wrap {
    height: 205px;
    padding: 40px 0;
    background-color: #f8f8f8;
    margin-bottom: 80px;

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

  .r-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-title-wrap {
    margin-bottom: 30px;
  }

  .form-title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .r-address {
    margin-bottom: 10px;
  }

  .r-text {
    font-size: 16px;
    color: #777;
  }
  .info-item {
    font-size: 16px;
    margin-bottom: 26px;
  }
}
</style>
