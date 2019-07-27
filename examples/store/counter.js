const counter = {
  namespace: 'counter',
  state: {
    number: 1,
  },
  actions: {
    add(state, payload){
      state.number += 1;
    }
  }
}

export default counter;
