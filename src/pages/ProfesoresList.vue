<template>
  <router-link class="route" to="/mantenimiento">
    <vue-feather type="tool" stroke="white"></vue-feather>
  </router-link>
  <button @click="open">Agregar Profesor</button>
  <ModalsContainer />
  <section>
    <h1>Lista de Profesores</h1>
    <input
      class="filtro"
      v-model="filtro"
      @change="onCambio"
      placeholder="Filtro por DNI"
    />
  </section>
  <table class="customers">
    <tr>
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
        <button @click="changeId(profesor.id), open()">Editar</button>
        <ModalsContainer />
      </td>
      <td>
        <button @click="deleteJSON(profesor.id)">Eliminar</button>
      </td>
    </tr>
  </table>
  <p v-if="profesores.length == 0">No Hay profes</p>
</template>

<script setup lang="ts">
import getprofesordata from "@/helpers/helperprofesor";
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
.filtro {
  border: solid white 2px;
  border-radius: 10px;
  width: 50%;
  padding: 10px;
  margin: 20px;
  color: #ddd;
}
.filtro::placeholder {
  color: #ddd;
}
.customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
}

.customers td,
.customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

.customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

.customers tr:hover {
  background-color: #ddd;
}

.customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

button {
  width: auto;
  border: solid white thick;
  border-radius: 10px;
  margin: auto;
  height: auto;
  color: white;
  font-weight: bolder;
  padding: 10px;
}
button:hover {
  width: auto;
  border: solid blue thick;
  border-radius: 10px;
  margin: auto;
  height: auto;
  color: blue;
  font-weight: bolder;
  padding: 10px;
}

.route {
  display: flex;
  width: fit-content;
  padding: 10px;
  border: thick solid white;
  border-radius: 10px;
  margin: auto;
  text-decoration: none;
  color: white;
  font-weight: bolder;
  font-size: large;
}
.route:hover {
  display: flex;
  padding: 10px;
  border: thick solid blue;
  border-radius: 15px;
  margin: auto;
  color: blue;
  font-weight: bolder;
  font-size: large;
}
</style>
