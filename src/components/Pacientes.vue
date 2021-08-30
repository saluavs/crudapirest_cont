<template>
  <div>
    <el-button type="primary" @click="add">Agregar</el-button>

    <el-table v-loading="loading" :data="patientList" style="width: 100%">
      {{ patientList }}
      <el-table-column prop="nombre" label="Nombre" width="180">
      </el-table-column>

      <el-table-column prop="correo" label="Correo" width="180">
      </el-table-column>

      <el-table-column prop="edad" label="Edad"> </el-table-column>

      <el-table-column fixed="right" label="Operaciones" width="120">
        <span slot-scope="scope">
          <el-button @click="toDelete(scope.row['id'])" type="text" size="small"
            >Eliminar</el-button
          >

          <el-button @click="edit(scope.row)" type="text" size="small"
            >Editar</el-button
          >
        </span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Firebase from "firebase";
import { mapState } from "vuex";
import axios from "axios";

export default {
  mounted() {
    this.cargaTabla();
  },
  methods: {
    cargaTabla() {
      this.$store.dispatch("getPatients");
    },
    //método borrar
    toDelete(id) {
      console.log(id);
      axios
        .delete(
          `https://test-2dec2-default-rtdb.firebaseio.com/patients/${id}.json`
        )
        .then(accept => {
          let datos = accept.data;
          console.log(datos);
          this.cargaTabla();
        });
    },
    //método editar
    edit(row) {
      this.$store.state.edit = true;
      this.$store.state.patient = row;
      console.log((this.$store.state.patient = row));
    },
    //método agregar
    add() {
      this.$store.state.edit = false;
      this.$store.state.patient = {};
    }
  },
  computed: {
    ...mapState(["patients", "loading"]),

    patientList() {
      return Object.values(this.patients);
    }
  }
};
</script>
