//AMBA-注释
import Vue from 'vue';
import * as filters from '../utils/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
