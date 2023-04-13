import Vue from 'vue'
import VueRouter from 'vue-router'
import HairStyleView from '../views/font/HairStyleView.vue'
import HairStylistView from '../views/font/HairStylistView.vue'
import HomeView from '../views/font/HomeView.vue'
import login from '../views/font/login.vue'
import register from '../views/font/register.vue'
import PersonalInfo from '../views/font/PersonalInfo.vue'
import appointment from '../views/font/AppointmentView.vue'
import pay from '../views/font/PayView.vue'
import UserInfo from '../components/UserInfo.vue'
import MyAppointment from '../components/MyAppointment.vue'
import MyMessage from '../components/MyMessage.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hairstyle',
    name: 'hairstyle',
    component: HairStyleView
  },
  {
    path: '/hairstylist',
    name: 'hairstylist',
    component: HairStylistView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/PersonalInfo',
    name: 'PersonalInfo',
    component: PersonalInfo,
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: appointment
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/PersonalInfo' || to.path === '/appointment' || to.path === '/MessageCenter') {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router