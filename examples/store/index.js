import FlyVuex,{Modules} from 'FlyVuex';
import Vue from 'vue';
import counter from './counter';

Vue.use(FlyVuex);

const modules = new Modules({
  counter
})

export default Modules



