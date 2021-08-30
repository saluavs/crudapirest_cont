<template>
  <el-container>
    <el-header style="text-align:center">
      M&oacute;dulo ajustes
      <el-button
        type="info"
        icon="el-icon-back"
        circle
        @click="logout"
        title="logout"
      ></el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-menu"></i>Men&uacute;</template
            >
            <el-submenu index="1-4">
              <template slot="title">Usuarios</template>
              <el-menu-item index="1-4-1">Mantenedor</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <AgregarPaciente></AgregarPaciente>
        <Pacientes></Pacientes>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Firebase from "firebase";
import AgregarPaciente from '@/components/AgregarPaciente';
import Pacientes from '@/components/Pacientes';


export default {
  components: {
    AgregarPaciente,
    Pacientes
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(accept => {
          this.$router.push("login");
        });
    }
  }
};
</script>

<style lang="css" scoped>
.el-header {
  background-color: #b3c0d1;

  color: #333;

  line-height: 60px;
}

.el-button {
  float: right;

  margin-top: 10px;

  background-color: #b3c0d1;

  color: #333;

  line-height: 20px;
}

.el-aside {
  color: #333;
}
</style>
