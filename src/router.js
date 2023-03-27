import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
// lazy-loaded
const Profile = () => import('./components/Profile.vue')
const BoardAdmin = () => import('./components/BoardAdmin.vue')
const RoomItems = () => import('./components/admin/RoomItems.vue')
const RoomItemsTemplates = () => import('./components/admin/RoomItemsTemplates.vue')
const BoardModerator = () => import('./components/BoardModerator.vue')
const BoardUser = () => import('./components/BoardUser.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/profile',
        name: 'profile',
        // lazy-loaded
        component: Profile,
    },
    {
        path: '/room-items',
        name: 'room items',
        // lazy-loaded
        component: RoomItems,
    },
    {
        path: '/room-item-templates/template/:propTemplateId',
        name: 'update room item templates',
        // lazy-loaded
        component: RoomItemsTemplates,
        props: function(route) {
            return Object.assign({}, route.params, {
                propActiveView: 'listForTemplate'
            })
        }
    },
    {
        path: '/room-item-templates/item/:propItemId',
        name: 'list items for template',
        // lazy-loaded
        component: RoomItemsTemplates,
        props: function(route) {
            return Object.assign({}, route.params, {
                propActiveView: 'listForItem'
            })
        }
    },
    {
        path: '/room-item-templates/create',
        name: 'create template',
        // lazy-loaded
        component: RoomItemsTemplates,
        props: function(route) {
            return Object.assign({}, route.params, {
                propActiveView: 'create'
            })
        }
    },
    {
        path: '/room-item-templates/:propTemplateId',
        name: 'update template',
        // lazy-loaded
        component: RoomItemsTemplates,
        props: function(route) {
            return Object.assign({}, route.params, {
                propActiveView: 'update'
            })
        }
    },
    {
        path: '/room-item-templates',
        name: 'room item templates',
        // lazy-loaded
        component: RoomItemsTemplates,
        props: true,
    },
    {
        path: '/admin',
        name: 'admin',
        // lazy-loaded
        component: BoardAdmin,
    },
    {
        path: '/mod',
        name: 'moderator',
        // lazy-loaded
        component: BoardModerator,
    },
    {
        path: '/user',
        name: 'user',
        // lazy-loaded
        component: BoardUser,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router