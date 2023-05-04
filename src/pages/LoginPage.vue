<template>
  <div>
    <div>
      <img src="../images/Tklogo.jpeg" height="100" width="100" />
    </div>
    <div>
      <h1>Login Page</h1>
      <form action="" class="login-form" @submit.prevent="login">
        <p v-if="!valido" class="logError">
          Ingrese un Dni Valido y/o contraseña
        </p>
        <div>
          <label class="label-email">
            <input
              v-model="alumno.id"
              type="text"
              id="id"
              required
              placeholder="INGRESE DNI"
              tabindex="1"
            />
            <span class="required"> DNI: </span>
          </label>
        </div>
        <input
          type="checkbox"
          name="show-password"
          class="show-password a11y-hidden"
          id="show-password"
          tabindex="3"
        />
        <label class="label-show-password" for="show-password">
          <span>Show Password</span>
        </label>
        <div>
          <label class="label-password">
            <input
              v-model="alumno.password"
              type="text"
              name="password"
              id="password"
              required
              placeholder="PASSWORD"
              tabindex="2"
            />
            <span class="required"> CONTRASEÑA:</span>
          </label>
        </div>
        <div>
          <input type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
  </div>
  <ul>
    <li>
      <RouterLink to="/">
        <vue-feather type="home" stroke="black"></vue-feather>
      </RouterLink>
      <span></span><span></span><span></span><span></span>
    </li>
    <li @click="open">
      Registrarse
      <span></span><span></span><span></span><span></span>
    </li>
  </ul>
  <ModalsContainer />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import userInterface from "../types/userInterface";
import { computed } from "@vue/reactivity";
import router from "@/router";
import getdata from "@/API/helper";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalRegistrarAlumno from "@/components/ModalRegistrarAlumno.vue";

const alumno = reactive({ id: "", password: "" } as userInterface);
const datosal = reactive({
  DNI: "",
});
const valido = ref(true);
const { open, close } = useModal({
  component: ModalRegistrarAlumno,
  attrs: {
    onSubmit(formData) {
      postJSON(formData);

      close();
    },
  },
});
function login(): void {
  getdata(alumno.id).then((img) => {
    setTimeout(() => {
      datosal.DNI = img.data[0].DNI;
      console.log(datosal.DNI);
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
async function postJSON(data: object) {
  try {
    const response = await fetch("https://retoolapi.dev/k7LL5B/Alumnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<style scoped>
header {
  background-color: darkcyan;
}
img {
  border-radius: 50px;
  margin: 10px 10px 10px 10px;
}
.logError {
  font-size: 0.825rem;
  color: red;
}

form {
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

form .email,
form .email a {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.825rem;
  order: 4;
  text-align: center;
  margin-top: 0.25rem;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  display: inline;
}

form a:hover {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  transition: color 0.25s;
}

form a:focus {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

form > div {
  order: 2;
}

label {
  display: flex;
  flex-direction: column;
}

.label-show-password {
  order: 3;
}

label > span {
  color: var(--borderDarker);
  display: block;
  font-size: 0.825rem;
  margin-top: 0.625rem;
  order: 1;
  transition: all 0.25s;
}

label > span.required::after {
  content: "*";
  color: #dd6666;
  margin-left: 0.125rem;
}

label input {
  order: 2;
  outline: none;
}

label input::placeholder {
  color: var(--borderDark);
}

label input[name="password"] {
  -webkit-text-security: disc;
}

input[name="show-password"]:checked ~ div label input[name="password"] {
  -webkit-text-security: none;
}

label:hover span {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

input[type="checkbox"] + div label:hover span::before,
label:hover input.text {
  border-color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

label input.text:focus,
label input.text:active {
  border-color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  box-shadow: 0 1px
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
}

input.text:focus + span,
input.text:active + span {
  color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
}

input {
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-sizing: border-box;
  font-size: 1rem;
  height: 2.25rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  order: 2;
  padding: 0.25rem 0.5rem;
  width: 15rem;
  transition: all 0.25s;
}

input[type="submit"] {
  color: hsl(var(--bgColorH), var(--bgColorS), var(--bgColorL));
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.625rem;
  order: 4;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  padding-left: 0;
  text-transform: uppercase;
}

input[type="checkbox"]:focus + label span::before,
input[type="submit"]:focus {
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

input[type="submit"]:focus {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type="submit"]:hover {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type="submit"]:active {
  background: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  transition: all 0.125s;
}

/** Checkbox styling */
.a11y-hidden {
  position: absolute;
  top: -1000em;
  left: -1000em;
}

input[type="checkbox"] + label span {
  padding-left: 1.25rem;
  position: relative;
}

input[type="checkbox"] + label span::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
}

input[type="checkbox"]:checked + label span::after {
  content: "";
  display: block;
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 0.375rem;
  height: 0.375rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul li {
  --c: #306090;
  color: var(--c);
  font-size: 16px;
  border: 0.3em solid var(--c);
  border-radius: 0.5em;
  width: 12em;
  height: 3em;
  text-transform: uppercase;
  font-weight: bold;
  font-family: sans-serif;
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 3em;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  margin: 1em;
  margin-left: 2.5rem;
}

ul li span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: var(--c);
  transform: translateY(150%);
  border-radius: 50%;
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  transition-delay: calc((var(--n) - 1) * 0.1s);
  z-index: -1;
}

ul li:hover {
  color: black;
}

ul li:hover span {
  transform: translateY(0) scale(2);
}

ul li span:nth-child(1) {
  --n: 1;
}

ul li span:nth-child(2) {
  --n: 2;
}

ul li span:nth-child(3) {
  --n: 3;
}
ul li span:nth-child(4) {
  --n: 4;
}
</style>
