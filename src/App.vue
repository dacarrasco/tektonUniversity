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
  padding: 0;
  margin: 0;
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Ubuntu, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: black;
}
nav {
  padding-top: 0px;
}
html,
body {
  align-items: center;
  background: #f2f4f8;
  border: 0;
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  height: 100%;
  justify-content: center;
  margin: 0;
  padding: 0;
}
h1 {
  letter-spacing: -1px;
}
a {
  color: #5469d4;
  text-decoration: unset;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
