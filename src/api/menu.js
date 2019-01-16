const Menu = [
  { header: 'Apps' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard'
  }, 
  /*
   * CONTABILIDAD
   */
  { header: 'Contabilidad' },
  {
    title: 'Contabilidad',
    group: 'contabilidad',
    icon: 'library_books',
    name: 'Contabilidad',
    items: [
      { name: 'cuentas', title: 'Cuentas Contables', component: 'contabilidad/cuentas' }      
    ]
  },

  /*
   * COMPRAS
   */
  { divider: true },  
  { header: 'Compras' },
  {
    title: 'Compras',
    group: 'compras',
    icon: 'shopping_cart',
    name: 'Compras',
    items: [
      // { name: 'conceptos', title: 'Conceptos', component: 'components/compras/conceptos' },
      { name: 'conceptos', title: 'Conceptos', component: 'compras/conceptos' },
      { name: 'proveedores', title: 'Proveedores', component: 'compras/proveedores' },
    ]
  },
  
  { divider: true },
  { header: 'Extras' },
  {
    title: 'Pages',
    group: 'extra',
    icon: 'list',
    items: [
      { name: 'Login', title: 'Login', component: 'Login' },
      { name: '404', title: '404', component: 'NotFound' },
      { name: '403', title: '403', component: 'AccessDenied' },
      { name: '500', title: '500', component: 'ServerError' }
    ]
  }
];
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
