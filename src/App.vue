<template>
  <nav>
    <h1>TEKTON UNIVERSITY</h1>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scooped>
* {
  background-color: darkcyan;
  margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: black;
}
nav {
  padding: 30px;
}
h1 {
  color: white;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
