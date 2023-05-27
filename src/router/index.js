import { createRouter, createWebHistory } from 'vue-router';
import QuestionsView from '../views/QuestionsView.vue';
// import HomeView from '../views/HomeView.vue';
// import NetworkView from '../views/NetworkView.vue';
// import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'questions',
    component: QuestionsView,
  },
  // {
  //   path: '/network',
  //   name: 'network',
  //   component: NetworkView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'notfound',
  //   component: NotFoundView,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
