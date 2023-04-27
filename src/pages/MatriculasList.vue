<template>
  <router-link class="route" to="/mantenimiento">
    <vue-feather type="tool" stroke="white"></vue-feather>
  </router-link>
  <h1>Lista Matriculas</h1>
  <section>
    <input
      class="filtro"
      v-model="filtro"
      @change="onCambio"
      placeholder="Filtro por Alumno"
    />
  </section>
  <table class="customers">
    <tr>
      <td>Codigo</td>
      <td>Semestre</td>
      <td>Alumno</td>
      <td>Curso</td>
      <td>Aprobado</td>
      <td></td>
    </tr>
    <tr class="tabla" v-for="matricula in matriculas" :key="matricula.id">
      <td>
        {{ matricula.CodMatricula }}
      </td>
      <td>
        {{ matricula.Año + "-" + matricula.Semestre }}
      </td>
      <td>
        {{ matricula.Alumno }}
      </td>
      <td>
        {{ matricula.Curso }}
      </td>
      <td v-if="matricula.Aprobado">
        <vue-feather type="check" stroke="white"></vue-feather>
      </td>
      <td v-else>
        <vue-feather type="x" stroke="red"></vue-feather>
      </td>
      <td>
        <button @click="deleteJSON(matricula.id)">Eliminar</button>
      </td>
    </tr>
  </table>
  <p v-if="matriculas.length == 0">No Hay Cursos</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import getmatriculadata from "@/helpers/matriculahelper";
import matriculaInterface from "@/types/matriculaInterface";

const filtro = ref<string>("");
const matriculas = ref<matriculaInterface[]>([]);

onMounted(() => {
  getmatriculadata().then((lista) => {
    setTimeout(() => {
      matriculas.value = lista.data;
    }, 0);
  });
});

function onCambio(): void {
  getmatriculadata(filtro.value).then((lista) => {
    setTimeout(() => {
      matriculas.value = lista.data;
    }, 0);
  });
}

async function deleteJSON(id: string) {
  try {
    const response = await fetch(
      `https://retoolapi.dev/b8jz2L/matricula/${id}`,
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
</style>
