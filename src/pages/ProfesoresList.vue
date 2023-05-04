<template>
  <div>
    <ul>
      <li>
        <router-link to="/mantenimiento">
          <vue-feather type="tool" stroke="black"></vue-feather>
        </router-link>
        <span></span><span></span><span></span><span></span>
      </li>
      <li @click="open">
        Agregar Profesor <span></span><span></span><span></span><span></span>
      </li>
    </ul>
    <ModalsContainer />
  </div>
  <h1>Lista de Profesores</h1>
  <div>
    <input
      class="filtro"
      v-model="filtro"
      @change="onCambio"
      placeholder="Filtro por DNI"
    />
  </div>
  <table>
    <tr class="header">
      <td>DNI</td>
      <td>NOMBRES</td>
      <td>APELLIDOS</td>
      <td>PROFESION</td>
      <td>FECHA DE NACIMIENTO</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="tabla" v-for="profesor in profesores" :key="profesor.id">
      <td>
        {{ profesor.DNI }}
      </td>
      <td>
        {{ profesor.FirstName }}
      </td>
      <td>
        {{ profesor.LastName }}
      </td>
      <td>
        {{ profesor.Profesion }}
      </td>
      <td>
        {{ profesor.FNacimiento }}
      </td>
      <td>
        <ul>
          <li @click="changeId(profesor.id), open()">
            Editar <span></span><span></span><span></span><span></span>
          </li>
        </ul>
        <ModalsContainer />
      </td>
      <td>
        <ul>
          <li @click="deleteJSON(profesor.id)">
            Eliminar <span></span><span></span><span></span><span></span>
          </li>
        </ul>
      </td>
    </tr>
  </table>
  <p v-if="profesores.length == 0">No Hay profes</p>
</template>

<script setup lang="ts">
import getprofesordata from "@/API/helperprofesor";
import { onMounted, ref } from "vue";
import profesorInterface from "@/types/profesorInterface";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalLoginForm from "@/components/ModalLoginForm.vue";

const idref = ref<string>("");
const edit = ref<boolean>(false);
const { open, close } = useModal({
  component: ModalLoginForm,
  attrs: {
    onOpened() {
      const key = parseInt(idref.value) - 1;
      if (!isNaN(key)) {
        edit.value = true;
        (document.getElementById("aDni") as HTMLInputElement).textContent =
          "DNI N° : " + profesores.value[key].DNI;
        (document.getElementById("aLastName") as HTMLInputElement).textContent =
          "Apellidos : " + profesores.value[key].LastName;
        (
          document.getElementById("aFirstName") as HTMLInputElement
        ).textContent = "Nombres : " + profesores.value[key].FirstName;
        (
          document.getElementById("aProfesion") as HTMLInputElement
        ).textContent = "Profesion : " + profesores.value[key].Profesion;
        (
          document.getElementById("nacimientoText") as HTMLInputElement
        ).textContent =
          "Fecha de Nacimiento : " + profesores.value[key].FNacimiento;
        (
          document.getElementById("comentario") as HTMLInputElement
        ).textContent =
          "Formulario de edicion reescriba los datos, o pulse fuera para salir de la pestaña";
      }
    },
    onSubmit(formData) {
      if (edit.value) {
        putJSON(formData, idref.value);
      } else {
        console.log(formData);
        postJSON(formData);
      }

      close();
    },
    onClosed() {
      idref.value = "";
      edit.value = false;
    },
  },
});

const filtro = ref<string>("");
const profesores = ref<profesorInterface[]>([]);

onMounted(() => {
  getprofesordata().then((lista) => {
    setTimeout(() => {
      profesores.value = lista.data;
    }, 0);
  });
});

function onCambio(): void {
  getprofesordata(filtro.value).then((lista) => {
    setTimeout(() => {
      profesores.value = lista.data;
    }, 0);
  });
}
function changeId(ind: string): void {
  idref.value = ind;
}

async function postJSON(data: object) {
  try {
    const response = await fetch("https://retoolapi.dev/dqtmRW/profesores", {
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

async function putJSON(data: object, id: string) {
  try {
    const response = await fetch(
      `https://retoolapi.dev/dqtmRW/profesores/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteJSON(id: string) {
  try {
    const response = await fetch(
      `https://retoolapi.dev/dqtmRW/profesores/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Ubuntu, sans-serif;
}
.filtro {
  border: solid black 2px;
  border-radius: 10px;
  width: 50%;
  padding: 10px;
  margin: 20px;
  color: black;
  display: block;
  margin-left: 25%;
}
.filtro::placeholder {
  color: black;
}
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  max-height: 700px;
  overflow-y: scroll;
  display: block;
  margin: 0.5rem;
}
.modal-table {
  background-color: lightgray;
  border-color: solid 1px black;
  border-collapse: collapse;
  width: 50%;
  margin: 0;
  padding: 0;
  display: block;
  margin-left: 25%;
  padding-left: 13%;
}
.modal-table td th {
  margin-left: 25%;
  border: 1px solid black;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: lightgray;
}

tr:hover {
  background-color: #ddd;
}

.header {
  color: #ddd;
  font-weight: bolder;
}

th {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background-color: #04aa6d;
  color: black;
  width: fit-content;
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
  margin-left: 35%;
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
td ul li {
  font-size: 8px;
  margin: 0;
}
</style>
