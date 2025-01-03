import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Products from './views/Products.vue';
import SaveProduct from './views/SaveProduct.vue';
import EditProduct from './views/EditProduct.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/productos',
    name: 'Productos',
    component: Products,
  },
  {
    path: '/productos/guardar',
    name: 'SaveProduct',
    component: SaveProduct,
  },
  {
    path: '/productos/editar/:id',
    name: 'EditProduct',
    component: EditProduct,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export { router };
