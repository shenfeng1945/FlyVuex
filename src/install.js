import {assert} from './utils';

export let _Vue;

export default function install(Vue){
  const version = Number(Vue.version.split('.')[0]);
  assert(version >= 2, 'Only supports Vuejs 2 or higher');
  if(install.installed){
    return;
  }
  install.installed = true;

  _Vue = Vue;

  // 将初始化Vue实例时传入的modules设置到this对象的$modules属性上
  // 子组件则从父组件引用$modules属性，层层嵌套进行设置
  // 这样任何一个组件都能通过this.$modules的方式访问modules对象了
  Vue.mixin({
    beforeCreate(){
      const options = this.$options;
      if(options.modules){
        this.$modules = options.modules;
      }else if(options.parent && options.parent.$modules){
        this.$modules = options.parent.$modules;
      }
    }
  })
}
