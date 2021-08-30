<template>
  <div id="login">
    <img src="../assets/logo.png" class="img-inicial" />
    <el-form label-width="100px" class="form-login" :model="formLabelAlign">
      <el-input
        placeholder="Correo electrónico"
        v-model="formLabelAlign.user"
      ></el-input>
      <el-input
        type="password"
        placeholder="Contraseña"
        v-model="formLabelAlign.password"
        autocomplete="off"
      ></el-input>
      <el-button type="primary" class="ingresar-login" @click="login"
        >Ingresar</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Firebase from "firebase";
Firebase.initializeApp(FirebaseConfig);
import FirebaseConfig from "@/configs/Firebase";
// import 'firebase/auth'
import { Message } from "element-ui";

export default {
  data() {
    return {
      formLabelAlign: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      Firebase.auth()
        .signInWithEmailAndPassword(
          this.formLabelAlign.user,
          this.formLabelAlign.password
        )
        .then(
          accept => {
            this.$router.push("home");
          },
          reject => {
            this.$message({
              showClose: true,
              message: reject.message,
              type: "error"
            });
          }
        );
    }
  }
};
</script>

<style lang="css" scoped>
#login {
  padding: 60px;
}

.ingresar-login {
  width: 100%;
}

.img-inicial,
.form-login {
  display: block;

  margin: auto;
}

.form-login {
  width: 300px;
}

.el-input {
  margin-bottom: 10px;
}
</style>
