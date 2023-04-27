import CursosList from "../pages/CursosList.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import MantenimientoPage from "../pages/MantenimientoPage.vue";
import MatriculaPage from "../pages/MatriculaPage.vue";
import ProfesoresList from "../pages/ProfesoresList.vue";
import MatriculasList from "../pages/MatriculasList.vue";
import NotFound from "../pages/NotFound.vue";
import HomePage from "../pages/HomePage.vue";
import LoginAdminPage from "../pages/LoginAdminPage.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/loginAdmin",
    name: "loginAdmin",
    component: LoginAdminPage,
  },
  {
    path: "/matricula/:id",
    name: "matricula",
    component: MatriculaPage,
  },
  {
    path: "/mantenimiento",
    name: "mantenimiento",
    component: MantenimientoPage,
  },
  {
    path: "/mantenimiento/cursos",
    name: "cursos",
    component: CursosList,
  },
  {
    path: "/mantenimiento/profesores",
    name: "profesores",
    component: ProfesoresList,
  },
  {
    path: "/mantenimiento/matricula",
    name: "listamatricula",
    component: MatriculasList,
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
