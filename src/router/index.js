//页面路由跳转
import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/login'   //重定向
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/register.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/Home/main.vue'),
        // 路由元信息
        meta:{
            isLogin:true
        },
        // children:[
        //     {
        //         path:'user',
        //         name:'user',
        //         component:()=>import('../views/Home/user.vue')
        //     },
        //     {
        //         path:'home',
        //         name:'home',
        //         component:()=>import('../views/Home/home.vue')
        //     },
        //     {
        //         path:'map',
        //         name:'map',
        //         component:()=>import('../views/Home/map.vue')
        //     },
        //     {
        //         path:'personal',
        //         name:'personal',
        //         component:()=>import('../views/Home/personal.vue')
        //     },
        // ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
    // 判断是否需要登录
    if(to.matched.some(ele=>ele.meta.isLogin)){
        //判断当前的用户是否已经登录
        let token=sessionStorage.getItem('token');
        if(token){
            next()
        }else{
            console.log('...')
            next('/login')
        }
    }else{//不需要登录
        next();
    }
    
})

//解决相同路径跳转报错问题
//使用push的方法
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return RouterPush.call(this, to).catch(err => err)
}

//使用replace的方法
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
    return RouterReplace.call(this, to).catch(err => err)
}

export default router

