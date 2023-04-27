<template>
  <div>
    <div>
      <img src="../images/Tklogo.jpeg" height="100" width="100" />
    </div>
    <div class="loginCard">
      <h1>Login Page</h1>
      <p v-if="!valido" class="logError">
        Ingrese un Dni Valido y/o contraseña
      </p>
      <form action="" class="form" @submit.prevent="login">
        <div class="form_field">
          <label>DNI: </label>
          <input
            v-model="alumno.id"
            type="text"
            id="id"
            required
            placeholder="INGRESE DNI"
          />
        </div>
        <div class="form_field">
          <label>PASSWORD: </label>
          <input
            v-model="alumno.password"
            type="password"
            id="password"
            required
            placeholder="PASSWORD"
          />
        </div>
        <div>
          <input type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
  </div>
  <RouterLink class="route" to="/">
    <vue-feather type="home" stroke="white"></vue-feather>
  </RouterLink>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import userInterface from "../types/userInterface";
import { computed } from "@vue/reactivity";
import router from "@/router";
import getdata from "@/helpers/helper";
const alumno = reactive({ id: "", password: "" } as userInterface);
const datosal = reactive({
  DNI: "",
});
const valido = ref(true);
function login(): void {
  getdata(alumno.id).then((img) => {
    setTimeout(() => {
      datosal.DNI = img.data[0].DNI;
      if (validar.value) {
        router.push(`/matricula/${parseInt(datosal.DNI, 10).toString(16)}  `);
      } else {
        alert("Verifique los datos");
        alumno.id = "";
        alumno.password = "";
        valido.value = false;
      }
    }, 1000);
  });
}
const validar = computed<boolean>(() => {
  const flag = ref(false);
  if (alumno.id === alumno.password && alumno.id.length === 8) {
    if (alumno.id == datosal.DNI) {
      flag.value = true;
    }
  }
  return flag.value;
});
</script>

<style scoped>
header {
  background-color: darkcyan;
}
img {
  border-radius: 50px;
  margin: 10px 10px 10px 10px;
}
.loginCard {
  border-color: black;
  border-radius: 5px;
  border-width: thick;
  border-style: groove;
  padding: 50px;
  width: fit-content;
}
.form_field {
  flex-direction: row;
  align-content: space-around;
  padding: 10px 10px 10px 10px;
}
.logError {
  color: red;
}
label {
  display: block;
  position: relative;
  width: auto;
  top: 10px;
  padding: 5px 5px;
  border-radius: 20px;
  color: white;
  border: 1px white dashed;
  background-color: teal;
}
input {
  display: block;
  width: auto;
  border-radius: 20px;
  border-style: none;
  border-bottom: 1px solid white;
  padding: 15px 10px;
  font-size: 18px;
  color: white;
  text-align: center;
}
input::placeholder {
  text-align: center;
  font-style: italic;
  font-weight: lighter;
  color: lightgray;
}
input[type="submit"] {
  color: white;
  font-size: medium;
  border: solid white 2px;
}
input[type="submit"]:hover {
  border: 3px dashed white;
  font-size: x-large;
}
.route {
  display: inline-block;
  padding: 10px;
  border: thick solid black;
  border-radius: 15px;
  margin: 15px 15px 15px 15px;
  text-decoration: none;
  color: white;
  font-weight: bolder;
  font-size: large;
}
.route:hover {
  display: inline-block;
  padding: 10px;
  border: thick solid white;
  border-radius: 15px;
  margin: 15px 15px 15px 15px;
  color: blue;
  font-weight: bolder;
  font-size: large;
}
</style>
