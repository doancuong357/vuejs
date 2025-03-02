import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/HomeView.vue';
import PokemonDetail from '@/components/PokemonDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:name', component: PokemonDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;