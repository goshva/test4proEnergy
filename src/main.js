import Vue from "vue";
import App from './App.vue'

import "vue-easytable/libs/theme-default/index.css";

import VueEasytable from "vue-easytable";

import { VePagination } from "vue-easytable";

Vue.use(VePagination);

Vue.use(VueEasytable);

new Vue({
  el: "#app",
  render: (h) => h(App),
});