import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import NewProduct from '../views/NewProduct.vue'; // Corrected import statement
import ViewProduct from '../views/ViewProduct.vue'; // Corrected import statement
import UpdateProduct from '../views/UpdateProduct.vue'; // Corrected import statement

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/add',
    name: 'NewProduct',
    component: NewProduct,
  },
  {
    path: '/:name',
    name: 'ViewProduct',
    component: ViewProduct,
    props: true,
  },
  {
    path: '/:name/update', // Corrected path to differentiate from the 'ViewProduct' route
    name: 'UpdateProduct',
    component: UpdateProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
