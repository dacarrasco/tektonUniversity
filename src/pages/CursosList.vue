<template>
  <router-link class="route" to="/mantenimiento">
    <vue-feather type="tool" stroke="white"></vue-feather>
  </router-link>
  <button @click="open">Agregar Curso</button>
  <ModalsContainer />
  <section>
    <h1>Lista de Cursos</h1>
    <input
      class="filtro"
      v-model="filtro"
      @change="onCambio"
      placeholder="Filtro por Codigo"
    />
  </section>
  <table class="customers">
    <tr>
      <td>Codigo</td>
      <td>Nombre</td>
      <td>Profesor A Cargo</td>
      <td></td>
      <td></td>
    </tr>
    <tr class="tabla" v-for="curso in cursos" :key="curso.id">
      <td>
        {{ curso.CodCurso }}
      </td>
      <td>
        {{ curso.Nombre }}
      </td>
      <td>
        {{ curso.Profesor_Cargo }}
      </td>
      <td>
        <button @click="changeId(curso.id), open()">Editar</button>
        <ModalsContainer />
      </td>
      <td>
        <button @click="deleteJSON(curso.id)">Eliminar</button>
      </td>
    </tr>
  </table>
  <p v-if="cursos.length == 0">No Hay Cursos</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import cursoInterface from "@/types/cursoInterface";
import getcursodata from "@/helpers/cursohelper";
import ModalCursoForm from "@/components/ModalCursoForm.vue";
const idref = ref<string>("");
const edit = ref<boolean>(false);
const { open, close } = useModal({
  component: ModalCursoForm,
  attrs: {
    onOpened() {
      const key = parseInt(idref.value) - 1;
      if (!isNaN(key)) {
        edit.value = true;
        (document.getElementById("aCodigo") as HTMLInputElement).textContent =
          "Codigo : " + cursos.value[key].CodCurso;
        (document.getElementById("aNombre") as HTMLInputElement).textContent =
          "Nombre : " + cursos.value[key].Nombre;
        (
          document.getElementById("aProfesor_Cargo") as HTMLInputElement
        ).textContent = "Profesor A Cargo: " + cursos.value[key].Profesor_Cargo;
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
const cursos = ref<cursoInterface[]>([]);

onMounted(() => {
  getcursodata().then((lista) => {
    setTimeout(() => {
      cursos.value = lista.data;
    }, 0);
  });
});

function onCambio(): void {
  getcursodata(filtro.value).then((lista) => {
    setTimeout(() => {
      cursos.value = lista.data;
    }, 0);
  });
}
function changeId(ind: string): void {
  idref.value = ind;
}

async function postJSON(data: object) {
  try {
    const response = await fetch("https://retoolapi.dev/ebCVPH/cursos", {
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
    const response = await fetch(`https://retoolapi.dev/ebCVPH/cursos/${id}`, {
      method: "PUT",
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

async function deleteJSON(id: string) {
  try {
    const response = await fetch(`https://retoolapi.dev/ebCVPH/cursos/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<style scoped>
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
</style>
