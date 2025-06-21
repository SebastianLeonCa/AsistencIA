const routes = [
  {
    path: "",
    component: () => import("src/pages/Login.vue"),
  },
  {
    path: "/home",
    component: () => import("src/pages/HomeAdmin.vue"),
  },
  {
    path: "/ajustes",
    component: () => import("src/pages/Settings.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/errorManager/ErrorNotFound.vue"),
  },
];

export default routes;
