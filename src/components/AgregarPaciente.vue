<template>
  <el-form inline :model="patient" class="demo-form-inline">
    <el-form-item label="Nombre">
      <el-input v-model="patient.nombre" placeholder="Nombre"></el-input>
    </el-form-item>

    <el-form-item label="Correo">
      <el-input v-model="patient.correo" placeholder="Correo"></el-input>
    </el-form-item>

    <el-form-item label="Edad">
      <el-input v-model="patient.edad" placeholder="Edad"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        v-if="edit"
        :loading="loading"
        @click="editPatient"
        >Editar</el-button
      >

      <el-button type="primary" v-else :loading="loading" @click="addPatient"
        >Agregar</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Firebase from "firebase";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { Message } from "element-ui";

export default {
  data() {
    return {
      loading: false
    };
  },

  methods: {
    // creacion
    addPatient() {
      if (
        this.patient.nombre != "" &&
        this.patient.correo != "" &&
        this.patient.edad != ""
      ) {
        // lleno mi objeto para ser cargado en la petición
        let patient = {
          nombre: this.patient.nombre,
          correo: this.patient.correo,
          edad: this.patient.edad
        };

        this.loading = true;
        axios
          .post(
            "https://test-2dec2-default-rtdb.firebaseio.com/patients.json",
            this.patient
          )
          .then(accept => {
            this.loading = false;
            this.$store.dispatch("getPatients");
            (this.patient.nombre = ""),
              (this.patient.correo = ""),
              (this.patient.edad = "");
          });
      } else {
        this.$message({
          showClose: true,
          message: "Debe llenar todos los campos",
          type: "error"
        });
      }
    },

    //edicion
    editPatient() {
      let patient = {
        nombre: this.patient.nombre,
        correo: this.patient.correo,
        edad: this.patient.edad
      };

      this.loading = true;

      axios
        .put(
          `https://test-2dec2-default-rtdb.firebaseio.com/patients/${this.patient.id}.json`, patient)
        .then((accept) => {
          this.loading = false;
          this.$store.dispatch("getPatients");
          // limpiar campos
          (this.patient.nombre = ""),
            (this.patient.correo = ""),
            (this.patient.edad = "");

        });
    },
  },

  computed: {
    ...mapState(["patient", "edit"])
  }
};
</script>
