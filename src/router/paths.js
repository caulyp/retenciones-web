export default [
  {
    path: '*',
    meta: {
      public: true
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true
    },
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/NotFound.vue`)
  },
  {
    path: '/403',
    meta: {
      public: true
    },
    name: 'AccessDenied',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Deny.vue`)
  },
  {
    path: '/500',
    meta: {
      public: true
    },
    name: 'ServerError',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Error.vue`)
  },
  {
    path: '/login',
    meta: {
      public: true
    },
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Login.vue`)
  },
  {
    path: '/',
    meta: {},
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`)
  },
  {
    path: '/seleccion',
    meta: {},
    name: 'Seleccion',
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/empresas/SeleccionEmpresa.vue`)
  },

   /*
   * CONTABILIDAD
   */
  {
    path: '',
    meta: {
      breadcrumb: 'Contabilidad',
      auth: true
    },
    name: 'Contabilidad',   
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/layout/Page.vue`
    ),          
    children: [
      {
        path: '/contabilidad/cuentas',
        meta: { breadcrumb: 'Cuentas Contables' },
        name: 'contabilidad/cuentas',        
        components: {
          default: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            `@/views/contabilidad/cuentas/CuentaList.vue`
          ),  
        }   
      }
    ]
  },


  /*
   * COMPRAS
   */
  {
    path: '',
    meta: { breadcrumb: 'Compras' },
    name: 'Compras',   
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/layout/Page.vue`
    ),          
    children: [
      {
        path: '/compras/conceptos',
        meta: { breadcrumb: 'Conceptos' },
        name: 'compras/conceptos',
        components: {
          default: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            `@/views/compras/conceptos/ConceptoList.vue`
          ),  
        }   
      },
      {
        path: '/compras/proveedores',
        meta: { breadcrumb: 'Proveedores' },
        name: 'compras/proveedores',
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy" */
          `@/views/compras/proveedores/ProveedorList.vue`
        )
      }
    ]
  },


];
