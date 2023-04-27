<template>
  <RouterLink class="route" to="/login">Estudiante</RouterLink>
  <RouterLink class="route" to="loginAdmin">Administrativo</RouterLink>
  <img
    src="https://cdn.www.gob.pe/uploads/document/file/3846254/standard_Vista%20interna%20del%20campus%20de%20la%20Universidad%20Nacional%20del%20Callao.jpg.jpg"
  />
</template>
<script lang="ts">
export default {};
</script>

<style scoped>
img {
  width: 100%;
}
.route {
  display: inline-block;
  padding: 30px;
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
  padding: 30px;
  border: thick solid white;
  border-radius: 15px;
  margin: 15px 15px 15px 15px;
  color: blue;
  font-weight: bolder;
  font-size: large;
}
</style>
