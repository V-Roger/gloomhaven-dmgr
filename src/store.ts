import Vue from 'vue';
import Vuex from 'vuex';
import Foe from './models/Foe';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foes: {
      count: 0,
      types: [],
      killed: 0
    },
    damage: {
      suffered: 0,
      healed: 0,
    },
  },
  mutations: {
    addDamage(state): void {
      state.damage.suffered++
    },
    addHeal(state): void {
      state.damage.healed++
    },
    addFoe(state, foe: Foe): void {
      state.foes.count++
      if (!state.foes.types.includes(foe.type.name)) {
        state.foes.types.push(foe.type.name)
      }
    },
    killFoe(state): void {
      state.foes.killed++
    }
  },
  actions: {

  },
});
