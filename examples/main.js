import Vue from 'vue';
import modules from './store/index';
import {mergeState, mergeActions} from 'FlyVuex';
new Vue({
  el: '#app',
  modules,
  data(){
      return {
      }
  },
  computed: {
    ...mergeState(['counter.number'])
  },
  methods: {
    ...mergeActions(['counter.add'])
  },
})
