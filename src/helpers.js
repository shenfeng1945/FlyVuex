import {_root} from './modules';
import {assert, isObject, normalizeMap} from './utils';

/** 
 * @param ['namespace.number'] or {namespace: ''}   props
 */

export const mergeState = (props) => {
  const _validProps = Object.keys(_root._namespaceStates)
  let _propsValus;
  let res = {};

  if(Array.isArray(props)){
    _propsValus = props
  }else{
    assert(isObject(props), 'the parameter of mergeState must be a array or plain object')
    _propsValus = Object.values(props);
  }

  if(!_propsValus.length){
    return res;
  }

  // check all prop is valid
  _propsValus.forEach(prop => {
    assert(_validProps.includes(prop), `the ${prop} prop is invalid`)
  })

  normalizeMap(_propsValus).forEach(({key, val}) => {
  const k = key.indexOf('.') > -1 ? key.split('.')[1] : key;
    res[k] = function(){
      return _root.getters[key]()
    }
  })
  return res
}

export const mergeActions = actions => {
  const _validActions = Object.keys(_root._namespaceActions);
  let _actionValus;
  let res = {}

  if(Array.isArray(actions)){
    _actionValus = actions;
  }else{
    assert(isObject(actions), 'the parameter off mergeActions must be a array or plain object')
    _actionValus = Object.valus(actions);
  }

  if(!_actionValus.length){
    return res;
  }

  _actionValus.forEach(action => {
    assert(_validActions.includes(action), `the ${action} action is invalid`)
  })

  normalizeMap(actions).forEach(({key, val}) => {
    const k = key.indexOf('.') > -1 ? key.split('.')[1] : key;
    res[k] = function(...args){
      return _root._namespaceActions[val].apply(_root, [].concat(args))
    }
  })
  return res;
}
