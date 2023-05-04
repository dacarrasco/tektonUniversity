<template>
  <DatosPersonales
    :DNI="alumno.DNI"
    :Nom="alumno.FirstName"
    :Ap="alumno.Lastname"
    :FNacimiento="alumno.Nacimiento"
    :Dir="alumno.direccion"
  />
  <h2>Semestre Activo: {{ año + "-" + Semestre }}</h2>
  <h2>Cursos Disponibles</h2>
  <table>
    <tr class="header">
      <td>Codigo</td>
      <td>Nombre</td>
      <td>Profesor A Cargo</td>
      <td></td>
    </tr>
    <tr v-for="curso in cursos" :key="curso.id">
      <td v-if="!cursosAprobados.includes(curso.CodCurso)">
        {{ curso.CodCurso }}
      </td>
      <td v-if="!cursosAprobados.includes(curso.CodCurso)">
        {{ curso.Nombre }}
      </td>
      <td v-if="!cursosAprobados.includes(curso.CodCurso)">
        {{ curso.Profesor_Cargo }}
      </td>
      <td v-if="!cursosAprobados.includes(curso.CodCurso)">
        <input type="checkbox" @click="hola(curso.CodCurso)" />
      </td>
    </tr>
  </table>
  <p v-if="!valid">Se require seleccionar al menos un elemento</p>
  <ul v-else>
    <li @click="show = true">
      Confirmar Matricula <span></span><span></span><span></span><span></span>
    </li>
  </ul>
  <ModalConfirm
    v-model="show"
    title="Confirmacion de matricula"
    @confirm="() => confirm()"
  >
    <table class="modal-table">
      <tr class="header">
        <td>Codigo</td>
        <td>Nombre</td>
        <td>Profesor A Cargo</td>
      </tr>
      <tr v-for="curso in cursos" :key="curso.id">
        <td v-if="cursosMatriculados.includes(curso.CodCurso)">
          {{ curso.CodCurso }}
        </td>
        <td v-if="cursosMatriculados.includes(curso.CodCurso)">
          {{ curso.Nombre }}
        </td>
        <td v-if="cursosMatriculados.includes(curso.CodCurso)">
          {{ curso.Profesor_Cargo }}
        </td>
      </tr>
    </table>
  </ModalConfirm>
  <p v-if="cursos.length == 0">No Hay Cursos</p>
</template>

<script setup lang="ts">
import DatosPersonales from "@/components/DatosPersonales.vue";
import { onMounted, ref } from "vue";
import alumnoInterface from "@/types/alumnoInterface";
import getdata from "@/API/helper";
import { useRoute } from "vue-router";
import cursoInterface from "@/types/cursoInterface";
import getmatriculadata from "@/API/matriculahelper";
import getcursodata from "@/API/cursohelper";
import ModalConfirm from "@/components/ModalConfirm.vue";
import matriculaInterface from "@/types/matriculaInterface";
import router from "@/router";

const alumno = ref({} as alumnoInterface);
const cursos = ref<cursoInterface[]>([]);
const cursosAprobados = ref<string[]>([]);
const cursosMatriculados = ref<string[]>([]);
const route = useRoute();
const id = parseInt(route.params.id.toString(), 16).toString();
const año = new Date().getFullYear().toString();
const Semestre = new Date().getMonth() >= 6 ? "2" : "1";
const matriculaConfirmada = ref({} as matriculaInterface);
const show = ref(false);
const valid = ref(false);

onMounted(() => {
  getdata(id).then((img) => {
    setTimeout(() => {
      alumno.value = { ...img.data[0] };
      alumno.value.DNI = alumno.value.DNI.toString();
    }, 0);
  });
  getcursodata().then((lista) => {
    setTimeout(() => {
      cursos.value = lista.data;
    }, 0);
  });

  cursosAprobados.value = CursosDisponibles(id);
});

function CursosDisponibles(codAlumno: string): string[] {
  const arrayTemp = [] as string[];
  getmatriculadata(codAlumno).then((lista) => {
    setTimeout(() => {
      const items = lista.data;
      for (const item in items) {
        if (items[item].Aprobado) {
          arrayTemp.push(items[item].Curso);
        }
      }
    }, 0);
  });
  return arrayTemp;
}
function hola(id: string): void {
  if (cursosMatriculados.value.includes(id)) {
    cursosMatriculados.value = cursosMatriculados.value.filter((e) => e !== id);
  } else {
    cursosMatriculados.value.push(id);
  }
  cursosMatriculados.value.length >= 1
    ? (valid.value = true)
    : (valid.value = false);
}

function confirm() {
  if (valid.value) {
    show.value = false;
    let idCod = 20;
    let id = 36;
    console.log("confirmando matricula");
    matriculaConfirmada.value.Año = año;
    matriculaConfirmada.value.Semestre = Semestre;
    matriculaConfirmada.value.CodMatricula = "SUB_" + idCod.toString();
    matriculaConfirmada.value.Alumno = alumno.value.DNI;
    matriculaConfirmada.value.Aprobado = false;
    matriculaConfirmada.value.Curso = "";
    for (const i of cursosMatriculados.value) {
      idCod++;
      id++;
      matriculaConfirmada.value.id = id.toString();
      matriculaConfirmada.value.Curso = i;
      matriculaConfirmada.value.CodMatricula = "SUB_" + idCod.toString();
      postJSON(matriculaConfirmada.value);
    }
  }
  matriculaConfirmada.value = {} as matriculaInterface;
  alert("Matricula Registrada con Exito se redirige a la pagina de registro");
  router.push("/");
}

async function postJSON(data: object) {
  try {
    const response = await fetch("https://retoolapi.dev/b8jz2L/matricula", {
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
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  max-height: 700px;
  overflow-y: scroll;
  display: block;
  margin: 0.5rem;
  padding-left: 20%;
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
  margin-left: 37%;
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
p {
  color: red;
  font-weight: bold;
}
</style>
