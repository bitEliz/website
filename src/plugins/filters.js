import Vue from "vue";
import marked from "marked";

Vue.filter("markup", marked);