const routes = [
  {
    path: "",
    component: () => import("src/pages/Login.vue"),
  },
  {
    path: "/homeAdmin",
    component: () => import("src/pages/adminFlow/HomeAdmin.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/HomeView.vue"),
      }, // HomeView como vista predeterminada
      {
        path: "personal",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/PersonalView.vue"),
      },
      {
        path: "maquinaria",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/MaquinariaView.vue"),
      },
      {
        path: "cliente",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/ClienteView.vue"),
      },
      {
        path: "rol",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/RolView.vue"),
      },
      {
        path: "lugarTrabajo",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/LugarTrabajoView.vue"),
      },
      {
        path: "marca",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/MarcaView.vue"),
      },
      {
        path: "parteDiario",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/ParteDiario.vue"),
      },
      {
        path: "settings",
        component: () =>
          import("src/pages/adminFlow/adminMenuSideBar/Settings.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/errorManager/ErrorNotFound.vue"),
  },
];

export default routes;
