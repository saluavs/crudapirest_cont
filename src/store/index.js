import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patient: {
      nombre: '',
      correo: '',
      edad: '',
      id:'',
    },
    edit: false,
    patients:[],
    loading: false
  },
  mutations: {
    getPatients(state, datos) {
      state.patients = datos;
      state.loading = false;
    },

    loadingTable(state) {
      state.loading = true;
    }
  },
  actions: {
    getPatients(context) {
      context.commit('loadingTable');
      axios.get('https://test-2dec2-default-rtdb.firebaseio.com/patients.json')
        .then((accept) => {
          let data = accept.data
          let datos = []
        Object.values(data).forEach((patient,index)=>{
          patient.id = Object.keys(data)[index]
          datos.push(patient)
        })
        console.log(datos)
        context.commit('getPatients',datos)
        });
    }
  }
})
