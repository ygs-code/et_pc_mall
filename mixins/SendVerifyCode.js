//AMBA-注释
export default {
  data() {
    return {
      disabled: false,
      text: "GET OTP"
    };
  },
  methods: {
    sendCode() {
      if (this.disabled) return;
      this.disabled = true;
      let n = 60;
      this.text = " " + n + "s";
      const run = setInterval(() => {
        n = n - 1;
        if (n < 0) {
          clearInterval(run);
        }
        this.text = " " + n + "s";
        if (this.text < " " + 0 + "s") {
          this.disabled = false;
          this.text = "Retrieve";
        }
      }, 1000);
    }
  }
};
