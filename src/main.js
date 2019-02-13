// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import moment from "moment";
import VueLocalStorage from "vue-localstorage";
import "moment/locale/ro";
moment.locale("ro");

Vue.use(VueLocalStorage);

Vue.filter("formatDate", function(value, format) {
  if (!value) return "";
  return moment.unix(value / 1000).format(format);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  localStorage: {
    days: {
      type: Object,
      default: {}
    }
  },
  template: "<App/>",
  components: { App }
});
