<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link class="ir" to="/mantenimiento/cursos"
            >Cursos</router-link
          >
        </li>
        <li>
          <router-link class="ir" to="/mantenimiento/profesores"
            >Profesores</router-link
          >
        </li>
        <li>
          <router-link class="ir" to="/mantenimiento/matricula"
            >Matriculas</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
  <p>Pagina Administrativa de mantenimiento Tekton</p>
  <img src="https://molinosymezcladoras.com.mx/images/mantenimiento.png" />
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
ul {
  list-style: none;
  width: fit-content;
  display: block;
  padding: 10px;
}
li {
  width: fit-content;
  border: solid black medium;
  border-radius: 25px;
  margin: auto;
  padding: 10px;
  background-color: darkmagenta;
}
.ir {
  margin: 10px;
  background-color: darkmagenta;
  color: white;
  text-decoration: none;
}
.ir:hover {
  text-decoration: underline;
  color: blue;
}

p {
  color: white;
  font-weight: bolder;
}
</style>
