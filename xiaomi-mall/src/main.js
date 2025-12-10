import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'

// 导入页面组件
import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Product from './views/Product.vue'
import Cart from './views/Cart.vue'
import User from './views/User.vue'

// 创建路由
const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/category', component: Category },
    { path: '/product/:id', component: Product },
    { path: '/cart', component: Cart },
    { path: '/user', component: User }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(Vant)
app.mount('#app')
