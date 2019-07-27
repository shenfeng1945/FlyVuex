import {_Vue} from './install';
import {assert, isObject, isOwn} from './utils';

export let _root;

export class Modules {
  constructor(modules){
    assert(_Vue, 'must')
    assert(this instanceof Modules, 'Modules must be called with new operator')
    assert(isObject(modules), 'modules must be a plain object')

    _root = this;
    this._modules = modules;
    // 每个store模块的namespace集合
    this._modulesNameSpaces = [];

    this._rootState = Object.create(null);

    // {A: {namespace: 'A', state: ''}, B: {namespace: 'B', actions: {}}}
    this._modulesNamespaceMap = Object.create(null);

    // {namespace: 'couner', state: {number: 1}}
    // 转换为
    // {'counter.number': 1}
    this._namespaceStates = Object.create(null);
    this._namespaceActions = Object.create(null);

    this._initNamespaceModules();
    this._initNamespaceStates();
    this._initNamespaceActions();
    this._init(_root);
    console.log(this)
  }
  _init(_root){
    _root.getters = {};

    this._modulesNameSpaces.forEach(namespace => {
      const module = this._modulesNamespaceMap[namespace];
      const {state} = module;
      this._rootState[namespace] = state;
      Object.keys(state).forEach(key => {
        _root.getters[`${namespace}.${key}`] = function(){
          return state[key]
        }
      })
    })

    _root._vm = new _Vue({
      data: {
        $state: this._rootState
      },
    })
  }

  _initNamespaceActions(){
    this._modulesNameSpaces.forEach(namespace => {
      const module = this._modulesNamespaceMap[namespace];
      const {actions, state} = module;

      assert(isObject(actions), `the actions of the module names ${namespace} must be a plain object`)

      Object.keys(actions).forEach(key => {
        this._namespaceActions[`${namespace}.${key}`] = function(payload){
          let res = actions[key].call(module, state, payload);
          res = Promise.resolve(res);
          // 通知更新

          return res
        }
      })
    })
  }

  _initNamespaceStates(){
    this._modulesNameSpaces.forEach(namespace => {
      const {state} = this._modulesNamespaceMap[namespace];

      assert(isObject(state),`the state of the module names ${namespace} must be a plain object`)
      Object.keys(state).forEach(key => {
        assert(!isOwn(this._namespaceStates, `${namespace}.${key}`), `the ${key} of the state object in the module named ${namespace} has been duplicate declaration`)
        this._namespaceStates[`${namespace}.${key}`] = state[key];
      })
    })
  }

  _initNamespaceModules(){
    Object.keys(this._modules).forEach(key => {
      const namespace = this._modules[key].namespace;
      const module = this._modules[key];

      assert(!isOwn(this._modulesNamespaceMap, namespace), `the module key ${namespace} has been duplicate declaration.`)
      assert(namespace, `the namespace of ${key} module must be defined`)
      assert(typeof namespace === 'string', `the namespace of ${key} module must be a string`)
      this._modulesNamespaceMap[namespace] = module;
      this._modulesNameSpaces.push(namespace)
    })
  }
}
