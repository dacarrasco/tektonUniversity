<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/mantenimiento/cursos">Cursos</router-link>
          <span></span><span></span><span></span><span></span>
        </li>
        <li>
          <router-link to="/mantenimiento/profesores">Profesores</router-link>
          <span></span><span></span><span></span><span></span>
        </li>
        <li>
          <router-link to="/mantenimiento/matricula">Matriculas</router-link>
          <span></span><span></span><span></span><span></span>
        </li>
        <li>
          <router-link to="/">HOME</router-link>
          <span></span><span></span><span></span><span></span>
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
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
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
  margin-left: 30%;
}

nav ul li span {
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

nav ul li:hover {
  color: black;
}

nav ul li:hover span {
  transform: translateY(0) scale(2);
}

nav ul li span:nth-child(1) {
  --n: 1;
}

nav ul li span:nth-child(2) {
  --n: 2;
}

nav ul li span:nth-child(3) {
  --n: 3;
}

nav ul li span:nth-child(4) {
  --n: 4;
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
  color: black;
  font-weight: bolder;
}
</style>
